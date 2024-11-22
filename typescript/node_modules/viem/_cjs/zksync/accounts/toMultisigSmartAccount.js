"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toMultisigSmartAccount = toMultisigSmartAccount;
const sign_js_1 = require("../../accounts/utils/sign.js");
const index_js_1 = require("../../utils/index.js");
const toSmartAccount_js_1 = require("./toSmartAccount.js");
function toMultisigSmartAccount(parameters) {
    const { address, privateKeys } = parameters;
    return (0, toSmartAccount_js_1.toSmartAccount)({
        address,
        async sign({ hash }) {
            return (0, index_js_1.concatHex)(await Promise.all(privateKeys.map((privateKey) => (0, sign_js_1.sign)({ hash, privateKey, to: 'hex' }))));
        },
    });
}
//# sourceMappingURL=toMultisigSmartAccount.js.map