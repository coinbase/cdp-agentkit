import { expect, test } from 'vitest'
import * as exports from './index.js'

test('exports', () => {
  expect(Object.keys(exports)).toMatchInlineSnapshot(`
    [
      "createCredential",
      "getCredentialCreationOptions",
      "parseCredentialPublicKey",
      "parsePublicKey",
      "serializePublicKey",
      "getCredentialSignRequestOptions",
      "sign",
      "parseSignature",
      "serializeSignature",
      "base64ToBase64Url",
      "base64ToUtf8",
      "base64UrlToBase64",
      "base64UrlToBytes",
      "bytesToBase64Url",
      "bytesToCryptoKey",
      "bytesToHex",
      "cryptoKeyToBytes",
      "hexToBytes",
      "utf8ToBase64",
      "verify",
    ]
  `)
})
