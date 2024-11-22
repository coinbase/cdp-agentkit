"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineTransactionRequest = exports.rpcTransactionType = void 0;
exports.formatTransactionRequest = formatTransactionRequest;
const toHex_js_1 = require("../encoding/toHex.js");
const formatter_js_1 = require("./formatter.js");
exports.rpcTransactionType = {
    legacy: '0x0',
    eip2930: '0x1',
    eip1559: '0x2',
    eip4844: '0x3',
    eip7702: '0x4',
};
function formatTransactionRequest(request) {
    const rpcRequest = {};
    if (typeof request.authorizationList !== 'undefined')
        rpcRequest.authorizationList = formatAuthorizationList(request.authorizationList);
    if (typeof request.accessList !== 'undefined')
        rpcRequest.accessList = request.accessList;
    if (typeof request.blobVersionedHashes !== 'undefined')
        rpcRequest.blobVersionedHashes = request.blobVersionedHashes;
    if (typeof request.blobs !== 'undefined') {
        if (typeof request.blobs[0] !== 'string')
            rpcRequest.blobs = request.blobs.map((x) => (0, toHex_js_1.bytesToHex)(x));
        else
            rpcRequest.blobs = request.blobs;
    }
    if (typeof request.data !== 'undefined')
        rpcRequest.data = request.data;
    if (typeof request.from !== 'undefined')
        rpcRequest.from = request.from;
    if (typeof request.gas !== 'undefined')
        rpcRequest.gas = (0, toHex_js_1.numberToHex)(request.gas);
    if (typeof request.gasPrice !== 'undefined')
        rpcRequest.gasPrice = (0, toHex_js_1.numberToHex)(request.gasPrice);
    if (typeof request.maxFeePerBlobGas !== 'undefined')
        rpcRequest.maxFeePerBlobGas = (0, toHex_js_1.numberToHex)(request.maxFeePerBlobGas);
    if (typeof request.maxFeePerGas !== 'undefined')
        rpcRequest.maxFeePerGas = (0, toHex_js_1.numberToHex)(request.maxFeePerGas);
    if (typeof request.maxPriorityFeePerGas !== 'undefined')
        rpcRequest.maxPriorityFeePerGas = (0, toHex_js_1.numberToHex)(request.maxPriorityFeePerGas);
    if (typeof request.nonce !== 'undefined')
        rpcRequest.nonce = (0, toHex_js_1.numberToHex)(request.nonce);
    if (typeof request.to !== 'undefined')
        rpcRequest.to = request.to;
    if (typeof request.type !== 'undefined')
        rpcRequest.type = exports.rpcTransactionType[request.type];
    if (typeof request.value !== 'undefined')
        rpcRequest.value = (0, toHex_js_1.numberToHex)(request.value);
    return rpcRequest;
}
exports.defineTransactionRequest = (0, formatter_js_1.defineFormatter)('transactionRequest', formatTransactionRequest);
function formatAuthorizationList(authorizationList) {
    return authorizationList.map((authorization) => ({
        address: authorization.contractAddress,
        r: authorization.r,
        s: authorization.s,
        chainId: (0, toHex_js_1.numberToHex)(authorization.chainId),
        nonce: (0, toHex_js_1.numberToHex)(authorization.nonce),
        ...(typeof authorization.yParity !== 'undefined'
            ? { yParity: (0, toHex_js_1.numberToHex)(authorization.yParity) }
            : {}),
        ...(typeof authorization.v !== 'undefined' &&
            typeof authorization.yParity === 'undefined'
            ? { v: (0, toHex_js_1.numberToHex)(authorization.v) }
            : {}),
    }));
}
//# sourceMappingURL=transactionRequest.js.map