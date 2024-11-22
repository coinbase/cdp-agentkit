import type { Credential, Hex, Signature, WebAuthnData } from './types.js';
export type SignParameters = GetCredentialSignRequestOptionsParameters & {
    /**
     * Credential request function. Useful for environments that do not support
     * the WebAuthn API natively (i.e. React Native or testing environments).
     *
     * @default window.navigator.credentials.get
     */
    getFn?: ((options?: CredentialRequestOptions | undefined) => Promise<Credential | null>) | undefined;
};
export type SignReturnType = {
    signature: Hex;
    webauthn: WebAuthnData;
    raw: PublicKeyCredential;
};
/**
 * Signs a hash using a stored credential. If no credential is provided,
 * a prompt will be displayed for the user to select an existing credential
 * that was previously registered.
 *
 * @example
 * ```ts
 * import { credential } from './credential'
 *
 * const signature = await sign({
 *   credentialId: credential.id,
 *   hash: '0x...',
 * })
 * ```
 */
export declare function sign(parameters: SignParameters): Promise<SignReturnType>;
export type GetCredentialSignRequestOptionsParameters = {
    credentialId?: string | undefined;
    hash: Hex;
    /**
     * The relying party identifier to use.
     */
    rpId?: PublicKeyCredentialRequestOptions['rpId'] | undefined;
    userVerification?: PublicKeyCredentialRequestOptions['userVerification'] | undefined;
};
export type GetCredentialSignRequestOptionsReturnType = CredentialRequestOptions;
/**
 * Returns the request options to sign a hash using a stored credential
 * with a P256 public key.
 *
 * @example
 * ```ts
 * const options = getCredentialSignRequestOptions({ hash: '0x...' })
 * const credentials = window.navigator.credentials.get(options)
 * ```
 */
export declare function getCredentialSignRequestOptions(parameters: GetCredentialSignRequestOptionsParameters): GetCredentialSignRequestOptionsReturnType;
/**
 * @internal
 * Parses an ASN.1 signature into a r and s value.
 */
export declare function parseAsn1Signature(bytes: Uint8Array): {
    r: bigint;
    s: bigint;
};
/**
 * Parses a serialized signature into r and s values.
 */
export declare function parseSignature(signature: Hex | Uint8Array): Signature;
export type SerializeSignatureOptions<to extends 'hex' | 'bytes' = 'hex'> = {
    to?: to | 'bytes' | 'hex' | undefined;
};
/**
 * Serializes a signature into a hex string or bytes.
 */
export declare function serializeSignature<to extends 'hex' | 'bytes' = 'hex'>(signature: Signature, options?: SerializeSignatureOptions<to>): to extends 'hex' ? Hex : Uint8Array;
//# sourceMappingURL=sign.d.ts.map