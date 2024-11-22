import { sign } from 'webauthn-p256';
import { hashMessage } from '../../utils/signature/hashMessage.js';
import { hashTypedData } from '../../utils/signature/hashTypedData.js';
/**
 * @description Creates an Account from a WebAuthn Credential.
 *
 * @returns A WebAuthn Account.
 */
export function toWebAuthnAccount(parameters) {
    const { getFn, rpId } = parameters;
    const { id, publicKey } = parameters.credential;
    return {
        publicKey,
        async sign({ hash }) {
            return sign({ credentialId: id, getFn, hash, rpId });
        },
        async signMessage({ message }) {
            return this.sign({ hash: hashMessage(message) });
        },
        async signTypedData(parameters) {
            return this.sign({ hash: hashTypedData(parameters) });
        },
        type: 'webAuthn',
    };
}
//# sourceMappingURL=toWebAuthnAccount.js.map