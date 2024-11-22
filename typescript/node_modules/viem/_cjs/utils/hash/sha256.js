"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sha256 = sha256;
const sha256_1 = require("@noble/hashes/sha256");
const isHex_js_1 = require("../data/isHex.js");
const toBytes_js_1 = require("../encoding/toBytes.js");
const toHex_js_1 = require("../encoding/toHex.js");
function sha256(value, to_) {
    const to = to_ || 'hex';
    const bytes = (0, sha256_1.sha256)((0, isHex_js_1.isHex)(value, { strict: false }) ? (0, toBytes_js_1.toBytes)(value) : value);
    if (to === 'bytes')
        return bytes;
    return (0, toHex_js_1.toHex)(bytes);
}
//# sourceMappingURL=sha256.js.map