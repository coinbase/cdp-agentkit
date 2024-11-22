"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slice = slice;
exports.sliceBytes = sliceBytes;
exports.sliceHex = sliceHex;
const data_js_1 = require("../../errors/data.js");
const isHex_js_1 = require("./isHex.js");
const size_js_1 = require("./size.js");
function slice(value, start, end, { strict } = {}) {
    if ((0, isHex_js_1.isHex)(value, { strict: false }))
        return sliceHex(value, start, end, {
            strict,
        });
    return sliceBytes(value, start, end, {
        strict,
    });
}
function assertStartOffset(value, start) {
    if (typeof start === 'number' && start > 0 && start > (0, size_js_1.size)(value) - 1)
        throw new data_js_1.SliceOffsetOutOfBoundsError({
            offset: start,
            position: 'start',
            size: (0, size_js_1.size)(value),
        });
}
function assertEndOffset(value, start, end) {
    if (typeof start === 'number' &&
        typeof end === 'number' &&
        (0, size_js_1.size)(value) !== end - start) {
        throw new data_js_1.SliceOffsetOutOfBoundsError({
            offset: end,
            position: 'end',
            size: (0, size_js_1.size)(value),
        });
    }
}
function sliceBytes(value_, start, end, { strict } = {}) {
    assertStartOffset(value_, start);
    const value = value_.slice(start, end);
    if (strict)
        assertEndOffset(value, start, end);
    return value;
}
function sliceHex(value_, start, end, { strict } = {}) {
    assertStartOffset(value_, start);
    const value = `0x${value_
        .replace('0x', '')
        .slice((start ?? 0) * 2, (end ?? value_.length) * 2)}`;
    if (strict)
        assertEndOffset(value, start, end);
    return value;
}
//# sourceMappingURL=slice.js.map