"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapTypedDataSignature = wrapTypedDataSignature;
const index_js_1 = require("../../../accounts/index.js");
const encodePacked_js_1 = require("../../../utils/abi/encodePacked.js");
const isHex_js_1 = require("../../../utils/data/isHex.js");
const size_js_1 = require("../../../utils/data/size.js");
const toHex_js_1 = require("../../../utils/encoding/toHex.js");
const hashTypedData_js_1 = require("../../../utils/signature/hashTypedData.js");
const typedData_js_1 = require("../../../utils/typedData.js");
function wrapTypedDataSignature(parameters) {
    const { domain, message, primaryType, signature, types } = parameters;
    const signatureHex = (() => {
        if ((0, isHex_js_1.isHex)(signature))
            return signature;
        if (typeof signature === 'object' && 'r' in signature && 's' in signature)
            return (0, index_js_1.serializeSignature)(signature);
        return (0, toHex_js_1.bytesToHex)(signature);
    })();
    const hashedDomain = (0, hashTypedData_js_1.hashStruct)({
        data: domain ?? {},
        types: {
            EIP712Domain: (0, typedData_js_1.getTypesForEIP712Domain)({ domain }),
        },
        primaryType: 'EIP712Domain',
    });
    const hashedContents = (0, hashTypedData_js_1.hashStruct)({
        data: message,
        types: types,
        primaryType,
    });
    const encodedType = (0, hashTypedData_js_1.encodeType)({
        primaryType,
        types: types,
    });
    return (0, encodePacked_js_1.encodePacked)(['bytes', 'bytes32', 'bytes32', 'bytes', 'uint16'], [
        signatureHex,
        hashedDomain,
        hashedContents,
        (0, toHex_js_1.stringToHex)(encodedType),
        (0, size_js_1.size)((0, toHex_js_1.stringToHex)(encodedType)),
    ]);
}
//# sourceMappingURL=wrapTypedDataSignature.js.map