"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.labelhash = labelhash;
const toBytes_js_1 = require("../encoding/toBytes.js");
const toHex_js_1 = require("../encoding/toHex.js");
const keccak256_js_1 = require("../hash/keccak256.js");
const encodedLabelToLabelhash_js_1 = require("./encodedLabelToLabelhash.js");
function labelhash(label) {
    const result = new Uint8Array(32).fill(0);
    if (!label)
        return (0, toHex_js_1.bytesToHex)(result);
    return (0, encodedLabelToLabelhash_js_1.encodedLabelToLabelhash)(label) || (0, keccak256_js_1.keccak256)((0, toBytes_js_1.stringToBytes)(label));
}
//# sourceMappingURL=labelhash.js.map