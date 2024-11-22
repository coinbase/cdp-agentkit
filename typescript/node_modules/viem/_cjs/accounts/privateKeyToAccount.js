"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.privateKeyToAccount = privateKeyToAccount;
const secp256k1_1 = require("@noble/curves/secp256k1");
const toHex_js_1 = require("../utils/encoding/toHex.js");
const toAccount_js_1 = require("./toAccount.js");
const publicKeyToAddress_js_1 = require("./utils/publicKeyToAddress.js");
const sign_js_1 = require("./utils/sign.js");
const signAuthorization_js_1 = require("./utils/signAuthorization.js");
const signMessage_js_1 = require("./utils/signMessage.js");
const signTransaction_js_1 = require("./utils/signTransaction.js");
const signTypedData_js_1 = require("./utils/signTypedData.js");
function privateKeyToAccount(privateKey, options = {}) {
    const { nonceManager } = options;
    const publicKey = (0, toHex_js_1.toHex)(secp256k1_1.secp256k1.getPublicKey(privateKey.slice(2), false));
    const address = (0, publicKeyToAddress_js_1.publicKeyToAddress)(publicKey);
    const account = (0, toAccount_js_1.toAccount)({
        address,
        nonceManager,
        async sign({ hash }) {
            return (0, sign_js_1.sign)({ hash, privateKey, to: 'hex' });
        },
        async experimental_signAuthorization(authorization) {
            return (0, signAuthorization_js_1.experimental_signAuthorization)({ ...authorization, privateKey });
        },
        async signMessage({ message }) {
            return (0, signMessage_js_1.signMessage)({ message, privateKey });
        },
        async signTransaction(transaction, { serializer } = {}) {
            return (0, signTransaction_js_1.signTransaction)({ privateKey, transaction, serializer });
        },
        async signTypedData(typedData) {
            return (0, signTypedData_js_1.signTypedData)({ ...typedData, privateKey });
        },
    });
    return {
        ...account,
        publicKey,
        source: 'privateKey',
    };
}
//# sourceMappingURL=privateKeyToAccount.js.map