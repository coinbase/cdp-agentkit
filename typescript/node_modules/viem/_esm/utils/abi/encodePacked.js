import { AbiEncodingLengthMismatchError, BytesSizeMismatchError, UnsupportedPackedAbiType, } from '../../errors/abi.js';
import { InvalidAddressError, } from '../../errors/address.js';
import { isAddress } from '../address/isAddress.js';
import { concatHex } from '../data/concat.js';
import { pad } from '../data/pad.js';
import { boolToHex, numberToHex, stringToHex, } from '../encoding/toHex.js';
import { arrayRegex, bytesRegex, integerRegex } from '../regex.js';
export function encodePacked(types, values) {
    if (types.length !== values.length)
        throw new AbiEncodingLengthMismatchError({
            expectedLength: types.length,
            givenLength: values.length,
        });
    const data = [];
    for (let i = 0; i < types.length; i++) {
        const type = types[i];
        const value = values[i];
        data.push(encode(type, value));
    }
    return concatHex(data);
}
function encode(type, value, isArray = false) {
    if (type === 'address') {
        const address = value;
        if (!isAddress(address))
            throw new InvalidAddressError({ address });
        return pad(address.toLowerCase(), {
            size: isArray ? 32 : null,
        });
    }
    if (type === 'string')
        return stringToHex(value);
    if (type === 'bytes')
        return value;
    if (type === 'bool')
        return pad(boolToHex(value), { size: isArray ? 32 : 1 });
    const intMatch = type.match(integerRegex);
    if (intMatch) {
        const [_type, baseType, bits = '256'] = intMatch;
        const size = Number.parseInt(bits) / 8;
        return numberToHex(value, {
            size: isArray ? 32 : size,
            signed: baseType === 'int',
        });
    }
    const bytesMatch = type.match(bytesRegex);
    if (bytesMatch) {
        const [_type, size] = bytesMatch;
        if (Number.parseInt(size) !== (value.length - 2) / 2)
            throw new BytesSizeMismatchError({
                expectedSize: Number.parseInt(size),
                givenSize: (value.length - 2) / 2,
            });
        return pad(value, { dir: 'right', size: isArray ? 32 : null });
    }
    const arrayMatch = type.match(arrayRegex);
    if (arrayMatch && Array.isArray(value)) {
        const [_type, childType] = arrayMatch;
        const data = [];
        for (let i = 0; i < value.length; i++) {
            data.push(encode(childType, value[i], true));
        }
        if (data.length === 0)
            return '0x';
        return concatHex(data);
    }
    throw new UnsupportedPackedAbiType(type);
}
//# sourceMappingURL=encodePacked.js.map