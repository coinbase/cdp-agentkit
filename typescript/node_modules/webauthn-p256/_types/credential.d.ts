import type { Credential, OneOf, P256Credential, Prettify, PublicKeyCredentialCreationOptions } from './types.js';
export declare const createChallenge: Uint8Array;
export type CreateCredentialParameters = GetCredentialCreationOptionsParameters & {
    /**
     * Credential creation function. Useful for environments that do not support
     * the WebAuthn API natively (i.e. React Native or testing environments).
     *
     * @default window.navigator.credentials.create
     */
    createFn?: ((options?: CredentialCreationOptions | undefined) => Promise<Credential | null>) | undefined;
};
export type CreateCredentialReturnType = Prettify<P256Credential>;
/**
 * Creates a new credential, which can be stored and later used for signing.
 *
 * @example
 * ```ts
 * const credential = await createCredential({ name: 'Example' })
 * ```
 */
export declare function createCredential(parameters: CreateCredentialParameters): Promise<CreateCredentialReturnType>;
export type GetCredentialCreationOptionsParameters = {
    /**
     * A string specifying the relying party's preference for how the attestation statement
     * (i.e., provision of verifiable evidence of the authenticity of the authenticator and its data)
     * is conveyed during credential creation.
     */
    attestation?: PublicKeyCredentialCreationOptions['attestation'] | undefined;
    /**
     * An object whose properties are criteria used to filter out the potential authenticators
     * for the credential creation operation.
     */
    authenticatorSelection?: PublicKeyCredentialCreationOptions['authenticatorSelection'] | undefined;
    /**
     * An `ArrayBuffer`, `TypedArray`, or `DataView` used as a cryptographic challenge.
     */
    challenge?: PublicKeyCredentialCreationOptions['challenge'] | undefined;
    /**
     * List of credential IDs to exclude from the creation. This property can be used
     * to prevent creation of a credential if it already exists.
     */
    excludeCredentialIds?: readonly string[] | undefined;
    /**
     * List of Web Authentication API credentials to use during creation or authentication.
     */
    extensions?: PublicKeyCredentialCreationOptions['extensions'] | undefined;
    /**
     * An object describing the relying party that requested the credential creation
     */
    rp?: {
        id: string;
        name: string;
    } | undefined;
    /**
     * A numerical hint, in milliseconds, which indicates the time the calling web app is willing to wait for the creation operation to complete.
     */
    timeout?: PublicKeyCredentialCreationOptions['timeout'] | undefined;
} & OneOf<{
    /** Name for the credential (user.name). */
    name: string;
} | {
    /**
     * An object describing the user account for which the credential is generated.
     */
    user: {
        displayName?: string;
        id?: BufferSource;
        name: string;
    };
}>;
export type GetCredentialCreationOptionsReturnType = CredentialCreationOptions;
/**
 * Returns the creation options for a P256 WebAuthn Credential with a Passkey authenticator.
 *
 * @example
 * ```ts
 * const options = getCredentialCreationOptions({ name: 'Example' })
 * const credentials = window.navigator.credentials.create(options)
 * ```
 */
export declare function getCredentialCreationOptions(parameters: GetCredentialCreationOptionsParameters): GetCredentialCreationOptionsReturnType;
//# sourceMappingURL=credential.d.ts.map