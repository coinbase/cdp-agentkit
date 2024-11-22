"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toHex = toHex;
exports.boolToHex = boolToHex;
exports.bytesToHex = bytesToHex;
exports.numberToHex = numberToHex;
exports.stringToHex = stringToHex;
const encoding_js_1 = require("../../errors/encoding.js");
const pad_js_1 = require("../data/pad.js");
const fromHex_js_1 = require("./fromHex.js");
const hexes = Array.from({ length: 256 }, (_v, i) => i.toString(16).padStart(2, '0'));
function toHex(value, opts = {}) {
    if (typeof value === 'number' || typeof value === 'bigint')
        return numberToHex(value, opts);
    if (typeof value === 'string') {
        return stringToHex(value, opts);
    }
    if (typeof value === 'boolean')
        return boolToHex(value, opts);
    return bytesToHex(value, opts);
}
function boolToHex(value, opts = {}) {
    const hex = `0x${Number(value)}`;
    if (typeof opts.size === 'number') {
        (0, fromHex_js_1.assertSize)(hex, { size: opts.size });
        return (0, pad_js_1.pad)(hex, { size: opts.size });
    }
    return hex;
}
function bytesToHex(value, opts = {}) {
    let string = '';
    for (let i = 0; i < value.length; i++) {
        string += hexes[value[i]];
    }
    const hex = `0x${string}`;
    if (typeof opts.size === 'number') {
        (0, fromHex_js_1.assertSize)(hex, { size: opts.size });
        return (0, pad_js_1.pad)(hex, { dir: 'right', size: opts.size });
    }
    return hex;
}
function numberToHex(value_, opts = {}) {
    const { signed, size } = opts;
    const value = BigInt(value_);
    let maxValue;
    if (size) {
        if (signed)
            maxValue = (1n << (BigInt(size) * 8n - 1n)) - 1n;
        else
            maxValue = 2n ** (BigInt(size) * 8n) - 1n;
    }
    else if (typeof value_ === 'number') {
        maxValue = BigInt(Number.MAX_SAFE_INTEGER);
    }
    const minValue = typeof maxValue === 'bigint' && signed ? -maxValue - 1n : 0;
    if ((maxValue && value > maxValue) || value < minValue) {
        const suffix = typeof value_ === 'bigint' ? 'n' : '';
        throw new encoding_js_1.IntegerOutOfRangeError({
            max: maxValue ? `${maxValue}${suffix}` : undefined,
            min: `${minValue}${suffix}`,
            signed,
            size,
            value: `${value_}${suffix}`,
        });
    }
    const hex = `0x${(signed && value < 0 ? (1n << BigInt(size * 8)) + BigInt(value) : value).toString(16)}`;
    if (size)
        return (0, pad_js_1.pad)(hex, { size });
    return hex;
}
const encoder = new TextEncoder();
function stringToHex(value_, opts = {}) {
    const value = encoder.encode(value_);
    return bytesToHex(value, opts);
}
//# sourceMappingURL=toHex.js.map