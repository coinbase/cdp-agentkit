"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBytes = toBytes;
exports.boolToBytes = boolToBytes;
exports.hexToBytes = hexToBytes;
exports.numberToBytes = numberToBytes;
exports.stringToBytes = stringToBytes;
const base_js_1 = require("../../errors/base.js");
const isHex_js_1 = require("../data/isHex.js");
const pad_js_1 = require("../data/pad.js");
const fromHex_js_1 = require("./fromHex.js");
const toHex_js_1 = require("./toHex.js");
const encoder = new TextEncoder();
function toBytes(value, opts = {}) {
    if (typeof value === 'number' || typeof value === 'bigint')
        return numberToBytes(value, opts);
    if (typeof value === 'boolean')
        return boolToBytes(value, opts);
    if ((0, isHex_js_1.isHex)(value))
        return hexToBytes(value, opts);
    return stringToBytes(value, opts);
}
function boolToBytes(value, opts = {}) {
    const bytes = new Uint8Array(1);
    bytes[0] = Number(value);
    if (typeof opts.size === 'number') {
        (0, fromHex_js_1.assertSize)(bytes, { size: opts.size });
        return (0, pad_js_1.pad)(bytes, { size: opts.size });
    }
    return bytes;
}
const charCodeMap = {
    zero: 48,
    nine: 57,
    A: 65,
    F: 70,
    a: 97,
    f: 102,
};
function charCodeToBase16(char) {
    if (char >= charCodeMap.zero && char <= charCodeMap.nine)
        return char - charCodeMap.zero;
    if (char >= charCodeMap.A && char <= charCodeMap.F)
        return char - (charCodeMap.A - 10);
    if (char >= charCodeMap.a && char <= charCodeMap.f)
        return char - (charCodeMap.a - 10);
    return undefined;
}
function hexToBytes(hex_, opts = {}) {
    let hex = hex_;
    if (opts.size) {
        (0, fromHex_js_1.assertSize)(hex, { size: opts.size });
        hex = (0, pad_js_1.pad)(hex, { dir: 'right', size: opts.size });
    }
    let hexString = hex.slice(2);
    if (hexString.length % 2)
        hexString = `0${hexString}`;
    const length = hexString.length / 2;
    const bytes = new Uint8Array(length);
    for (let index = 0, j = 0; index < length; index++) {
        const nibbleLeft = charCodeToBase16(hexString.charCodeAt(j++));
        const nibbleRight = charCodeToBase16(hexString.charCodeAt(j++));
        if (nibbleLeft === undefined || nibbleRight === undefined) {
            throw new base_js_1.BaseError(`Invalid byte sequence ("${hexString[j - 2]}${hexString[j - 1]}" in "${hexString}").`);
        }
        bytes[index] = nibbleLeft * 16 + nibbleRight;
    }
    return bytes;
}
function numberToBytes(value, opts) {
    const hex = (0, toHex_js_1.numberToHex)(value, opts);
    return hexToBytes(hex);
}
function stringToBytes(value, opts = {}) {
    const bytes = encoder.encode(value);
    if (typeof opts.size === 'number') {
        (0, fromHex_js_1.assertSize)(bytes, { size: opts.size });
        return (0, pad_js_1.pad)(bytes, { dir: 'right', size: opts.size });
    }
    return bytes;
}
//# sourceMappingURL=toBytes.js.map