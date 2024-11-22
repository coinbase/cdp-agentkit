"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodePacked = encodePacked;
const abi_js_1 = require("../../errors/abi.js");
const address_js_1 = require("../../errors/address.js");
const isAddress_js_1 = require("../address/isAddress.js");
const concat_js_1 = require("../data/concat.js");
const pad_js_1 = require("../data/pad.js");
const toHex_js_1 = require("../encoding/toHex.js");
const regex_js_1 = require("../regex.js");
function encodePacked(types, values) {
    if (types.length !== values.length)
        throw new abi_js_1.AbiEncodingLengthMismatchError({
            expectedLength: types.length,
            givenLength: values.length,
        });
    const data = [];
    for (let i = 0; i < types.length; i++) {
        const type = types[i];
        const value = values[i];
        data.push(encode(type, value));
    }
    return (0, concat_js_1.concatHex)(data);
}
function encode(type, value, isArray = false) {
    if (type === 'address') {
        const address = value;
        if (!(0, isAddress_js_1.isAddress)(address))
            throw new address_js_1.InvalidAddressError({ address });
        return (0, pad_js_1.pad)(address.toLowerCase(), {
            size: isArray ? 32 : null,
        });
    }
    if (type === 'string')
        return (0, toHex_js_1.stringToHex)(value);
    if (type === 'bytes')
        return value;
    if (type === 'bool')
        return (0, pad_js_1.pad)((0, toHex_js_1.boolToHex)(value), { size: isArray ? 32 : 1 });
    const intMatch = type.match(regex_js_1.integerRegex);
    if (intMatch) {
        const [_type, baseType, bits = '256'] = intMatch;
        const size = Number.parseInt(bits) / 8;
        return (0, toHex_js_1.numberToHex)(value, {
            size: isArray ? 32 : size,
            signed: baseType === 'int',
        });
    }
    const bytesMatch = type.match(regex_js_1.bytesRegex);
    if (bytesMatch) {
        const [_type, size] = bytesMatch;
        if (Number.parseInt(size) !== (value.length - 2) / 2)
            throw new abi_js_1.BytesSizeMismatchError({
                expectedSize: Number.parseInt(size),
                givenSize: (value.length - 2) / 2,
            });
        return (0, pad_js_1.pad)(value, { dir: 'right', size: isArray ? 32 : null });
    }
    const arrayMatch = type.match(regex_js_1.arrayRegex);
    if (arrayMatch && Array.isArray(value)) {
        const [_type, childType] = arrayMatch;
        const data = [];
        for (let i = 0; i < value.length; i++) {
            data.push(encode(childType, value[i], true));
        }
        if (data.length === 0)
            return '0x';
        return (0, concat_js_1.concatHex)(data);
    }
    throw new abi_js_1.UnsupportedPackedAbiType(type);
}
//# sourceMappingURL=encodePacked.js.map