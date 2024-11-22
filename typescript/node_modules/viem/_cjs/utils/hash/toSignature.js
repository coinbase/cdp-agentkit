"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toSignature = void 0;
const abitype_1 = require("abitype");
const normalizeSignature_js_1 = require("./normalizeSignature.js");
const toSignature = (def) => {
    const def_ = (() => {
        if (typeof def === 'string')
            return def;
        return (0, abitype_1.formatAbiItem)(def);
    })();
    return (0, normalizeSignature_js_1.normalizeSignature)(def_);
};
exports.toSignature = toSignature;
//# sourceMappingURL=toSignature.js.map