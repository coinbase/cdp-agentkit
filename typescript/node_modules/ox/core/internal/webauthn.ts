import { p256 } from '@noble/curves/p256'
import type * as Bytes from '../Bytes.js'
import * as Hex from '../Hex.js'
import * as PublicKey from '../PublicKey.js'

/** @internal */
export type AttestationConveyancePreference =
  | 'direct'
  | 'enterprise'
  | 'indirect'
  | 'none'

/** @internal */
export type AuthenticatorAttachment = 'cross-platform' | 'platform'

/** @internal */
export type AuthenticatorTransport =
  | 'ble'
  | 'hybrid'
  | 'internal'
  | 'nfc'
  | 'usb'

/** @internal */
export type COSEAlgorithmIdentifier = number

/** @internal */
export type CredentialMediationRequirement =
  | 'conditional'
  | 'optional'
  | 'required'
  | 'silent'

/** @internal */
export type PublicKeyCredentialType = 'public-key'

/** @internal */
export type ResidentKeyRequirement = 'discouraged' | 'preferred' | 'required'

/** @internal */
export type UserVerificationRequirement =
  | 'discouraged'
  | 'preferred'
  | 'required'

/** @internal */
export type LargeBlobSupport = {
  support: 'required' | 'preferred'
}

/** @internal */
export type BufferSource = ArrayBufferView | ArrayBuffer

/** @internal */
export type PrfExtension = Record<'eval', Record<'first', Uint8Array>>

/** @internal */
export interface AuthenticationExtensionsClientInputs {
  appid?: string
  credProps?: boolean
  hmacCreateSecret?: boolean
  minPinLength?: boolean
  prf?: PrfExtension
  largeBlob?: LargeBlobSupport
}

/** @internal */
export interface AuthenticatorSelectionCriteria {
  authenticatorAttachment?: AuthenticatorAttachment
  requireResidentKey?: boolean
  residentKey?: ResidentKeyRequirement
  userVerification?: UserVerificationRequirement
}

/** @internal */
export interface Credential {
  readonly id: string
  readonly type: string
}

/** @internal */
export interface CredentialCreationOptions {
  publicKey?: PublicKeyCredentialCreationOptions
  signal?: AbortSignal
}

/** @internal */
export interface CredentialRequestOptions {
  mediation?: CredentialMediationRequirement
  publicKey?: PublicKeyCredentialRequestOptions
  signal?: AbortSignal
}

/** @internal */
export interface PublicKeyCredential extends Credential {
  readonly authenticatorAttachment: string | null
  readonly rawId: ArrayBuffer
  readonly response: AuthenticatorResponse
  getClientExtensionResults(): AuthenticationExtensionsClientOutputs
}

/** @internal */
export interface PublicKeyCredentialCreationOptions {
  attestation?: AttestationConveyancePreference
  authenticatorSelection?: AuthenticatorSelectionCriteria
  challenge: BufferSource
  excludeCredentials?: PublicKeyCredentialDescriptor[]
  extensions?: AuthenticationExtensionsClientInputs
  pubKeyCredParams: PublicKeyCredentialParameters[]
  rp: PublicKeyCredentialRpEntity
  timeout?: number
  user: PublicKeyCredentialUserEntity
}

/** @internal */
export interface PublicKeyCredentialDescriptor {
  id: BufferSource
  transports?: AuthenticatorTransport[]
  type: PublicKeyCredentialType
}

/** @internal */
export interface PublicKeyCredentialEntity {
  name: string
}

/** @internal */
export interface PublicKeyCredentialParameters {
  alg: COSEAlgorithmIdentifier
  type: PublicKeyCredentialType
}

/** @internal */
export interface PublicKeyCredentialRequestOptions {
  allowCredentials?: PublicKeyCredentialDescriptor[]
  challenge: BufferSource
  extensions?: AuthenticationExtensionsClientInputs
  rpId?: string
  timeout?: number
  userVerification?: UserVerificationRequirement
}

/** @internal */
export interface PublicKeyCredentialRpEntity extends PublicKeyCredentialEntity {
  id?: string
}

/** @internal */
export interface PublicKeyCredentialUserEntity
  extends PublicKeyCredentialEntity {
  displayName: string
  id: BufferSource
}

/**
 * Parses an ASN.1 signature into a r and s value.
 *
 * @internal
 */
export function parseAsn1Signature(bytes: Uint8Array) {
  const r_start = bytes[4] === 0 ? 5 : 4
  const r_end = r_start + 32
  const s_start = bytes[r_end + 2] === 0 ? r_end + 3 : r_end + 2

  const r = BigInt(Hex.fromBytes(bytes.slice(r_start, r_end)))
  const s = BigInt(Hex.fromBytes(bytes.slice(s_start)))

  return {
    r,
    s: s > p256.CURVE.n / 2n ? p256.CURVE.n - s : s,
  }
}

/**
 * Parses a public key into x and y coordinates from the public key
 * defined on the credential.
 *
 * @internal
 */
export async function parseCredentialPublicKey(
  cPublicKey: Bytes.Bytes,
): Promise<PublicKey.PublicKey> {
  const cryptoKey = await crypto.subtle.importKey(
    'spki',
    new Uint8Array(cPublicKey),
    {
      name: 'ECDSA',
      namedCurve: 'P-256',
      hash: 'SHA-256',
    },
    true,
    ['verify'],
  )
  const publicKey = new Uint8Array(
    await crypto.subtle.exportKey('raw', cryptoKey),
  )
  return PublicKey.from(publicKey)
}
