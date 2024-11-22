import { BaseError } from '../../errors/base.js';
import { InvalidHexValueError, } from '../../errors/encoding.js';
import { createCursor, } from '../cursor.js';
import { hexToBytes } from './toBytes.js';
import { bytesToHex } from './toHex.js';
export function fromRlp(value, to = 'hex') {
    const bytes = (() => {
        if (typeof value === 'string') {
            if (value.length > 3 && value.length % 2 !== 0)
                throw new InvalidHexValueError(value);
            return hexToBytes(value);
        }
        return value;
    })();
    const cursor = createCursor(bytes, {
        recursiveReadLimit: Number.POSITIVE_INFINITY,
    });
    const result = fromRlpCursor(cursor, to);
    return result;
}
function fromRlpCursor(cursor, to = 'hex') {
    if (cursor.bytes.length === 0)
        return (to === 'hex' ? bytesToHex(cursor.bytes) : cursor.bytes);
    const prefix = cursor.readByte();
    if (prefix < 0x80)
        cursor.decrementPosition(1);
    // bytes
    if (prefix < 0xc0) {
        const length = readLength(cursor, prefix, 0x80);
        const bytes = cursor.readBytes(length);
        return (to === 'hex' ? bytesToHex(bytes) : bytes);
    }
    // list
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
    throw new BaseError('Invalid RLP prefix');
}
function readList(cursor, length, to) {
    const position = cursor.position;
    const value = [];
    while (cursor.position - position < length)
        value.push(fromRlpCursor(cursor, to));
    return value;
}
//# sourceMappingURL=fromRlp.js.map