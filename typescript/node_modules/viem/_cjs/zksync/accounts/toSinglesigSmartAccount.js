"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toSinglesigSmartAccount = toSinglesigSmartAccount;
const sign_js_1 = require("../../accounts/utils/sign.js");
const toSmartAccount_js_1 = require("./toSmartAccount.js");
function toSinglesigSmartAccount(parameters) {
    const { address, privateKey } = parameters;
    return (0, toSmartAccount_js_1.toSmartAccount)({
        address,
        async sign({ hash }) {
            return (0, sign_js_1.sign)({ hash, privateKey, to: 'hex' });
        },
    });
}
//# sourceMappingURL=toSinglesigSmartAccount.js.map