"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commitmentToVersionedHash = commitmentToVersionedHash;
const toHex_js_1 = require("../encoding/toHex.js");
const sha256_js_1 = require("../hash/sha256.js");
function commitmentToVersionedHash(parameters) {
    const { commitment, version = 1 } = parameters;
    const to = parameters.to ?? (typeof commitment === 'string' ? 'hex' : 'bytes');
    const versionedHash = (0, sha256_js_1.sha256)(commitment, 'bytes');
    versionedHash.set([version], 0);
    return (to === 'bytes' ? versionedHash : (0, toHex_js_1.bytesToHex)(versionedHash));
}
//# sourceMappingURL=commitmentToVersionedHash.js.map