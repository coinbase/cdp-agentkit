"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashSignature = hashSignature;
const toBytes_js_1 = require("../encoding/toBytes.js");
const keccak256_js_1 = require("./keccak256.js");
const hash = (value) => (0, keccak256_js_1.keccak256)((0, toBytes_js_1.toBytes)(value));
function hashSignature(sig) {
    return hash(sig);
}
//# sourceMappingURL=hashSignature.js.map