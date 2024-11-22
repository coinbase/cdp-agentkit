"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toFunctionSelector = void 0;
const slice_js_1 = require("../data/slice.js");
const toSignatureHash_js_1 = require("./toSignatureHash.js");
const toFunctionSelector = (fn) => (0, slice_js_1.slice)((0, toSignatureHash_js_1.toSignatureHash)(fn), 0, 4);
exports.toFunctionSelector = toFunctionSelector;
//# sourceMappingURL=toFunctionSelector.js.map