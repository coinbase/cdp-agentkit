import * as Base64 from './Base64.js'
import * as Bytes from './Bytes.js'
import * as Errors from './Errors.js'
import * as Hash from './Hash.js'
import * as Hex from './Hex.js'
import * as P256 from './P256.js'
import type * as PublicKey from './PublicKey.js'
import type * as Signature from './Signature.js'
import type { Compute, OneOf } from './internal/types.js'
import * as internal from './internal/webauthn.js'

/** A WebAuthn-flavored P256 credential. */
export type P256Credential = {
  id: string
  publicKey: PublicKey.PublicKey
  raw: internal.PublicKeyCredential
}

/** Metadata for a WebAuthn P256 signature. */
export type SignMetadata = Compute<{
  authenticatorData: Hex.Hex
  challengeIndex: number
  clientDataJSON: string
  typeIndex: number
  userVerificationRequired: boolean
}>

export const createChallenge = Uint8Array.from([
  105, 171, 180, 181, 160, 222, 75, 198, 42, 42, 32, 31, 141, 37, 186, 233,
])

/**
 * Creates a new WebAuthn P256 Credential, which can be stored and later used for signing.
 *
 * @example
 * ```ts twoslash
 * import { WebAuthnP256 } from 'ox'
 *
 * const credential = await WebAuthnP256.createCredential({ name: 'Example' }) // [!code focus]
 * // @log: {
 * // @log:   id: 'oZ48...',
 * // @log:   publicKey: { x: 51421...5123n, y: 12345...6789n },
 * // @log:   raw: PublicKeyCredential {},
 * // @log: }
 *
 * const { metadata, signature } = await WebAuthnP256.sign({
 *   credentialId: credential.id,
 *   challenge: '0xdeadbeef',
 * })
 * ```
 *
 * @param options - Credential creation options.
 * @returns A WebAuthn P256 credential.
 */
export async function createCredential(
  options: createCredential.Options,
): Promise<P256Credential> {
  const {
    createFn = window.navigator.credentials.create.bind(
      window.navigator.credentials,
    ),
    ...rest
  } = options
  const creationOptions = getCredentialCreationOptions(rest)
  try {
    const credential = (await createFn(
      creationOptions,
    )) as internal.PublicKeyCredential
    if (!credential) throw new CredentialCreationFailedError()
    const publicKey = await internal.parseCredentialPublicKey(
      new Uint8Array((credential.response as any).getPublicKey()),
    )
    return {
      id: credential.id,
      publicKey,
      raw: credential,
    }
  } catch (error) {
    throw new CredentialCreationFailedError({
      cause: error as Error,
    })
  }
}

export declare namespace createCredential {
  type Options = getCredentialCreationOptions.Options & {
    /**
     * Credential creation function. Useful for environments that do not support
     * the WebAuthn API natively (i.e. React Native or testing environments).
     *
     * @default window.navigator.credentials.create
     */
    createFn?:
      | ((
          options?: internal.CredentialCreationOptions | undefined,
        ) => Promise<internal.Credential | null>)
      | undefined
  }

  type ErrorType =
    | getCredentialCreationOptions.ErrorType
    | Errors.GlobalErrorType
}

createCredential.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as createCredential.ErrorType

/**
 * Gets the authenticator data which contains information about the
 * processing of an authenticator request (ie. from `WebAuthnP256.sign`).
 *
 * :::warning
 *
 * This function is mainly for testing purposes or for manually constructing
 * autenticator data. In most cases you will not need this function.
 * `authenticatorData` is typically returned as part of the
 * {@link ox#WebAuthnP256.(sign:function)} response (ie. an authenticator response).
 *
 * :::
 *
 * @example
 * ```ts twoslash
 * import { WebAuthnP256 } from 'ox'
 *
 * const authenticatorData = WebAuthnP256.getAuthenticatorData({
 *   rpId: 'example.com',
 *   signCount: 420,
 * })
 * // @log: "0xa379a6f6eeafb9a55e378c118034e2751e682fab9f2d30ab13d2125586ce194705000001a4"
 * ```
 *
 * @param options - Options to construct the authenticator data.
 * @returns The authenticator data.
 */
export function getAuthenticatorData(
  options: getAuthenticatorData.Options = {},
): Hex.Hex {
  const { flag = 5, rpId = window.location.hostname, signCount = 0 } = options
  const rpIdHash = Hash.sha256(Hex.fromString(rpId))
  const flag_bytes = Hex.fromNumber(flag, { size: 1 })
  const signCount_bytes = Hex.fromNumber(signCount, { size: 4 })
  return Hex.concat(rpIdHash, flag_bytes, signCount_bytes)
}

export declare namespace getAuthenticatorData {
  type Options = {
    /** A bitfield that indicates various attributes that were asserted by the authenticator. [Read more](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API/Authenticator_data#flags) */
    flag?: number | undefined
    /** The [Relying Party ID](https://w3c.github.io/webauthn/#relying-party-identifier) that the credential is scoped to. */
    rpId?: internal.PublicKeyCredentialRequestOptions['rpId'] | undefined
    /** A signature counter, if supported by the authenticator (set to 0 otherwise). */
    signCount?: number | undefined
  }

  type ErrorType = Errors.GlobalErrorType
}

getAuthenticatorData.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as getAuthenticatorData.ErrorType

/**
 * Constructs the Client Data in stringified JSON format which represents client data that
 * was passed to `credentials.get()` in {@link ox#WebAuthnP256.(sign:function)}.
 *
 * :::warning
 *
 * This function is mainly for testing purposes or for manually constructing
 * client data. In most cases you will not need this function.
 * `clientDataJSON` is typically returned as part of the
 * {@link ox#WebAuthnP256.(sign:function)} response (ie. an authenticator response).
 *
 * :::
 *
 * @example
 * ```ts twoslash
 * import { WebAuthnP256 } from 'ox'
 *
 * const clientDataJSON = WebAuthnP256.getClientDataJSON({
 *   challenge: '0xdeadbeef',
 *   origin: 'https://example.com',
 * })
 * // @log: "{"type":"webauthn.get","challenge":"3q2-7w","origin":"https://example.com","crossOrigin":false}"
 * ```
 *
 * @param options - Options to construct the client data.
 * @returns The client data.
 */
export function getClientDataJSON(options: getClientDataJSON.Options): string {
  const {
    challenge,
    crossOrigin = false,
    extraClientData,
    origin = window.location.origin,
  } = options

  return JSON.stringify({
    type: 'webauthn.get',
    challenge: Base64.fromHex(challenge, { url: true, pad: false }),
    origin,
    crossOrigin,
    ...extraClientData,
  })
}

export declare namespace getClientDataJSON {
  type Options = {
    /** The challenge to sign. */
    challenge: Hex.Hex
    /** If set to `true`, it means that the calling context is an `<iframe>` that is not same origin with its ancestor frames. */
    crossOrigin?: boolean | undefined
    /** Additional client data to include in the client data JSON. */
    extraClientData?: Record<string, unknown> | undefined
    /** The fully qualified origin of the relying party which has been given by the client/browser to the authenticator. */
    origin?: string | undefined
  }

  type ErrorType = Errors.GlobalErrorType
}

getClientDataJSON.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as getClientDataJSON.ErrorType

/**
 * Returns the creation options for a P256 WebAuthn Credential to be used with
 * the Web Authentication API.
 *
 * @example
 * ```ts twoslash
 * import { WebAuthnP256 } from 'ox'
 *
 * const options = WebAuthnP256.getCredentialCreationOptions({ name: 'Example' })
 *
 * const credential = await window.navigator.credentials.create(options)
 * ```
 *
 * @param options - Options.
 * @returns The credential creation options.
 */
export function getCredentialCreationOptions(
  options: getCredentialCreationOptions.Options,
): internal.CredentialCreationOptions {
  const {
    attestation = 'none',
    authenticatorSelection = {
      residentKey: 'preferred',
      requireResidentKey: false,
      userVerification: 'required',
    },
    challenge = createChallenge,
    excludeCredentialIds,
    name: name_,
    rp = {
      id: window.location.hostname,
      name: window.document.title,
    },
    user,
    extensions,
  } = options
  const name = (user?.name ?? name_)!
  return {
    publicKey: {
      attestation,
      authenticatorSelection,
      challenge,
      ...(excludeCredentialIds
        ? {
            excludeCredentials: excludeCredentialIds?.map((id) => ({
              id: Base64.toBytes(id),
              type: 'public-key',
            })),
          }
        : {}),
      pubKeyCredParams: [
        {
          type: 'public-key',
          alg: -7, // p256
        },
      ],
      rp,
      user: {
        id: user?.id ?? Hash.keccak256(Bytes.fromString(name), { as: 'Bytes' }),
        name,
        displayName: user?.displayName ?? name,
      },
      extensions,
    },
  } as internal.CredentialCreationOptions
}

export declare namespace getCredentialCreationOptions {
  type Options = {
    /**
     * A string specifying the relying party's preference for how the attestation statement
     * (i.e., provision of verifiable evidence of the authenticity of the authenticator and its data)
     * is conveyed during credential creation.
     */
    attestation?:
      | internal.PublicKeyCredentialCreationOptions['attestation']
      | undefined
    /**
     * An object whose properties are criteria used to filter out the potential authenticators
     * for the credential creation operation.
     */
    authenticatorSelection?:
      | internal.PublicKeyCredentialCreationOptions['authenticatorSelection']
      | undefined
    /**
     * An `ArrayBuffer`, `TypedArray`, or `DataView` used as a cryptographic challenge.
     */
    challenge?:
      | internal.PublicKeyCredentialCreationOptions['challenge']
      | undefined
    /**
     * List of credential IDs to exclude from the creation. This property can be used
     * to prevent creation of a credential if it already exists.
     */
    excludeCredentialIds?: readonly string[] | undefined
    /**
     * List of Web Authentication API credentials to use during creation or authentication.
     */
    extensions?:
      | internal.PublicKeyCredentialCreationOptions['extensions']
      | undefined
    /**
     * An object describing the relying party that requested the credential creation
     */
    rp?:
      | {
          id: string
          name: string
        }
      | undefined
    /**
     * A numerical hint, in milliseconds, which indicates the time the calling web app is willing to wait for the creation operation to complete.
     */
    timeout?: internal.PublicKeyCredentialCreationOptions['timeout'] | undefined
  } & OneOf<
    | {
        /** Name for the credential (user.name). */
        name: string
      }
    | {
        /**
         * An object describing the user account for which the credential is generated.
         */
        user: {
          displayName?: string
          id?: BufferSource
          name: string
        }
      }
  >

  type ErrorType =
    | Base64.toBytes.ErrorType
    | Hash.keccak256.ErrorType
    | Bytes.fromString.ErrorType
    | Errors.GlobalErrorType
}

getCredentialCreationOptions.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as getCredentialCreationOptions.ErrorType

/**
 * Returns the request options to sign a challenge with the Web Authentication API.
 *
 * @example
 * ```ts twoslash
 * import { WebAuthnP256 } from 'ox'
 *
 * const options = WebAuthnP256.getCredentialRequestOptions({
 *   challenge: '0xdeadbeef',
 * })
 *
 * const credential = await window.navigator.credentials.get(options)
 * ```
 *
 * @param options - Options.
 * @returns The credential request options.
 */
export function getCredentialRequestOptions(
  options: getCredentialRequestOptions.Options,
): internal.CredentialRequestOptions {
  const {
    credentialId,
    challenge,
    rpId = window.location.hostname,
    userVerification = 'required',
  } = options
  return {
    publicKey: {
      ...(credentialId
        ? {
            allowCredentials: [
              {
                id: Base64.toBytes(credentialId),
                type: 'public-key',
              },
            ],
          }
        : {}),
      challenge: Bytes.fromHex(challenge),
      rpId,
      userVerification,
    },
  }
}

export declare namespace getCredentialRequestOptions {
  type Options = {
    /** The credential ID to use. */
    credentialId?: string | undefined
    /** The challenge to sign. */
    challenge: Hex.Hex
    /** The relying party identifier to use. */
    rpId?: internal.PublicKeyCredentialRequestOptions['rpId'] | undefined
    /** The user verification requirement. */
    userVerification?:
      | internal.PublicKeyCredentialRequestOptions['userVerification']
      | undefined
  }

  type ErrorType =
    | Bytes.fromHex.ErrorType
    | Base64.toBytes.ErrorType
    | Errors.GlobalErrorType
}

getCredentialRequestOptions.parseError = (error: unknown) =>
  error as getCredentialRequestOptions.ErrorType

/**
 * Constructs the final digest that was signed and computed by the authenticator. This payload includes
 * the cryptographic `challenge`, as well as authenticator metadata (`authenticatorData` + `clientDataJSON`).
 * This value can be also used with raw P256 verification (such as {@link ox#P256.(verify:function)} or
 * {@link ox#WebCryptoP256.(verify:function)}).
 *
 * :::warning
 *
 * This function is mainly for testing purposes or for manually constructing
 * signing payloads. In most cases you will not need this function and
 * instead use {@link ox#WebAuthnP256.(sign:function)}.
 *
 * :::
 *
 * @example
 * ```ts twoslash
 * import { WebAuthnP256, WebCryptoP256 } from 'ox'
 *
 * const { metadata, payload } = WebAuthnP256.getSignPayload({ // [!code focus]
 *   challenge: '0xdeadbeef', // [!code focus]
 * }) // [!code focus]
 * // @log: {
 * // @log:   metadata: {
 * // @log:     authenticatorData: "0x49960de5880e8c687434170f6476605b8fe4aeb9a28632c7995cf3ba831d97630500000000",
 * // @log:     challengeIndex: 23,
 * // @log:     clientDataJSON: "{"type":"webauthn.get","challenge":"9jEFijuhEWrM4SOW-tChJbUEHEP44VcjcJ-Bqo1fTM8","origin":"http://localhost:5173","crossOrigin":false}",
 * // @log:     typeIndex: 1,
 * // @log:     userVerificationRequired: true,
 * // @log:   },
 * // @log:   payload: "0x49960de5880e8c687434170f6476605b8fe4aeb9a28632c7995cf3ba831d9763050000000045086dcb06a5f234db625bcdc94e657f86b76b6fd3eb9c30543eabc1e577a4b0",
 * // @log: }
 *
 * const { publicKey, privateKey } = await WebCryptoP256.createKeyPair()
 *
 * const signature = await WebCryptoP256.sign({
 *   payload,
 *   privateKey,
 * })
 * ```
 *
 * @param options - Options to construct the signing payload.
 * @returns The signing payload.
 */
export function getSignPayload(
  options: getSignPayload.Options,
): getSignPayload.ReturnType {
  const {
    challenge,
    crossOrigin,
    extraClientData,
    flag,
    origin,
    rpId,
    signCount,
    userVerification = 'required',
  } = options

  const authenticatorData = getAuthenticatorData({
    flag,
    rpId,
    signCount,
  })
  const clientDataJSON = getClientDataJSON({
    challenge,
    crossOrigin,
    extraClientData,
    origin,
  })
  const clientDataJSONHash = Hash.sha256(Hex.fromString(clientDataJSON))

  const challengeIndex = clientDataJSON.indexOf('"challenge"')
  const typeIndex = clientDataJSON.indexOf('"type"')

  const metadata = {
    authenticatorData,
    clientDataJSON,
    challengeIndex,
    typeIndex,
    userVerificationRequired: userVerification === 'required',
  }

  const payload = Hex.concat(authenticatorData, clientDataJSONHash)

  return { metadata, payload }
}

export declare namespace getSignPayload {
  type Options = {
    /** The challenge to sign. */
    challenge: Hex.Hex
    /** If set to `true`, it means that the calling context is an `<iframe>` that is not same origin with its ancestor frames. */
    crossOrigin?: boolean | undefined
    /** Additional client data to include in the client data JSON. */
    extraClientData?: Record<string, unknown> | undefined
    /** If set to `true`, the payload will be hashed before being returned. */
    hash?: boolean | undefined
    /** A bitfield that indicates various attributes that were asserted by the authenticator. [Read more](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API/Authenticator_data#flags) */
    flag?: number | undefined
    /** The fully qualified origin of the relying party which has been given by the client/browser to the authenticator. */
    origin?: string | undefined
    /** The [Relying Party ID](https://w3c.github.io/webauthn/#relying-party-identifier) that the credential is scoped to. */
    rpId?: internal.PublicKeyCredentialRequestOptions['rpId'] | undefined
    /** A signature counter, if supported by the authenticator (set to 0 otherwise). */
    signCount?: number | undefined
    /** The user verification requirement that the authenticator will enforce. */
    userVerification?:
      | internal.PublicKeyCredentialRequestOptions['userVerification']
      | undefined
  }

  type ReturnType = {
    metadata: SignMetadata
    payload: Hex.Hex
  }

  type ErrorType =
    | Hash.sha256.ErrorType
    | Hex.concat.ErrorType
    | Hex.fromString.ErrorType
    | getAuthenticatorData.ErrorType
    | getClientDataJSON.ErrorType
    | Errors.GlobalErrorType
}

getSignPayload.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as getSignPayload.ErrorType

/**
 * Signs a challenge using a stored WebAuthn P256 Credential. If no Credential is provided,
 * a prompt will be displayed for the user to select an existing Credential
 * that was previously registered.
 *
 * @example
 * ```ts twoslash
 * import { WebAuthnP256 } from 'ox'
 *
 * const credential = await WebAuthnP256.createCredential({
 *   name: 'Example',
 * })
 *
 * const { metadata, signature } = await WebAuthnP256.sign({ // [!code focus]
 *   credentialId: credential.id, // [!code focus]
 *   challenge: '0xdeadbeef', // [!code focus]
 * }) // [!code focus]
 * // @log: {
 * // @log:   metadata: {
 * // @log:     authenticatorData: '0x49960de5880e8c687434170f6476605b8fe4aeb9a28632c7995cf3ba831d97630500000000',
 * // @log:     clientDataJSON: '{"type":"webauthn.get","challenge":"9jEFijuhEWrM4SOW-tChJbUEHEP44VcjcJ-Bqo1fTM8","origin":"http://localhost:5173","crossOrigin":false}',
 * // @log:     challengeIndex: 23,
 * // @log:     typeIndex: 1,
 * // @log:     userVerificationRequired: true,
 * // @log:   },
 * // @log:   signature: { r: 51231...4215n, s: 12345...6789n },
 * // @log: }
 * ```
 *
 * @param options - Options.
 * @returns The signature.
 */
export async function sign(options: sign.Options): Promise<sign.ReturnType> {
  const {
    getFn = window.navigator.credentials.get.bind(window.navigator.credentials),
    ...rest
  } = options
  const requestOptions = getCredentialRequestOptions(rest)
  try {
    const credential = (await getFn(
      requestOptions,
    )) as internal.PublicKeyCredential
    if (!credential) throw new CredentialRequestFailedError()
    const response = credential.response as AuthenticatorAssertionResponse

    const clientDataJSON = String.fromCharCode(
      ...new Uint8Array(response.clientDataJSON),
    )
    const challengeIndex = clientDataJSON.indexOf('"challenge"')
    const typeIndex = clientDataJSON.indexOf('"type"')

    const signature = internal.parseAsn1Signature(
      new Uint8Array(response.signature),
    )

    return {
      metadata: {
        authenticatorData: Hex.fromBytes(
          new Uint8Array(response.authenticatorData),
        ),
        clientDataJSON,
        challengeIndex,
        typeIndex,
        userVerificationRequired:
          requestOptions.publicKey!.userVerification === 'required',
      },
      signature,
      raw: credential,
    }
  } catch (error) {
    throw new CredentialRequestFailedError({
      cause: error as Error,
    })
  }
}

export declare namespace sign {
  type Options = getCredentialRequestOptions.Options & {
    /**
     * Credential request function. Useful for environments that do not support
     * the WebAuthn API natively (i.e. React Native or testing environments).
     *
     * @default window.navigator.credentials.get
     */
    getFn?:
      | ((
          options?: internal.CredentialRequestOptions | undefined,
        ) => Promise<internal.Credential | null>)
      | undefined
  }

  type ReturnType = {
    metadata: SignMetadata
    raw: internal.PublicKeyCredential
    signature: Signature.Signature<false>
  }

  type ErrorType =
    | Hex.fromBytes.ErrorType
    | getCredentialRequestOptions.ErrorType
    | Errors.GlobalErrorType
}

sign.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as sign.ErrorType

/**
 * Verifies a signature using the Credential's public key and the challenge which was signed.
 *
 * @example
 * ```ts twoslash
 * import { WebAuthnP256 } from 'ox'
 *
 * const credential = await WebAuthnP256.createCredential({
 *   name: 'Example',
 * })
 *
 * const { metadata, signature } = await WebAuthnP256.sign({
 *   credentialId: credential.id,
 *   challenge: '0xdeadbeef',
 * })
 *
 * const result = await WebAuthnP256.verify({ // [!code focus]
 *   metadata, // [!code focus]
 *   challenge: '0xdeadbeef', // [!code focus]
 *   publicKey: credential.publicKey, // [!code focus]
 *   signature, // [!code focus]
 * }) // [!code focus]
 * // @log: true
 * ```
 *
 * @param options - Options.
 * @returns Whether the signature is valid.
 */
export function verify(options: verify.Options): boolean {
  const { challenge, hash = true, metadata, publicKey, signature } = options
  const {
    authenticatorData,
    challengeIndex,
    clientDataJSON,
    typeIndex,
    userVerificationRequired,
  } = metadata

  const authenticatorDataBytes = Bytes.fromHex(authenticatorData)

  // Check length of `authenticatorData`.
  if (authenticatorDataBytes.length < 37) return false

  const flag = authenticatorDataBytes[32]!

  // Verify that the UP bit of the flags in authData is set.
  if ((flag & 0x01) !== 0x01) return false

  // If user verification was determined to be required, verify that
  // the UV bit of the flags in authData is set. Otherwise, ignore the
  // value of the UV flag.
  if (userVerificationRequired && (flag & 0x04) !== 0x04) return false

  // If the BE bit of the flags in authData is not set, verify that
  // the BS bit is not set.
  if ((flag & 0x08) !== 0x08 && (flag & 0x10) === 0x10) return false

  // Check that response is for an authentication assertion
  const type = '"type":"webauthn.get"'
  if (type !== clientDataJSON.slice(Number(typeIndex), type.length + 1))
    return false

  // Check that hash is in the clientDataJSON.
  const match = clientDataJSON
    .slice(Number(challengeIndex))
    .match(/^"challenge":"(.*?)"/)
  if (!match) return false

  // Validate the challenge in the clientDataJSON.
  const [_, challenge_extracted] = match
  if (Hex.fromBytes(Base64.toBytes(challenge_extracted!)) !== challenge)
    return false

  const clientDataJSONHash = Hash.sha256(Bytes.fromString(clientDataJSON), {
    as: 'Bytes',
  })
  const payload = Bytes.concat(authenticatorDataBytes, clientDataJSONHash)

  return P256.verify({
    hash,
    payload,
    publicKey,
    signature,
  })
}

export declare namespace verify {
  type Options = {
    /** The challenge to verify. */
    challenge: Hex.Hex
    /** If set to `true`, the payload will be hashed (sha256) before being verified. */
    hash?: boolean | undefined
    /** The public key to verify the signature with. */
    publicKey: PublicKey.PublicKey
    /** The signature to verify. */
    signature: Signature.Signature<false>
    /** The metadata to verify the signature with. */
    metadata: SignMetadata
  }

  type ErrorType =
    | Base64.toBytes.ErrorType
    | Bytes.concat.ErrorType
    | Bytes.fromHex.ErrorType
    | P256.verify.ErrorType
    | Errors.GlobalErrorType
}

verify.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as verify.ErrorType

/** Thrown when a WebAuthn P256 credential creation fails. */
export class CredentialCreationFailedError extends Errors.BaseError<Error> {
  override readonly name = 'WebAuthnP256.CredentialCreationFailedError'

  constructor({ cause }: { cause?: Error | undefined } = {}) {
    super('Failed to create credential.', {
      cause,
    })
  }
}

/** Thrown when a WebAuthn P256 credential request fails. */
export class CredentialRequestFailedError extends Errors.BaseError<Error> {
  override readonly name = 'WebAuthnP256.CredentialRequestFailedError'

  constructor({ cause }: { cause?: Error | undefined } = {}) {
    super('Failed to request credential.', {
      cause,
    })
  }
}
