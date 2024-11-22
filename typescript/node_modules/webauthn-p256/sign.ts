import { numberToBytesBE } from '@noble/curves/abstract/utils'
import { p256 } from '@noble/curves/p256'
import type { Credential, Hex, Signature, WebAuthnData } from './types.js'
import {
  base64UrlToBytes,
  bytesToBase64Url,
  bytesToHex,
  hexToBytes,
} from './utils.js'

export type SignParameters = GetCredentialSignRequestOptionsParameters & {
  /**
   * Credential request function. Useful for environments that do not support
   * the WebAuthn API natively (i.e. React Native or testing environments).
   *
   * @default window.navigator.credentials.get
   */
  getFn?:
    | ((
        options?: CredentialRequestOptions | undefined,
      ) => Promise<Credential | null>)
    | undefined
}

export type SignReturnType = {
  signature: Hex
  webauthn: WebAuthnData
  raw: PublicKeyCredential
}

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
export async function sign(
  parameters: SignParameters,
): Promise<SignReturnType> {
  const {
    getFn = window.navigator.credentials.get.bind(window.navigator.credentials),
    ...rest
  } = parameters
  const options = getCredentialSignRequestOptions(rest)
  try {
    const credential = (await getFn(options)) as PublicKeyCredential
    if (!credential) throw new Error('credential request failed.')
    const response = credential.response as AuthenticatorAssertionResponse

    const clientDataJSON = String.fromCharCode(
      ...new Uint8Array(response.clientDataJSON),
    )
    const challengeIndex = clientDataJSON.indexOf('"challenge"')
    const typeIndex = clientDataJSON.indexOf('"type"')

    const signature = parseAsn1Signature(
      base64UrlToBytes(bytesToBase64Url(new Uint8Array(response.signature))),
    )

    return {
      signature: serializeSignature(signature),
      webauthn: {
        authenticatorData: bytesToHex(
          new Uint8Array(response.authenticatorData),
        ),
        clientDataJSON,
        challengeIndex,
        typeIndex,
        userVerificationRequired:
          options.publicKey!.userVerification === 'required',
      },
      raw: credential,
    }
  } catch (error) {
    throw new Error('credential request failed.', { cause: error })
  }
}

export type GetCredentialSignRequestOptionsParameters = {
  credentialId?: string | undefined
  hash: Hex
  /**
   * The relying party identifier to use.
   */
  rpId?: PublicKeyCredentialRequestOptions['rpId'] | undefined
  userVerification?:
    | PublicKeyCredentialRequestOptions['userVerification']
    | undefined
}
export type GetCredentialSignRequestOptionsReturnType = CredentialRequestOptions

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
export function getCredentialSignRequestOptions(
  parameters: GetCredentialSignRequestOptionsParameters,
): GetCredentialSignRequestOptionsReturnType {
  const {
    credentialId,
    hash,
    rpId = window.location.hostname,
    userVerification = 'required',
  } = parameters
  const challenge = base64UrlToBytes(bytesToBase64Url(hexToBytes(hash)))
  return {
    publicKey: {
      ...(credentialId
        ? {
            allowCredentials: [
              {
                id: base64UrlToBytes(credentialId),
                type: 'public-key',
              },
            ],
          }
        : {}),
      challenge,
      rpId,
      userVerification,
    },
  }
}

/**
 * @internal
 * Parses an ASN.1 signature into a r and s value.
 */
export function parseAsn1Signature(bytes: Uint8Array) {
  const r_start = bytes[4] === 0 ? 5 : 4
  const r_end = r_start + 32
  const s_start = bytes[r_end + 2] === 0 ? r_end + 3 : r_end + 2

  const r = BigInt(bytesToHex(bytes.slice(r_start, r_end)))
  const s = BigInt(bytesToHex(bytes.slice(s_start)))
  const n = p256.CURVE.n

  return {
    r,
    s: s > n / 2n ? n - s : s,
  }
}

/**
 * Parses a serialized signature into r and s values.
 */
export function parseSignature(signature: Hex | Uint8Array): Signature {
  const bytes =
    typeof signature === 'string' ? hexToBytes(signature) : signature
  const r = bytes.slice(0, 32)
  const s = bytes.slice(32, 64)
  return {
    r: BigInt(bytesToHex(r)),
    s: BigInt(bytesToHex(s)),
  }
}

export type SerializeSignatureOptions<to extends 'hex' | 'bytes' = 'hex'> = {
  to?: to | 'bytes' | 'hex' | undefined
}

/**
 * Serializes a signature into a hex string or bytes.
 */
export function serializeSignature<to extends 'hex' | 'bytes' = 'hex'>(
  signature: Signature,
  options: SerializeSignatureOptions<to> = {},
): to extends 'hex' ? Hex : Uint8Array {
  const { to = 'hex' } = options
  const result = new Uint8Array([
    ...numberToBytesBE(signature.r, 32),
    ...numberToBytesBE(signature.s, 32),
  ])
  return (to === 'hex' ? bytesToHex(result) : result) as any
}
