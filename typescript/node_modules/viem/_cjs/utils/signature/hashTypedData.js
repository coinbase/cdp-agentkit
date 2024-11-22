"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashTypedData = hashTypedData;
exports.hashDomain = hashDomain;
exports.hashStruct = hashStruct;
exports.encodeType = encodeType;
const encodeAbiParameters_js_1 = require("../abi/encodeAbiParameters.js");
const concat_js_1 = require("../data/concat.js");
const toHex_js_1 = require("../encoding/toHex.js");
const keccak256_js_1 = require("../hash/keccak256.js");
const typedData_js_1 = require("../typedData.js");
function hashTypedData(parameters) {
    const { domain = {}, message, primaryType, } = parameters;
    const types = {
        EIP712Domain: (0, typedData_js_1.getTypesForEIP712Domain)({ domain }),
        ...parameters.types,
    };
    (0, typedData_js_1.validateTypedData)({
        domain,
        message,
        primaryType,
        types,
    });
    const parts = ['0x1901'];
    if (domain)
        parts.push(hashDomain({
            domain,
            types: types,
        }));
    if (primaryType !== 'EIP712Domain')
        parts.push(hashStruct({
            data: message,
            primaryType,
            types: types,
        }));
    return (0, keccak256_js_1.keccak256)((0, concat_js_1.concat)(parts));
}
function hashDomain({ domain, types, }) {
    return hashStruct({
        data: domain,
        primaryType: 'EIP712Domain',
        types,
    });
}
function hashStruct({ data, primaryType, types, }) {
    const encoded = encodeData({
        data,
        primaryType,
        types,
    });
    return (0, keccak256_js_1.keccak256)(encoded);
}
function encodeData({ data, primaryType, types, }) {
    const encodedTypes = [{ type: 'bytes32' }];
    const encodedValues = [hashType({ primaryType, types })];
    for (const field of types[primaryType]) {
        const [type, value] = encodeField({
            types,
            name: field.name,
            type: field.type,
            value: data[field.name],
        });
        encodedTypes.push(type);
        encodedValues.push(value);
    }
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(encodedTypes, encodedValues);
}
function hashType({ primaryType, types, }) {
    const encodedHashType = (0, toHex_js_1.toHex)(encodeType({ primaryType, types }));
    return (0, keccak256_js_1.keccak256)(encodedHashType);
}
function encodeType({ primaryType, types, }) {
    let result = '';
    const unsortedDeps = findTypeDependencies({ primaryType, types });
    unsortedDeps.delete(primaryType);
    const deps = [primaryType, ...Array.from(unsortedDeps).sort()];
    for (const type of deps) {
        result += `${type}(${types[type]
            .map(({ name, type: t }) => `${t} ${name}`)
            .join(',')})`;
    }
    return result;
}
function findTypeDependencies({ primaryType: primaryType_, types, }, results = new Set()) {
    const match = primaryType_.match(/^\w*/u);
    const primaryType = match?.[0];
    if (results.has(primaryType) || types[primaryType] === undefined) {
        return results;
    }
    results.add(primaryType);
    for (const field of types[primaryType]) {
        findTypeDependencies({ primaryType: field.type, types }, results);
    }
    return results;
}
function encodeField({ types, name, type, value, }) {
    if (types[type] !== undefined) {
        return [
            { type: 'bytes32' },
            (0, keccak256_js_1.keccak256)(encodeData({ data: value, primaryType: type, types })),
        ];
    }
    if (type === 'bytes') {
        const prepend = value.length % 2 ? '0' : '';
        value = `0x${prepend + value.slice(2)}`;
        return [{ type: 'bytes32' }, (0, keccak256_js_1.keccak256)(value)];
    }
    if (type === 'string')
        return [{ type: 'bytes32' }, (0, keccak256_js_1.keccak256)((0, toHex_js_1.toHex)(value))];
    if (type.lastIndexOf(']') === type.length - 1) {
        const parsedType = type.slice(0, type.lastIndexOf('['));
        const typeValuePairs = value.map((item) => encodeField({
            name,
            type: parsedType,
            types,
            value: item,
        }));
        return [
            { type: 'bytes32' },
            (0, keccak256_js_1.keccak256)((0, encodeAbiParameters_js_1.encodeAbiParameters)(typeValuePairs.map(([t]) => t), typeValuePairs.map(([, v]) => v))),
        ];
    }
    return [{ type }, value];
}
//# sourceMappingURL=hashTypedData.js.map