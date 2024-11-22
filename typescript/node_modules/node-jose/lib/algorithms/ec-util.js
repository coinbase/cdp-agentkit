/*!
 * algorithms/ec-util.js - Elliptic Curve Utility Functions
 *
 * Copyright (c) 2015 Cisco Systems, Inc.  See LICENSE file.
 */
"use strict";

var clone = require("lodash/clone"),
    ecc = require("../deps/ecc"),
    forge = require("../deps/forge.js"),
    util = require("../util");

var EC_KEYSIZES = {
  "P-256": 256,
  "P-384": 384,
  "P-521": 521
};

function convertToForge(key, isPublic) {
  var parts = isPublic ?
              ["x", "y"] :
              ["d"];
  parts = parts.map(function(f) {
    return new forge.jsbn.BigInteger(key[f].toString("hex"), 16);
  });
  // prefix with curve
  parts = [key.crv].concat(parts);
  var fn = isPublic ?
           ecc.asPublicKey :
           ecc.asPrivateKey;
  return fn.apply(ecc, parts);
}

function convertToJWK(key, isPublic) {
  var result = clone(key);
  var parts = isPublic ?
              ["x", "y"] :
              ["x", "y", "d"];
  parts.forEach(function(f) {
    result[f] = util.base64url.encode(result[f]);
  });

  // remove potentially troublesome properties
  delete result.key_ops;
  delete result.use;
  delete result.alg;

  if (isPublic) {
    delete result.d;
  }

  return result;
}

function convertToObj(key, isPublic) {
  var result = clone(key);
  var parts = isPublic ?
              ["x", "y"] :
              ["d"];
  parts.forEach(function(f) {
    // assume string if base64url-encoded
    result[f] = util.asBuffer(result[f], "base64url");
  });

  return result;
}

var UNCOMPRESSED = Buffer.from([0x04]);
function convertToBuffer(key, isPublic) {
  key = convertToObj(key, isPublic);
  var result = isPublic ?
               Buffer.concat([UNCOMPRESSED, key.x, key.y]) :
               key.d;
  return result;
}

function curveSize(crv) {
  return EC_KEYSIZES[crv || ""] || NaN;
}

function curveNameToOid(crv) {
  switch (crv) {
    case "P-256":
      return "1.2.840.10045.3.1.7";
    case "P-384":
      return "1.3.132.0.34";
    case "P-521":
      return "1.3.132.0.35";
    default:
      return null;
  }
}

var EC_OID = "1.2.840.10045.2.1";
function convertToPEM(key, isPrivate) {
  // curveName to OID
  var oid = key.crv;
  oid = curveNameToOid(oid);
  oid = forge.asn1.oidToDer(oid);
  // key as bytes
  var type,
      pub,
      asn1;
  if (isPrivate) {
    type = "EC PRIVATE KEY";
    pub = Buffer.concat([
      Buffer.from([0x00, 0x04]),
      key.x,
      key.y
    ]).toString("binary");
    key = key.d.toString("binary");
    asn1 = forge.asn1.create(forge.asn1.Class.UNIVERSAL, forge.asn1.Type.SEQUENCE, true, [
      forge.asn1.create(forge.asn1.Class.UNIVERSAL, forge.asn1.Type.INTEGER, false, "\u0001"),
      forge.asn1.create(forge.asn1.Class.UNIVERSAL, forge.asn1.Type.OCTETSTRING, false, key),
      forge.asn1.create(forge.asn1.Class.CONTEXT_SPECIFIC, 0, true, [
        forge.asn1.create(forge.asn1.Class.UNIVERSAL, forge.asn1.Type.OID, false, oid.bytes())
      ]),
      forge.asn1.create(forge.asn1.Class.CONTEXT_SPECIFIC, 1, true, [
        forge.asn1.create(forge.asn1.Class.UNIVERSAL, forge.asn1.Type.BITSTRING, false, pub)
      ])
    ]);
  } else {
    type = "PUBLIC KEY";
    key = Buffer.concat([
      Buffer.from([0x00, 0x04]),
      key.x,
      key.y
    ]).toString("binary");
    asn1 = forge.asn1.create(forge.asn1.Class.UNIVERSAL, forge.asn1.Type.SEQUENCE, true, [
      forge.asn1.create(forge.asn1.Class.UNIVERSAL, forge.asn1.Type.SEQUENCE, true, [
        forge.asn1.create(forge.asn1.Class.UNIVERSAL, forge.asn1.Type.OID, false, forge.asn1.oidToDer(EC_OID).bytes()),
        forge.asn1.create(forge.asn1.Class.UNIVERSAL, forge.asn1.Type.OID, false, oid.bytes())
      ]),
      forge.asn1.create(forge.asn1.Class.UNIVERSAL, forge.asn1.Type.BITSTRING, false, key)
    ]);
  }
  asn1 = forge.asn1.toDer(asn1).bytes();
  var pem = forge.pem.encode({
    type: type,
    body: asn1
  });
  return pem;
}

// Inspired by teifip/node-webtokens/blob/master/lib/ecdsa.js
var ERR_MSG = "Could not extract parameters from DER signature";
function derToConcat(signature, size) {
  var offset = 0;
  if (signature[offset++] !== 0x30) {
    throw new Error(ERR_MSG);
  }
  var seqLength = signature[offset++];
  if (seqLength === 0x81) {
    seqLength = signature[offset++];
  }
  if (seqLength > signature.length - offset) {
    throw new Error(ERR_MSG);
  }
  if (signature[offset++] !== 0x02) {
    throw new Error(ERR_MSG);
  }
  var rLength = signature[offset++];
  if (rLength > signature.length - offset - 2) {
    throw new Error(ERR_MSG);
  }
  if (rLength > size + 1) {
    throw new Error(ERR_MSG);
  }
  var rOffset = offset;
  offset += rLength;
  if (signature[offset++] !== 0x02) {
    throw new Error(ERR_MSG);
  }
  var sLength = signature[offset++];
  if (sLength !== signature.length - offset) {
    throw new Error(ERR_MSG);
  }
  if (sLength > size + 1) {
    throw new Error(ERR_MSG);
  }
  var sOffset = offset;
  offset += sLength;
  if (offset !== signature.length) {
    throw new Error(ERR_MSG);
  }
  var rPadding = size - rLength;
  var sPadding = size - sLength;
  var dst = Buffer.alloc(rPadding + rLength + sPadding + sLength);
  for (offset = 0; offset < rPadding; ++offset) {
    dst[offset] = 0;
  }
  var rPad = Math.max(-rPadding, 0);
  signature.copy(dst, offset, rOffset + rPad, rOffset + rLength);
  offset = size;
  for (var o = offset; offset < o + sPadding; ++offset) {
    dst[offset] = 0;
  }
  var sPad = Math.max(-sPadding, 0);
  signature.copy(dst, offset, sOffset + sPad, sOffset + sLength);
  return dst;
}

function countPadding(buf, start, stop) {
  var padding = 0;
  while (start + padding < stop && buf[start + padding] === 0) {
    ++padding;
  }
  var needsSign = buf[start + padding] >= 0x80;
  if (needsSign) {
    --padding;
  }
  return padding;
}

function concatToDer(signature, size) {
  var rPadding = countPadding(signature, 0, size);
  var sPadding = countPadding(signature, size, signature.length);
  var rLength = size - rPadding;
  var sLength = size - sPadding;
  var rsBytes = rLength + sLength + 4;
  var shortLength = rsBytes < 0x80;
  var dst = Buffer.alloc((shortLength ? 2 : 3) + rsBytes);
  var offset = 0;
  dst[offset++] = 0x30;
  if (shortLength) {
    dst[offset++] = rsBytes;
  } else {
    dst[offset++] = 0x81;
    dst[offset++] = rsBytes & 0xFF;
  }
  dst[offset++] = 0x02;
  dst[offset++] = rLength;
  if (rPadding < 0) {
    dst[offset++] = 0;
    offset += signature.copy(dst, offset, 0, size);
  } else {
    offset += signature.copy(dst, offset, rPadding, size);
  }
  dst[offset++] = 0x02;
  dst[offset++] = sLength;
  if (sPadding < 0) {
    dst[offset++] = 0;
    signature.copy(dst, offset, size);
  } else {
    signature.copy(dst, offset, size + sPadding);
  }
  return dst;
}

module.exports = {
  convertToForge: convertToForge,
  convertToJWK: convertToJWK,
  convertToObj: convertToObj,
  convertToBuffer: convertToBuffer,
  curveSize: curveSize,
  derToConcat: derToConcat,
  concatToDer: concatToDer,
  convertToPEM: convertToPEM,
  EC_OID: EC_OID
};
