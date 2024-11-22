/*!
 * algorithms/aes-kw.js - AES-KW Key-Wrapping
 *
 * Copyright (c) 2015 Cisco Systems, Inc.  See LICENSE file.
 */
"use strict";

var helpers = require("./helpers.js"),
    forge = require("../deps/forge.js"),
    DataBuffer = require("../util/databuffer.js");

var A0 = Buffer.from("a6a6a6a6a6a6a6a6", "hex");

// ### helpers
function xor(a, b) {
  var len = Math.max(a.length, b.length);
  var result = Buffer.alloc(len);
  for (var idx = 0; len > idx; idx++) {
    result[idx] = (a[idx] || 0) ^ (b[idx] || 0);
  }
  return result;
}

function split(input, size) {
  var output = [];
  for (var idx = 0; input.length > idx; idx += size) {
    output.push(input.slice(idx, idx + size));
  }
  return output;
}

function longToBigEndian(input) {
  var hi = Math.floor(input / 4294967296),
      lo = input % 4294967296;
  var output = Buffer.alloc(8);
  output[0] = 0xff & (hi >>> 24);
  output[1] = 0xff & (hi >>> 16);
  output[2] = 0xff & (hi >>> 8);
  output[3] = 0xff & (hi >>> 0);
  output[4] = 0xff & (lo >>> 24);
  output[5] = 0xff & (lo >>> 16);
  output[6] = 0xff & (lo >>> 8);
  output[7] = 0xff & (lo >>> 0);
  return output;
}

function kwEncryptFN(size) {
  function commonChecks(key, data) {
    if (size !== (key.length << 3)) {
      throw new Error("invalid key size");
    }
    if (0 < data.length && 0 !== (data.length % 8)) {
      throw new Error("invalid data length");
    }
  }

  // ### 'fallback' implementation -- uses forge
  var fallback = function(key, pdata) {
    try {
      commonChecks(key, pdata);
    } catch (err) {
      return Promise.reject(err);
    }

    // setup cipher
    var cipher = forge.cipher.createCipher("AES", new DataBuffer(key));

    // split input into chunks
    var R = split(pdata, 8);
    var A,
        B,
        count;
    A = A0;
    for (var jdx = 0; 6 > jdx; jdx++) {
      for (var idx = 0; R.length > idx; idx++) {
        count = (R.length * jdx) + idx + 1;
        B = Buffer.concat([A, R[idx]]);
        cipher.start();
        cipher.update(new DataBuffer(B));
        cipher.finish();
        B = Buffer.from(cipher.output.bytes(), "binary");

        A = xor(B.slice(0, 8),
                longToBigEndian(count));
        R[idx] = B.slice(8, 16);
      }
    }
    R = [A].concat(R);
    var cdata = Buffer.concat(R);
    return Promise.resolve({
      data: cdata
    });
  };
  // ### WebCryptoAPI implementation
  var webcrypto = function(key, pdata) {
    try {
      commonChecks(key, pdata);
    } catch (err) {
      return Promise.reject(err);
    }

    var alg = {
      name: "AES-KW"
    };
    var promise = [
      helpers.subtleCrypto.importKey("raw", pdata, { name: "HMAC", hash: "SHA-256" }, true, ["sign"]),
      helpers.subtleCrypto.importKey("raw", key, alg, true, ["wrapKey"])
    ];
    promise = Promise.all(promise);
    promise = promise.then(function(keys) {
      return helpers.subtleCrypto.wrapKey("raw",
                                          keys[0], // key
                                          keys[1], // wrappingKey
                                          alg);
    });
    promise = promise.then(function(result) {
      result = Buffer.from(result);

      return {
        data: result
      };
    });
    return promise;
  };
  var node = function(key, pdata) {
    try {
      commonChecks(key, pdata);
    } catch (err) {
      return Promise.reject(err);
    }

    // split input into chunks
    var R = split(pdata, 8),
        iv = Buffer.alloc(16);
    var A,
        B,
        count;
    A = A0;
    for (var jdx = 0; 6 > jdx; jdx++) {
      for (var idx = 0; R.length > idx; idx++) {
        count = (R.length * jdx) + idx + 1;
        B = Buffer.concat([A, R[idx]]);
        var cipher = helpers.nodeCrypto.createCipheriv("AES" + size, key, iv);
        B = cipher.update(B);

        A = xor(B.slice(0, 8),
                longToBigEndian(count));
        R[idx] = B.slice(8, 16);
      }
    }
    R = [A].concat(R);
    var cdata = Buffer.concat(R);
    return Promise.resolve({
      data: cdata
    });
  };

  return helpers.setupFallback(node, webcrypto, fallback);
}
function kwDecryptFN(size) {
  function commonChecks(key, data) {
    if (size !== (key.length << 3)) {
      throw new Error("invalid key size");
    }
    if (0 < (data.length - 8) && 0 !== (data.length % 8)) {
      throw new Error("invalid data length");
    }
  }

  // ### 'fallback' implementation -- uses forge
  var fallback = function(key, cdata) {
    try {
      commonChecks(key, cdata);
    } catch (err) {
      return Promise.reject(err);
    }

    // setup cipher
    var cipher = forge.cipher.createDecipher("AES", new DataBuffer(key));

    // prepare inputs
    var R = split(cdata, 8),
        A,
        B,
        count;
    A = R[0];
    R = R.slice(1);
    for (var jdx = 5; 0 <= jdx; --jdx) {
      for (var idx = R.length - 1; 0 <= idx; --idx) {
        count = (R.length * jdx) + idx + 1;
        B = xor(A,
                longToBigEndian(count));
        B = Buffer.concat([B, R[idx]]);
        cipher.start();
        cipher.update(new DataBuffer(B));
        cipher.finish();
        B = Buffer.from(cipher.output.bytes(), "binary");

        A = B.slice(0, 8);
        R[idx] = B.slice(8, 16);
      }
    }
    if (A.toString() !== A0.toString()) {
      return Promise.reject(new Error("decryption failed"));
    }
    var pdata = Buffer.concat(R);
    return Promise.resolve(pdata);
  };
  // ### WebCryptoAPI implementation
  var webcrypto = function(key, cdata) {
    try {
      commonChecks(key, cdata);
    } catch (err) {
      return Promise.reject(err);
    }

    var alg = {
      name: "AES-KW"
    };
    var promise = helpers.subtleCrypto.importKey("raw", key, alg, true, ["unwrapKey"]);
    promise = promise.then(function(key) {
      return helpers.subtleCrypto.unwrapKey("raw", cdata, key, alg, {name: "HMAC", hash: "SHA-256"}, true, ["sign"]);
    });
    promise = promise.then(function(result) {
      // unwrapped CryptoKey -- extract raw
      return helpers.subtleCrypto.exportKey("raw", result);
    });
    promise = promise.then(function(result) {
      result = Buffer.from(result);
      return result;
    });
    return promise;
  };
  var node = function(key, cdata) {
    try {
      commonChecks(key, cdata);
    } catch (err) {
      return Promise.reject(err);
    }

    // prepare inputs
    var R = split(cdata, 8),
        iv = Buffer.alloc(16),
        A,
        B,
        count;
    A = R[0];
    R = R.slice(1);
    for (var jdx = 5; 0 <= jdx; --jdx) {
      for (var idx = R.length - 1; 0 <= idx; --idx) {
        count = (R.length * jdx) + idx + 1;
        B = xor(A,
                longToBigEndian(count));
        B = Buffer.concat([B, R[idx], iv]);
        var cipher = helpers.nodeCrypto.createDecipheriv("AES" + size, key, iv);
        B = cipher.update(B);

        A = B.slice(0, 8);
        R[idx] = B.slice(8, 16);
      }
    }
    if (A.toString() !== A0.toString()) {
      return Promise.reject(new Error("decryption failed"));
    }
    var pdata = Buffer.concat(R);
    return Promise.resolve(pdata);
  };

  return helpers.setupFallback(node, webcrypto, fallback);
}

// ### Public API
// * [name].encrypt
// * [name].decrypt
var aesKw = {};
[
  "A128KW",
  "A192KW",
  "A256KW"
].forEach(function(alg) {
  var size = parseInt(/A(\d+)KW/g.exec(alg)[1]);
  aesKw[alg] = {
    encrypt: kwEncryptFN(size),
    decrypt: kwDecryptFN(size)
  };
});

module.exports = aesKw;
