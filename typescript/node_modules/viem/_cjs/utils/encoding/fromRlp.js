"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromRlp = fromRlp;
const base_js_1 = require("../../errors/base.js");
const encoding_js_1 = require("../../errors/encoding.js");
const cursor_js_1 = require("../cursor.js");
const toBytes_js_1 = require("./toBytes.js");
const toHex_js_1 = require("./toHex.js");
function fromRlp(value, to = 'hex') {
    const bytes = (() => {
        if (typeof value === 'string') {
            if (value.length > 3 && value.length % 2 !== 0)
                throw new encoding_js_1.InvalidHexValueError(value);
            return (0, toBytes_js_1.hexToBytes)(value);
        }
        return value;
    })();
    const cursor = (0, cursor_js_1.createCursor)(bytes, {
        recursiveReadLimit: Number.POSITIVE_INFINITY,
    });
    const result = fromRlpCursor(cursor, to);
    return result;
}
function fromRlpCursor(cursor, to = 'hex') {
    if (cursor.bytes.length === 0)
        return (to === 'hex' ? (0, toHex_js_1.bytesToHex)(cursor.bytes) : cursor.bytes);
    const prefix = cursor.readByte();
    if (prefix < 0x80)
        cursor.decrementPosition(1);
    if (prefix < 0xc0) {
        const length = readLength(cursor, prefix, 0x80);
        const bytes = cursor.readBytes(length);
        return (to === 'hex' ? (0, toHex_js_1.bytesToHex)(bytes) : bytes);
    }
    const length = readLength(cursor, prefix, 0xc0);
    return readList(cursor, length, to);
}
function readLength(cursor, prefix, offset) {
    if (offset === 0x80 && prefix < 0x80)
        return 1;
    if (prefix <= offset + 55)
        return prefix - offset;
    if (prefix === offset + 55 + 1)
        return cursor.readUint8();
    if (prefix === offset + 55 + 2)
        return cursor.readUint16();
    if (prefix === offset + 55 + 3)
        return cursor.readUint24();
    if (prefix === offset + 55 + 4)
        return cursor.readUint32();
    throw new base_js_1.BaseError('Invalid RLP prefix');
}
function readList(cursor, length, to) {
    const position = cursor.position;
    const value = [];
    while (cursor.position - position < length)
        value.push(fromRlpCursor(cursor, to));
    return value;
}
//# sourceMappingURL=fromRlp.js.map