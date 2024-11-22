"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringify = void 0;
const stringify = (value, replacer, space) => JSON.stringify(value, (key, value_) => {
    const value = typeof value_ === 'bigint' ? value_.toString() : value_;
    return typeof replacer === 'function' ? replacer(key, value) : value;
}, space);
exports.stringify = stringify;
//# sourceMappingURL=stringify.js.map