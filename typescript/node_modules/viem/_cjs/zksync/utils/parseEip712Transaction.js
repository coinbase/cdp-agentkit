"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseEip712Transaction = parseEip712Transaction;
const base_js_1 = require("../../errors/base.js");
const index_js_1 = require("../../utils/index.js");
function parseEip712Transaction(transaction) {
    const payload = (0, index_js_1.fromHex)(transaction, 'bytes');
    if (payload[0] !== 113)
        throw new base_js_1.BaseError('transaction type must be eip712');
    function validHex(value) {
        if (!value || value === '0x')
            return '0x0';
        return value;
    }
    function parsePaymasterArray(arr) {
        if (arr.length === 0)
            return undefined;
        if (arr.length !== 2)
            throw new base_js_1.BaseError(`Invalid paymaster parameters, expected to have length of 2, found ${arr.length}!`);
        return {
            paymaster: arr[0],
            paymasterInput: arr[1],
        };
    }
    const raw = (0, index_js_1.fromRlp)(payload.slice(1));
    const paymasterParams = parsePaymasterArray(raw[15]);
    return {
        type: 'eip712',
        nonce: (0, index_js_1.hexToNumber)(validHex(raw[0])),
        maxPriorityFeePerGas: (0, index_js_1.hexToBigInt)(validHex(raw[1])),
        maxFeePerGas: (0, index_js_1.hexToBigInt)(validHex(raw[2])),
        gas: (0, index_js_1.hexToBigInt)(validHex(raw[3])),
        to: raw[4],
        value: (0, index_js_1.hexToBigInt)(validHex(raw[5])),
        data: raw[6],
        v: (0, index_js_1.hexToBigInt)(validHex(raw[7])),
        r: raw[8],
        s: raw[9],
        chainId: (0, index_js_1.hexToNumber)(validHex(raw[10])),
        from: raw[11],
        gasPerPubdata: (0, index_js_1.hexToBigInt)(validHex(raw[12])),
        factoryDeps: raw[13],
        customSignature: raw[14],
        paymaster: paymasterParams?.paymaster,
        paymasterInput: paymasterParams?.paymasterInput,
    };
}
//# sourceMappingURL=parseEip712Transaction.js.map