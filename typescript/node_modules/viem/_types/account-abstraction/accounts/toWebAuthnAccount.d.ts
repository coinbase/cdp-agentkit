import { type P256Credential, type SignParameters } from 'webauthn-p256';
import type { ErrorType } from '../../errors/utils.js';
import type { WebAuthnAccount } from './types.js';
export type ToWebAuthnAccountParameters = {
    /**
     * The WebAuthn P256 credential to use.
     */
    credential: {
        id: P256Credential['id'];
        publicKey: P256Credential['publicKey'];
    };
    /**
     * Credential request function. Useful for environments that do not support
     * the WebAuthn API natively (i.e. React Native or testing environments).
     *
     * @default window.navigator.credentials.get
     */
    getFn?: SignParameters['getFn'] | undefined;
    /**
     * The relying party identifier to use.
     */
    rpId?: SignParameters['rpId'] | undefined;
};
export type ToWebAuthnAccountReturnType = WebAuthnAccount;
export type ToWebAuthnAccountErrorType = ErrorType;
/**
 * @description Creates an Account from a WebAuthn Credential.
 *
 * @returns A WebAuthn Account.
 */
export declare function toWebAuthnAccount(parameters: ToWebAuthnAccountParameters): WebAuthnAccount;
//# sourceMappingURL=toWebAuthnAccount.d.ts.map