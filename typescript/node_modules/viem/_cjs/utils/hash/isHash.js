"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isHash = isHash;
const isHex_js_1 = require("../data/isHex.js");
const size_js_1 = require("../data/size.js");
function isHash(hash) {
    return (0, isHex_js_1.isHex)(hash) && (0, size_js_1.size)(hash) === 32;
}
//# sourceMappingURL=isHash.js.map