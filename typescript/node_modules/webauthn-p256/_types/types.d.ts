export type Hex = `0x${string}`;
export type P256Credential = {
    id: string;
    publicKey: Hex;
    raw: PublicKeyCredential;
};
export type PublicKey = {
    prefix?: number | undefined;
    x: bigint;
    y: bigint;
};
export type WebAuthnData = {
    authenticatorData: Hex;
    challengeIndex: number;
    clientDataJSON: string;
    typeIndex: number;
    userVerificationRequired: boolean;
};
export type Signature = {
    r: bigint;
    s: bigint;
};
export type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
export type OneOf<union extends object, fallback extends object | undefined = undefined, keys extends KeyofUnion<union> = KeyofUnion<union>> = union extends infer Item ? Prettify<Item & {
    [_K in Exclude<keys, keyof Item>]?: fallback extends object ? fallback[_K] : undefined;
}> : never;
type KeyofUnion<type> = type extends type ? keyof type : never;
type AttestationConveyancePreference = 'direct' | 'enterprise' | 'indirect' | 'none';
type AuthenticatorAttachment = 'cross-platform' | 'platform';
type AuthenticatorTransport = 'ble' | 'hybrid' | 'internal' | 'nfc' | 'usb';
type COSEAlgorithmIdentifier = number;
type CredentialMediationRequirement = 'conditional' | 'optional' | 'required' | 'silent';
type PublicKeyCredentialType = 'public-key';
type ResidentKeyRequirement = 'discouraged' | 'preferred' | 'required';
type UserVerificationRequirement = 'discouraged' | 'preferred' | 'required';
type LargeBlobSupport = {
    support: 'required' | 'preferred';
};
type BufferSource = ArrayBufferView | ArrayBuffer;
type PrfExtension = Record<'eval', Record<'first', Uint8Array>>;
interface AuthenticationExtensionsClientInputs {
    appid?: string;
    credProps?: boolean;
    hmacCreateSecret?: boolean;
    minPinLength?: boolean;
    prf?: PrfExtension;
    largeBlob?: LargeBlobSupport;
}
interface AuthenticatorSelectionCriteria {
    authenticatorAttachment?: AuthenticatorAttachment;
    requireResidentKey?: boolean;
    residentKey?: ResidentKeyRequirement;
    userVerification?: UserVerificationRequirement;
}
export interface Credential {
    readonly id: string;
    readonly type: string;
}
export interface CredentialCreationOptions {
    publicKey?: PublicKeyCredentialCreationOptions;
    signal?: AbortSignal;
}
export interface CredentialRequestOptions {
    mediation?: CredentialMediationRequirement;
    publicKey?: PublicKeyCredentialRequestOptions;
    signal?: AbortSignal;
}
export interface PublicKeyCredential extends Credential {
    readonly authenticatorAttachment: string | null;
    readonly rawId: ArrayBuffer;
    readonly response: AuthenticatorResponse;
    getClientExtensionResults(): AuthenticationExtensionsClientOutputs;
}
export interface PublicKeyCredentialCreationOptions {
    attestation?: AttestationConveyancePreference;
    authenticatorSelection?: AuthenticatorSelectionCriteria;
    challenge: BufferSource;
    excludeCredentials?: PublicKeyCredentialDescriptor[];
    extensions?: AuthenticationExtensionsClientInputs;
    pubKeyCredParams: PublicKeyCredentialParameters[];
    rp: PublicKeyCredentialRpEntity;
    timeout?: number;
    user: PublicKeyCredentialUserEntity;
}
interface PublicKeyCredentialDescriptor {
    id: BufferSource;
    transports?: AuthenticatorTransport[];
    type: PublicKeyCredentialType;
}
interface PublicKeyCredentialEntity {
    name: string;
}
interface PublicKeyCredentialParameters {
    alg: COSEAlgorithmIdentifier;
    type: PublicKeyCredentialType;
}
interface PublicKeyCredentialRequestOptions {
    allowCredentials?: PublicKeyCredentialDescriptor[];
    challenge: BufferSource;
    extensions?: AuthenticationExtensionsClientInputs;
    rpId?: string;
    timeout?: number;
    userVerification?: UserVerificationRequirement;
}
interface PublicKeyCredentialRpEntity extends PublicKeyCredentialEntity {
    id?: string;
}
interface PublicKeyCredentialUserEntity extends PublicKeyCredentialEntity {
    displayName: string;
    id: BufferSource;
}
export {};
//# sourceMappingURL=types.d.ts.map