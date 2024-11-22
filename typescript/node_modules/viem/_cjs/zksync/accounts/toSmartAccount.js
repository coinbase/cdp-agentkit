"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toSmartAccount = toSmartAccount;
const toAccount_js_1 = require("../../accounts/toAccount.js");
const index_js_1 = require("../../utils/index.js");
const hashMessage_js_1 = require("../../utils/signature/hashMessage.js");
const hashTypedData_js_1 = require("../../utils/signature/hashTypedData.js");
const serializers_js_1 = require("../serializers.js");
function toSmartAccount(parameters) {
    const { address, sign } = parameters;
    const account = (0, toAccount_js_1.toAccount)({
        address,
        sign,
        async signMessage({ message }) {
            return sign({
                hash: (0, hashMessage_js_1.hashMessage)(message),
            });
        },
        async signTransaction(transaction) {
            const signableTransaction = {
                ...transaction,
                from: this.address,
            };
            return (0, serializers_js_1.serializeTransaction)({
                ...signableTransaction,
                customSignature: await sign({
                    hash: (0, index_js_1.keccak256)((0, serializers_js_1.serializeTransaction)(signableTransaction)),
                }),
            });
        },
        async signTypedData(typedData) {
            return sign({
                hash: (0, hashTypedData_js_1.hashTypedData)(typedData),
            });
        },
    });
    return {
        ...account,
        source: 'smartAccountZksync',
    };
}
//# sourceMappingURL=toSmartAccount.js.map