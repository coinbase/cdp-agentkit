"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.namehash = namehash;
const concat_js_1 = require("../data/concat.js");
const toBytes_js_1 = require("../encoding/toBytes.js");
const toHex_js_1 = require("../encoding/toHex.js");
const keccak256_js_1 = require("../hash/keccak256.js");
const encodedLabelToLabelhash_js_1 = require("./encodedLabelToLabelhash.js");
function namehash(name) {
    let result = new Uint8Array(32).fill(0);
    if (!name)
        return (0, toHex_js_1.bytesToHex)(result);
    const labels = name.split('.');
    for (let i = labels.length - 1; i >= 0; i -= 1) {
        const hashFromEncodedLabel = (0, encodedLabelToLabelhash_js_1.encodedLabelToLabelhash)(labels[i]);
        const hashed = hashFromEncodedLabel
            ? (0, toBytes_js_1.toBytes)(hashFromEncodedLabel)
            : (0, keccak256_js_1.keccak256)((0, toBytes_js_1.stringToBytes)(labels[i]), 'bytes');
        result = (0, keccak256_js_1.keccak256)((0, concat_js_1.concat)([result, hashed]), 'bytes');
    }
    return (0, toHex_js_1.bytesToHex)(result);
}
//# sourceMappingURL=namehash.js.map