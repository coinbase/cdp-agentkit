"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertSize = assertSize;
exports.fromHex = fromHex;
exports.hexToBigInt = hexToBigInt;
exports.hexToBool = hexToBool;
exports.hexToNumber = hexToNumber;
exports.hexToString = hexToString;
const encoding_js_1 = require("../../errors/encoding.js");
const size_js_1 = require("../data/size.js");
const trim_js_1 = require("../data/trim.js");
const toBytes_js_1 = require("./toBytes.js");
function assertSize(hexOrBytes, { size }) {
    if ((0, size_js_1.size)(hexOrBytes) > size)
        throw new encoding_js_1.SizeOverflowError({
            givenSize: (0, size_js_1.size)(hexOrBytes),
            maxSize: size,
        });
}
function fromHex(hex, toOrOpts) {
    const opts = typeof toOrOpts === 'string' ? { to: toOrOpts } : toOrOpts;
    const to = opts.to;
    if (to === 'number')
        return hexToNumber(hex, opts);
    if (to === 'bigint')
        return hexToBigInt(hex, opts);
    if (to === 'string')
        return hexToString(hex, opts);
    if (to === 'boolean')
        return hexToBool(hex, opts);
    return (0, toBytes_js_1.hexToBytes)(hex, opts);
}
function hexToBigInt(hex, opts = {}) {
    const { signed } = opts;
    if (opts.size)
        assertSize(hex, { size: opts.size });
    const value = BigInt(hex);
    if (!signed)
        return value;
    const size = (hex.length - 2) / 2;
    const max = (1n << (BigInt(size) * 8n - 1n)) - 1n;
    if (value <= max)
        return value;
    return value - BigInt(`0x${'f'.padStart(size * 2, 'f')}`) - 1n;
}
function hexToBool(hex_, opts = {}) {
    let hex = hex_;
    if (opts.size) {
        assertSize(hex, { size: opts.size });
        hex = (0, trim_js_1.trim)(hex);
    }
    if ((0, trim_js_1.trim)(hex) === '0x00')
        return false;
    if ((0, trim_js_1.trim)(hex) === '0x01')
        return true;
    throw new encoding_js_1.InvalidHexBooleanError(hex);
}
function hexToNumber(hex, opts = {}) {
    return Number(hexToBigInt(hex, opts));
}
function hexToString(hex, opts = {}) {
    let bytes = (0, toBytes_js_1.hexToBytes)(hex);
    if (opts.size) {
        assertSize(bytes, { size: opts.size });
        bytes = (0, trim_js_1.trim)(bytes, { dir: 'right' });
    }
    return new TextDecoder().decode(bytes);
}
//# sourceMappingURL=fromHex.js.map