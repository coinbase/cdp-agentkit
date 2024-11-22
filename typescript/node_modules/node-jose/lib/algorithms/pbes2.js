/*!
 * algorithms/pbes2.js - Password-Based Encryption (v2) Algorithms
 *
 * Copyright (c) 2015 Cisco Systems, Inc.  See LICENSE file.
 */
"use strict";

var forge = require("../deps/forge.js"),
    merge = require("../util/merge.js"),
    util = require("../util"),
    helpers = require("./helpers.js"),
    CONSTANTS = require("./constants.js"),
    KW = require("./aes-kw.js");

var NULL_BUFFER = Buffer.from([0]);
var DEFAULT_ITERATIONS = 8192;
var DEFAULT_SALT_LENGTH = 16;

function fixSalt(hmac, kw, salt) {
  var alg = "PBES2-" + hmac + "+" + kw;
  var output = [
    Buffer.from(alg, "utf8"),
    NULL_BUFFER,
    salt
  ];
  return Buffer.concat(output);
}

function pbkdf2Fn(hash) {
  function prepareProps(props) {
    props = props || {};
    var keyLen = props.length || 0;
    var salt = util.asBuffer(props.salt || Buffer.alloc(0), "base64u4l"),
        itrs = props.iterations || 0;

    if (0 >= keyLen) {
      throw new Error("invalid key length");
    }
    if (0 >= itrs) {
      throw new Error("invalid iteration count");
    }

    props.length = keyLen;
    props.salt = salt;
    props.iterations = itrs;

    return props;
  }

  var fallback = function(key, props) {
    try {
      props = prepareProps(props);
    } catch (err) {
      return Promise.reject(err);
    }

    var keyLen = props.length,
        salt = props.salt,
        itrs = props.iterations;

    var promise = new Promise(function(resolve, reject) {
      var md = forge.md[hash.replace("-", "").toLowerCase()].create();
      var cb = function(err, dk) {
        if (err) {
          reject(err);
        } else {
          dk = Buffer.from(dk, "binary");
          resolve(dk);
        }
      };

      forge.pkcs5.pbkdf2(key.toString("binary"),
                         salt.toString("binary"),
                         itrs,
                         keyLen,
                         md,
                         cb);
    });
    return promise;
  };
  var webcrypto = function(key, props) {
    try {
      props = prepareProps(props);
    } catch (err) {
      return Promise.reject(err);
    }

    var keyLen = props.length,
        salt = props.salt,
        itrs = props.iterations;

    var promise = Promise.resolve(key);
    promise = promise.then(function(keyval) {
      return helpers.subtleCrypto.importKey("raw", keyval, "PBKDF2", false, ["deriveBits"]);
    });
    promise = promise.then(function(key) {
      var mainAlgo = {
        name: "PBKDF2",
        salt: new Uint8Array(salt),
        iterations: itrs,
        hash: hash
      };

      return helpers.subtleCrypto.deriveBits(mainAlgo, key, keyLen * 8);
    });
    promise = promise.then(function(result) {
      return util.asBuffer(result);
    });
    return promise;
  };
  var nodejs = function(key, props) {
    if (6 > helpers.nodeCrypto.pbkdf2.length) {
      throw new Error("unsupported algorithm: PBKDF2-" + hash);
    }

    try {
      props = prepareProps(props);
    } catch (err) {
      return Promise.reject(err);
    }

    var keyLen = props.length,
        salt = props.salt,
        itrs = props.iterations;

        var md = hash.replace("-", "");
    var promise = new Promise(function(resolve, reject) {
      function cb(err, dk) {
        if (err) {
          reject(err);
        } else {
          resolve(dk);
        }
      }
      helpers.nodeCrypto.pbkdf2(key, salt, itrs, keyLen, md, cb);
    });
    return promise;
  };

  return helpers.setupFallback(nodejs, webcrypto, fallback);
}

function pbes2EncryptFN(hmac, kw) {
  var deriveAlg = "PBKDF2-" + hmac.replace("HS", "SHA-");
  var keyLen = CONSTANTS.KEYLENGTH[kw] / 8;

  return function(key, pdata, props) {
    props = props || {};

    var salt = util.asBuffer(props.p2s || Buffer.alloc(0), "base64url"),
      itrs = props.p2c || DEFAULT_ITERATIONS;

    if (0 >= itrs) {
      throw new Error("invalid iteration count");
    }
    if (0 === salt.length) {
      salt = util.randomBytes(DEFAULT_SALT_LENGTH);
    } else if (8 > salt.length) {
      throw new Error("salt too small");
    }
    var header = {
      p2s: util.base64url.encode(salt),
      p2c: itrs
    };
    salt = fixSalt(hmac, kw, salt);
    props = merge(props, {
      salt: salt,
      iterations: itrs,
      length: keyLen
    });

    var promise = Promise.resolve(key);
    // STEP 1: derive shared key
    promise = promise.then(function (key) {
      return pbes2[deriveAlg].derive(key, props);
    });
    // STEP 2: encrypt cek
    promise = promise.then(function (dk) {
      return KW[kw].encrypt(dk, pdata);
    });
    // STEP 3: (re-)apply headers
    promise = promise.then(function (results) {
      results.header = merge(results.header || {}, header);
      return results;
    });

    return promise;
  };
}

function pbes2DecryptFN(hmac, kw) {
  var deriveAlg = "PBKDF2-" + hmac.replace("HS", "SHA-");
  var keyLen = CONSTANTS.KEYLENGTH[kw] / 8;

  return function(key, cdata, props) {
    props = props || {};

    var salt = util.asBuffer(props.p2s || Buffer.alloc(0), "base64url"),
        itrs = props.p2c || 0;

    if (0 >= itrs) {
      return Promise.reject(new Error("invalid iteration count"));
    }

    if (8 > salt.length) {
      return Promise.reject(new Error("salt too small"));
    }
    salt = fixSalt(hmac, kw, salt);
    props = merge(props, {
      salt: salt,
      iterations: itrs,
      length: keyLen
    });

    var promise = Promise.resolve(key);

    // STEP 1: derived shared key
    promise = promise.then(function(key) {
      return pbes2[deriveAlg].derive(key, props);
    });
    // STEP 2: decrypt cek
    promise = promise.then(function(dk) {
      return KW[kw].decrypt(dk, cdata);
    });

    return promise;
  };
}

// ### Public API
var pbes2 = {};

// * [name].derive
[
  "PBKDF2-SHA-256",
  "PBKDF2-SHA-384",
  "PBKDF2-SHA-512"
].forEach(function(alg) {
  var hash = alg.replace("PBKDF2-", "");
  pbes2[alg] = {
    derive: pbkdf2Fn(hash)
  };
});

// [name].encrypt
// [name].decrypt
[
  "PBES2-HS256+A128KW",
  "PBES2-HS384+A192KW",
  "PBES2-HS512+A256KW"
].forEach(function(alg) {
  var parts = /PBES2-(HS\d+)\+(A\d+KW)/g.exec(alg);
  var hmac = parts[1],
      kw = parts[2];
  pbes2[alg] = {
    encrypt: pbes2EncryptFN(hmac, kw),
    decrypt: pbes2DecryptFN(hmac, kw)
  };
});

module.exports = pbes2;
