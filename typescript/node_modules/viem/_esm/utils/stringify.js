export const stringify = (value, replacer, space) => JSON.stringify(value, (key, value_) => {
    const value = typeof value_ === 'bigint' ? value_.toString() : value_;
    return typeof replacer === 'function' ? replacer(key, value) : value;
}, space);
//# sourceMappingURL=stringify.js.map