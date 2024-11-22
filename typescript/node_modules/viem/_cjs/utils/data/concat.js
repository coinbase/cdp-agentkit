"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.concat = concat;
exports.concatBytes = concatBytes;
exports.concatHex = concatHex;
function concat(values) {
    if (typeof values[0] === 'string')
        return concatHex(values);
    return concatBytes(values);
}
function concatBytes(values) {
    let length = 0;
    for (const arr of values) {
        length += arr.length;
    }
    const result = new Uint8Array(length);
    let offset = 0;
    for (const arr of values) {
        result.set(arr, offset);
        offset += arr.length;
    }
    return result;
}
function concatHex(values) {
    return `0x${values.reduce((acc, x) => acc + x.replace('0x', ''), '')}`;
}
//# sourceMappingURL=concat.js.map