export {
  type CreateCredentialParameters,
  type CreateCredentialReturnType,
  createCredential,
  type GetCredentialCreationOptionsParameters,
  type GetCredentialCreationOptionsReturnType,
  getCredentialCreationOptions,
} from './credential.js'

export {
  parseCredentialPublicKey,
  parsePublicKey,
  type SerializePublicKeyOptions,
  serializePublicKey,
} from './publicKey.js'

export {
  type GetCredentialSignRequestOptionsParameters,
  type GetCredentialSignRequestOptionsReturnType,
  getCredentialSignRequestOptions,
  type SignParameters,
  type SignReturnType,
  sign,
  parseSignature,
  serializeSignature,
} from './sign.js'

export type {
  Credential,
  CredentialCreationOptions,
  CredentialRequestOptions,
  Hex,
  P256Credential,
  PublicKey,
  PublicKeyCredentialCreationOptions,
  PublicKeyCredential,
  Signature,
  WebAuthnData,
} from './types.js'

export {
  base64ToBase64Url,
  base64ToUtf8,
  base64UrlToBase64,
  base64UrlToBytes,
  bytesToBase64Url,
  bytesToCryptoKey,
  bytesToHex,
  cryptoKeyToBytes,
  hexToBytes,
  utf8ToBase64,
} from './utils.js'

export { type VerifyParameters, verify } from './verify.js'
