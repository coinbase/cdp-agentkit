"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keccak256 = keccak256;
const sha3_1 = require("@noble/hashes/sha3");
const isHex_js_1 = require("../data/isHex.js");
const toBytes_js_1 = require("../encoding/toBytes.js");
const toHex_js_1 = require("../encoding/toHex.js");
function keccak256(value, to_) {
    const to = to_ || 'hex';
    const bytes = (0, sha3_1.keccak_256)((0, isHex_js_1.isHex)(value, { strict: false }) ? (0, toBytes_js_1.toBytes)(value) : value);
    if (to === 'bytes')
        return bytes;
    return (0, toHex_js_1.toHex)(bytes);
}
//# sourceMappingURL=keccak256.js.map