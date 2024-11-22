import * as Bytes from '../Bytes.js';
/** @internal */
export function assertSize(bytes, size_) {
    if (Bytes.size(bytes) > size_)
        throw new Bytes.SizeOverflowError({
            givenSize: Bytes.size(bytes),
            maxSize: size_,
        });
}
/** @internal */
export function assertStartOffset(value, start) {
    if (typeof start === 'number' && start > 0 && start > Bytes.size(value) - 1)
        throw new Bytes.SliceOffsetOutOfBoundsError({
            offset: start,
            position: 'start',
            size: Bytes.size(value),
        });
}
/** @internal */
export function assertEndOffset(value, start, end) {
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
/** @internal */
export const charCodeMap = {
    zero: 48,
    nine: 57,
    A: 65,
    F: 70,
    a: 97,
    f: 102,
};
/** @internal */
export function charCodeToBase16(char) {
    if (char >= charCodeMap.zero && char <= charCodeMap.nine)
        return char - charCodeMap.zero;
    if (char >= charCodeMap.A && char <= charCodeMap.F)
        return char - (charCodeMap.A - 10);
    if (char >= charCodeMap.a && char <= charCodeMap.f)
        return char - (charCodeMap.a - 10);
    return undefined;
}
/** @internal */
export function pad(bytes, options = {}) {
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
/** @internal */
export function trim(value, options = {}) {
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