"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toWebAuthnAccount = toWebAuthnAccount;
const webauthn_p256_1 = require("webauthn-p256");
const hashMessage_js_1 = require("../../utils/signature/hashMessage.js");
const hashTypedData_js_1 = require("../../utils/signature/hashTypedData.js");
function toWebAuthnAccount(parameters) {
    const { getFn, rpId } = parameters;
    const { id, publicKey } = parameters.credential;
    return {
        publicKey,
        async sign({ hash }) {
            return (0, webauthn_p256_1.sign)({ credentialId: id, getFn, hash, rpId });
        },
        async signMessage({ message }) {
            return this.sign({ hash: (0, hashMessage_js_1.hashMessage)(message) });
        },
        async signTypedData(parameters) {
            return this.sign({ hash: (0, hashTypedData_js_1.hashTypedData)(parameters) });
        },
        type: 'webAuthn',
    };
}
//# sourceMappingURL=toWebAuthnAccount.js.map