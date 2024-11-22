"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeAbiParameters = decodeAbiParameters;
const abi_js_1 = require("../../errors/abi.js");
const getAddress_js_1 = require("../address/getAddress.js");
const cursor_js_1 = require("../cursor.js");
const size_js_1 = require("../data/size.js");
const slice_js_1 = require("../data/slice.js");
const trim_js_1 = require("../data/trim.js");
const fromBytes_js_1 = require("../encoding/fromBytes.js");
const toBytes_js_1 = require("../encoding/toBytes.js");
const toHex_js_1 = require("../encoding/toHex.js");
const encodeAbiParameters_js_1 = require("./encodeAbiParameters.js");
function decodeAbiParameters(params, data) {
    const bytes = typeof data === 'string' ? (0, toBytes_js_1.hexToBytes)(data) : data;
    const cursor = (0, cursor_js_1.createCursor)(bytes);
    if ((0, size_js_1.size)(bytes) === 0 && params.length > 0)
        throw new abi_js_1.AbiDecodingZeroDataError();
    if ((0, size_js_1.size)(data) && (0, size_js_1.size)(data) < 32)
        throw new abi_js_1.AbiDecodingDataSizeTooSmallError({
            data: typeof data === 'string' ? data : (0, toHex_js_1.bytesToHex)(data),
            params: params,
            size: (0, size_js_1.size)(data),
        });
    let consumed = 0;
    const values = [];
    for (let i = 0; i < params.length; ++i) {
        const param = params[i];
        cursor.setPosition(consumed);
        const [data, consumed_] = decodeParameter(cursor, param, {
            staticPosition: 0,
        });
        consumed += consumed_;
        values.push(data);
    }
    return values;
}
function decodeParameter(cursor, param, { staticPosition }) {
    const arrayComponents = (0, encodeAbiParameters_js_1.getArrayComponents)(param.type);
    if (arrayComponents) {
        const [length, type] = arrayComponents;
        return decodeArray(cursor, { ...param, type }, { length, staticPosition });
    }
    if (param.type === 'tuple')
        return decodeTuple(cursor, param, { staticPosition });
    if (param.type === 'address')
        return decodeAddress(cursor);
    if (param.type === 'bool')
        return decodeBool(cursor);
    if (param.type.startsWith('bytes'))
        return decodeBytes(cursor, param, { staticPosition });
    if (param.type.startsWith('uint') || param.type.startsWith('int'))
        return decodeNumber(cursor, param);
    if (param.type === 'string')
        return decodeString(cursor, { staticPosition });
    throw new abi_js_1.InvalidAbiDecodingTypeError(param.type, {
        docsPath: '/docs/contract/decodeAbiParameters',
    });
}
const sizeOfLength = 32;
const sizeOfOffset = 32;
function decodeAddress(cursor) {
    const value = cursor.readBytes(32);
    return [(0, getAddress_js_1.checksumAddress)((0, toHex_js_1.bytesToHex)((0, slice_js_1.sliceBytes)(value, -20))), 32];
}
function decodeArray(cursor, param, { length, staticPosition }) {
    if (!length) {
        const offset = (0, fromBytes_js_1.bytesToNumber)(cursor.readBytes(sizeOfOffset));
        const start = staticPosition + offset;
        const startOfData = start + sizeOfLength;
        cursor.setPosition(start);
        const length = (0, fromBytes_js_1.bytesToNumber)(cursor.readBytes(sizeOfLength));
        const dynamicChild = hasDynamicChild(param);
        let consumed = 0;
        const value = [];
        for (let i = 0; i < length; ++i) {
            cursor.setPosition(startOfData + (dynamicChild ? i * 32 : consumed));
            const [data, consumed_] = decodeParameter(cursor, param, {
                staticPosition: startOfData,
            });
            consumed += consumed_;
            value.push(data);
        }
        cursor.setPosition(staticPosition + 32);
        return [value, 32];
    }
    if (hasDynamicChild(param)) {
        const offset = (0, fromBytes_js_1.bytesToNumber)(cursor.readBytes(sizeOfOffset));
        const start = staticPosition + offset;
        const value = [];
        for (let i = 0; i < length; ++i) {
            cursor.setPosition(start + i * 32);
            const [data] = decodeParameter(cursor, param, {
                staticPosition: start,
            });
            value.push(data);
        }
        cursor.setPosition(staticPosition + 32);
        return [value, 32];
    }
    let consumed = 0;
    const value = [];
    for (let i = 0; i < length; ++i) {
        const [data, consumed_] = decodeParameter(cursor, param, {
            staticPosition: staticPosition + consumed,
        });
        consumed += consumed_;
        value.push(data);
    }
    return [value, consumed];
}
function decodeBool(cursor) {
    return [(0, fromBytes_js_1.bytesToBool)(cursor.readBytes(32), { size: 32 }), 32];
}
function decodeBytes(cursor, param, { staticPosition }) {
    const [_, size] = param.type.split('bytes');
    if (!size) {
        const offset = (0, fromBytes_js_1.bytesToNumber)(cursor.readBytes(32));
        cursor.setPosition(staticPosition + offset);
        const length = (0, fromBytes_js_1.bytesToNumber)(cursor.readBytes(32));
        if (length === 0) {
            cursor.setPosition(staticPosition + 32);
            return ['0x', 32];
        }
        const data = cursor.readBytes(length);
        cursor.setPosition(staticPosition + 32);
        return [(0, toHex_js_1.bytesToHex)(data), 32];
    }
    const value = (0, toHex_js_1.bytesToHex)(cursor.readBytes(Number.parseInt(size), 32));
    return [value, 32];
}
function decodeNumber(cursor, param) {
    const signed = param.type.startsWith('int');
    const size = Number.parseInt(param.type.split('int')[1] || '256');
    const value = cursor.readBytes(32);
    return [
        size > 48
            ? (0, fromBytes_js_1.bytesToBigInt)(value, { signed })
            : (0, fromBytes_js_1.bytesToNumber)(value, { signed }),
        32,
    ];
}
function decodeTuple(cursor, param, { staticPosition }) {
    const hasUnnamedChild = param.components.length === 0 || param.components.some(({ name }) => !name);
    const value = hasUnnamedChild ? [] : {};
    let consumed = 0;
    if (hasDynamicChild(param)) {
        const offset = (0, fromBytes_js_1.bytesToNumber)(cursor.readBytes(sizeOfOffset));
        const start = staticPosition + offset;
        for (let i = 0; i < param.components.length; ++i) {
            const component = param.components[i];
            cursor.setPosition(start + consumed);
            const [data, consumed_] = decodeParameter(cursor, component, {
                staticPosition: start,
            });
            consumed += consumed_;
            value[hasUnnamedChild ? i : component?.name] = data;
        }
        cursor.setPosition(staticPosition + 32);
        return [value, 32];
    }
    for (let i = 0; i < param.components.length; ++i) {
        const component = param.components[i];
        const [data, consumed_] = decodeParameter(cursor, component, {
            staticPosition,
        });
        value[hasUnnamedChild ? i : component?.name] = data;
        consumed += consumed_;
    }
    return [value, consumed];
}
function decodeString(cursor, { staticPosition }) {
    const offset = (0, fromBytes_js_1.bytesToNumber)(cursor.readBytes(32));
    const start = staticPosition + offset;
    cursor.setPosition(start);
    const length = (0, fromBytes_js_1.bytesToNumber)(cursor.readBytes(32));
    if (length === 0) {
        cursor.setPosition(staticPosition + 32);
        return ['', 32];
    }
    const data = cursor.readBytes(length, 32);
    const value = (0, fromBytes_js_1.bytesToString)((0, trim_js_1.trim)(data));
    cursor.setPosition(staticPosition + 32);
    return [value, 32];
}
function hasDynamicChild(param) {
    const { type } = param;
    if (type === 'string')
        return true;
    if (type === 'bytes')
        return true;
    if (type.endsWith('[]'))
        return true;
    if (type === 'tuple')
        return param.components?.some(hasDynamicChild);
    const arrayComponents = (0, encodeAbiParameters_js_1.getArrayComponents)(param.type);
    if (arrayComponents &&
        hasDynamicChild({ ...param, type: arrayComponents[1] }))
        return true;
    return false;
}
//# sourceMappingURL=decodeAbiParameters.js.map