"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.charCodeMap = void 0;
exports.assertSize = assertSize;
exports.assertStartOffset = assertStartOffset;
exports.assertEndOffset = assertEndOffset;
exports.charCodeToBase16 = charCodeToBase16;
exports.pad = pad;
exports.trim = trim;
const Bytes = require("../Bytes.js");
function assertSize(bytes, size_) {
    if (Bytes.size(bytes) > size_)
        throw new Bytes.SizeOverflowError({
            givenSize: Bytes.size(bytes),
            maxSize: size_,
        });
}
function assertStartOffset(value, start) {
    if (typeof start === 'number' && start > 0 && start > Bytes.size(value) - 1)
        throw new Bytes.SliceOffsetOutOfBoundsError({
            offset: start,
            position: 'start',
            size: Bytes.size(value),
        });
}
function assertEndOffset(value, start, end) {
    if (typeof start === 'number' &&
        typeof end === 'number' &&
        Bytes.size(value) !== end - start) {
        throw new Bytes.SliceOffsetOutOfBoundsError({
            offset: end,
            position: 'end',
            size: Bytes.size(value),
        });
    }
}
exports.charCodeMap = {
    zero: 48,
    nine: 57,
    A: 65,
    F: 70,
    a: 97,
    f: 102,
};
function charCodeToBase16(char) {
    if (char >= exports.charCodeMap.zero && char <= exports.charCodeMap.nine)
        return char - exports.charCodeMap.zero;
    if (char >= exports.charCodeMap.A && char <= exports.charCodeMap.F)
        return char - (exports.charCodeMap.A - 10);
    if (char >= exports.charCodeMap.a && char <= exports.charCodeMap.f)
        return char - (exports.charCodeMap.a - 10);
    return undefined;
}
function pad(bytes, options = {}) {
    const { dir, size = 32 } = options;
    if (size === 0)
        return bytes;
    if (bytes.length > size)
        throw new Bytes.SizeExceedsPaddingSizeError({
            size: bytes.length,
            targetSize: size,
            type: 'Bytes',
        });
    const paddedBytes = new Uint8Array(size);
    for (let i = 0; i < size; i++) {
        const padEnd = dir === 'right';
        paddedBytes[padEnd ? i : size - i - 1] =
            bytes[padEnd ? i : bytes.length - i - 1];
    }
    return paddedBytes;
}
function trim(value, options = {}) {
    const { dir = 'left' } = options;
    let data = value;
    let sliceLength = 0;
    for (let i = 0; i < data.length - 1; i++) {
        if (data[dir === 'left' ? i : data.length - i - 1].toString() === '0')
            sliceLength++;
        else
            break;
    }
    data =
        dir === 'left'
            ? data.slice(sliceLength)
            : data.slice(0, data.length - sliceLength);
    return data;
}
//# sourceMappingURL=bytes.js.map