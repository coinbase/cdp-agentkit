"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeSignature = normalizeSignature;
const base_js_1 = require("../../errors/base.js");
function normalizeSignature(signature) {
    let active = true;
    let current = '';
    let level = 0;
    let result = '';
    let valid = false;
    for (let i = 0; i < signature.length; i++) {
        const char = signature[i];
        if (['(', ')', ','].includes(char))
            active = true;
        if (char === '(')
            level++;
        if (char === ')')
            level--;
        if (!active)
            continue;
        if (level === 0) {
            if (char === ' ' && ['event', 'function', ''].includes(result))
                result = '';
            else {
                result += char;
                if (char === ')') {
                    valid = true;
                    break;
                }
            }
            continue;
        }
        if (char === ' ') {
            if (signature[i - 1] !== ',' && current !== ',' && current !== ',(') {
                current = '';
                active = false;
            }
            continue;
        }
        result += char;
        current += char;
    }
    if (!valid)
        throw new base_js_1.BaseError('Unable to normalize signature.');
    return result;
}
//# sourceMappingURL=normalizeSignature.js.map