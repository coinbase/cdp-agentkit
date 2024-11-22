"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ripemd160 = ripemd160;
const ripemd160_1 = require("@noble/hashes/ripemd160");
const isHex_js_1 = require("../data/isHex.js");
const toBytes_js_1 = require("../encoding/toBytes.js");
const toHex_js_1 = require("../encoding/toHex.js");
function ripemd160(value, to_) {
    const to = to_ || 'hex';
    const bytes = (0, ripemd160_1.ripemd160)((0, isHex_js_1.isHex)(value, { strict: false }) ? (0, toBytes_js_1.toBytes)(value) : value);
    if (to === 'bytes')
        return bytes;
    return (0, toHex_js_1.toHex)(bytes);
}
//# sourceMappingURL=ripemd160.js.map