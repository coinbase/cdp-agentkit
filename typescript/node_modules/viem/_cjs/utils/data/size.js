"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.size = size;
const isHex_js_1 = require("./isHex.js");
function size(value) {
    if ((0, isHex_js_1.isHex)(value, { strict: false }))
        return Math.ceil((value.length - 2) / 2);
    return value.length;
}
//# sourceMappingURL=size.js.map