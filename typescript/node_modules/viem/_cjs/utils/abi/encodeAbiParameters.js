"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeAbiParameters = encodeAbiParameters;
exports.getArrayComponents = getArrayComponents;
const abi_js_1 = require("../../errors/abi.js");
const address_js_1 = require("../../errors/address.js");
const base_js_1 = require("../../errors/base.js");
const isAddress_js_1 = require("../address/isAddress.js");
const concat_js_1 = require("../data/concat.js");
const pad_js_1 = require("../data/pad.js");
const size_js_1 = require("../data/size.js");
const slice_js_1 = require("../data/slice.js");
const toHex_js_1 = require("../encoding/toHex.js");
function encodeAbiParameters(params, values) {
    if (params.length !== values.length)
        throw new abi_js_1.AbiEncodingLengthMismatchError({
            expectedLength: params.length,
            givenLength: values.length,
        });
    const preparedParams = prepareParams({
        params: params,
        values: values,
    });
    const data = encodeParams(preparedParams);
    if (data.length === 0)
        return '0x';
    return data;
}
function prepareParams({ params, values, }) {
    const preparedParams = [];
    for (let i = 0; i < params.length; i++) {
        preparedParams.push(prepareParam({ param: params[i], value: values[i] }));
    }
    return preparedParams;
}
function prepareParam({ param, value, }) {
    const arrayComponents = getArrayComponents(param.type);
    if (arrayComponents) {
        const [length, type] = arrayComponents;
        return encodeArray(value, { length, param: { ...param, type } });
    }
    if (param.type === 'tuple') {
        return encodeTuple(value, {
            param: param,
        });
    }
    if (param.type === 'address') {
        return encodeAddress(value);
    }
    if (param.type === 'bool') {
        return encodeBool(value);
    }
    if (param.type.startsWith('uint') || param.type.startsWith('int')) {
        const signed = param.type.startsWith('int');
        return encodeNumber(value, { signed });
    }
    if (param.type.startsWith('bytes')) {
        return encodeBytes(value, { param });
    }
    if (param.type === 'string') {
        return encodeString(value);
    }
    throw new abi_js_1.InvalidAbiEncodingTypeError(param.type, {
        docsPath: '/docs/contract/encodeAbiParameters',
    });
}
function encodeParams(preparedParams) {
    let staticSize = 0;
    for (let i = 0; i < preparedParams.length; i++) {
        const { dynamic, encoded } = preparedParams[i];
        if (dynamic)
            staticSize += 32;
        else
            staticSize += (0, size_js_1.size)(encoded);
    }
    const staticParams = [];
    const dynamicParams = [];
    let dynamicSize = 0;
    for (let i = 0; i < preparedParams.length; i++) {
        const { dynamic, encoded } = preparedParams[i];
        if (dynamic) {
            staticParams.push((0, toHex_js_1.numberToHex)(staticSize + dynamicSize, { size: 32 }));
            dynamicParams.push(encoded);
            dynamicSize += (0, size_js_1.size)(encoded);
        }
        else {
            staticParams.push(encoded);
        }
    }
    return (0, concat_js_1.concat)([...staticParams, ...dynamicParams]);
}
function encodeAddress(value) {
    if (!(0, isAddress_js_1.isAddress)(value))
        throw new address_js_1.InvalidAddressError({ address: value });
    return { dynamic: false, encoded: (0, pad_js_1.padHex)(value.toLowerCase()) };
}
function encodeArray(value, { length, param, }) {
    const dynamic = length === null;
    if (!Array.isArray(value))
        throw new abi_js_1.InvalidArrayError(value);
    if (!dynamic && value.length !== length)
        throw new abi_js_1.AbiEncodingArrayLengthMismatchError({
            expectedLength: length,
            givenLength: value.length,
            type: `${param.type}[${length}]`,
        });
    let dynamicChild = false;
    const preparedParams = [];
    for (let i = 0; i < value.length; i++) {
        const preparedParam = prepareParam({ param, value: value[i] });
        if (preparedParam.dynamic)
            dynamicChild = true;
        preparedParams.push(preparedParam);
    }
    if (dynamic || dynamicChild) {
        const data = encodeParams(preparedParams);
        if (dynamic) {
            const length = (0, toHex_js_1.numberToHex)(preparedParams.length, { size: 32 });
            return {
                dynamic: true,
                encoded: preparedParams.length > 0 ? (0, concat_js_1.concat)([length, data]) : length,
            };
        }
        if (dynamicChild)
            return { dynamic: true, encoded: data };
    }
    return {
        dynamic: false,
        encoded: (0, concat_js_1.concat)(preparedParams.map(({ encoded }) => encoded)),
    };
}
function encodeBytes(value, { param }) {
    const [, paramSize] = param.type.split('bytes');
    const bytesSize = (0, size_js_1.size)(value);
    if (!paramSize) {
        let value_ = value;
        if (bytesSize % 32 !== 0)
            value_ = (0, pad_js_1.padHex)(value_, {
                dir: 'right',
                size: Math.ceil((value.length - 2) / 2 / 32) * 32,
            });
        return {
            dynamic: true,
            encoded: (0, concat_js_1.concat)([(0, pad_js_1.padHex)((0, toHex_js_1.numberToHex)(bytesSize, { size: 32 })), value_]),
        };
    }
    if (bytesSize !== Number.parseInt(paramSize))
        throw new abi_js_1.AbiEncodingBytesSizeMismatchError({
            expectedSize: Number.parseInt(paramSize),
            value,
        });
    return { dynamic: false, encoded: (0, pad_js_1.padHex)(value, { dir: 'right' }) };
}
function encodeBool(value) {
    if (typeof value !== 'boolean')
        throw new base_js_1.BaseError(`Invalid boolean value: "${value}" (type: ${typeof value}). Expected: \`true\` or \`false\`.`);
    return { dynamic: false, encoded: (0, pad_js_1.padHex)((0, toHex_js_1.boolToHex)(value)) };
}
function encodeNumber(value, { signed }) {
    return {
        dynamic: false,
        encoded: (0, toHex_js_1.numberToHex)(value, {
            size: 32,
            signed,
        }),
    };
}
function encodeString(value) {
    const hexValue = (0, toHex_js_1.stringToHex)(value);
    const partsLength = Math.ceil((0, size_js_1.size)(hexValue) / 32);
    const parts = [];
    for (let i = 0; i < partsLength; i++) {
        parts.push((0, pad_js_1.padHex)((0, slice_js_1.slice)(hexValue, i * 32, (i + 1) * 32), {
            dir: 'right',
        }));
    }
    return {
        dynamic: true,
        encoded: (0, concat_js_1.concat)([
            (0, pad_js_1.padHex)((0, toHex_js_1.numberToHex)((0, size_js_1.size)(hexValue), { size: 32 })),
            ...parts,
        ]),
    };
}
function encodeTuple(value, { param }) {
    let dynamic = false;
    const preparedParams = [];
    for (let i = 0; i < param.components.length; i++) {
        const param_ = param.components[i];
        const index = Array.isArray(value) ? i : param_.name;
        const preparedParam = prepareParam({
            param: param_,
            value: value[index],
        });
        preparedParams.push(preparedParam);
        if (preparedParam.dynamic)
            dynamic = true;
    }
    return {
        dynamic,
        encoded: dynamic
            ? encodeParams(preparedParams)
            : (0, concat_js_1.concat)(preparedParams.map(({ encoded }) => encoded)),
    };
}
function getArrayComponents(type) {
    const matches = type.match(/^(.*)\[(\d+)?\]$/);
    return matches
        ?
            [matches[2] ? Number(matches[2]) : null, matches[1]]
        : undefined;
}
//# sourceMappingURL=encodeAbiParameters.js.map