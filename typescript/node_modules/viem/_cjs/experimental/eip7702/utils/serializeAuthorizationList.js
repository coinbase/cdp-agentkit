"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeAuthorizationList = serializeAuthorizationList;
const toHex_js_1 = require("../../../utils/encoding/toHex.js");
const serializeTransaction_js_1 = require("../../../utils/transaction/serializeTransaction.js");
function serializeAuthorizationList(authorizationList) {
    if (!authorizationList || authorizationList.length === 0)
        return [];
    const serializedAuthorizationList = [];
    for (const authorization of authorizationList) {
        const { contractAddress, chainId, nonce, ...signature } = authorization;
        serializedAuthorizationList.push([
            chainId ? (0, toHex_js_1.toHex)(chainId) : '0x',
            contractAddress,
            nonce ? (0, toHex_js_1.toHex)(nonce) : '0x',
            ...(0, serializeTransaction_js_1.toYParitySignatureArray)({}, signature),
        ]);
    }
    return serializedAuthorizationList;
}
//# sourceMappingURL=serializeAuthorizationList.js.map