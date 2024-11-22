import type { Hex, WebAuthnData } from './types.js';
export type VerifyParameters = {
    hash: Hex;
    publicKey: Hex;
    signature: Hex;
    webauthn: WebAuthnData;
};
export type VerifyReturnType = boolean;
/**
 * Verifies a signature using the credential public key and the hash which was signed.
 *
 * @example
 * ```ts
 * import { sign, verify } from 'webauthn-p256'
 * import { credential } from './credential'
 *
 * const hash = '0x...'
 * const signature = await sign({ hash, credentialId: credential.id })
 * const valid = await verify({ hash, publicKey, signature })
 * ```
 */
export declare function verify(parameters: VerifyParameters): Promise<VerifyReturnType>;
//# sourceMappingURL=verify.d.ts.map