<br/>

<p align="center">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/wevm/webauthn-p256/blob/main/.github/webauthn-p256-dark.svg">
      <img alt="webauthn-p256 logo" src="https://github.com/wevm/webauthn-p256/blob/main/.github/webauthn-p256-light.svg" width="auto" height="100">
    </picture>
</p>

<p align="center">
  P256 signature utilities for WebAuthn.
<p>

<p align="center">
  <a href="https://www.npmjs.com/package/webauthn-p256">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/npm/v/webauthn-p256?colorA=21262d&colorB=21262d&style=flat">
      <img src="https://img.shields.io/npm/v/webauthn-p256?colorA=f6f8fa&colorB=f6f8fa&style=flat" alt="Version">
    </picture>
  </a>
  <a href="https://github.com/wevm/webauthn-p256/blob/main/LICENSE">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/npm/l/webauthn-p256?colorA=21262d&colorB=21262d&style=flat">
      <img src="https://img.shields.io/npm/l/webauthn-p256?colorA=f6f8fa&colorB=f6f8fa&style=flat" alt="MIT License">
    </picture>
  </a>
  <a href="https://www.npmjs.com/package/webauthn-p256">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/npm/dm/webauthn-p256?colorA=21262d&colorB=21262d&style=flat">
      <img src="https://img.shields.io/npm/dm/webauthn-p256?colorA=f6f8fa&colorB=f6f8fa&style=flat" alt="Downloads per month">
    </picture>
  </a>
</p>

## Table of Contents

  - [Install](#install)
  - [Usage](#usage)
  - [Core Reference](#core-reference)
    - [`createCredential`](#createcredential)
    - [`sign`](#sign)
    - [`verify`](#verify)
  - [Utilities Reference](#utilities-reference)
    - [`getCredentialCreationOptions`](#getcredentialcreationoptions)
    - [`getCredentialSignRequestOptions`](#getcredentialsignrequestoptions)
    - [`parsePublicKey`](#parsepublickey)
    - [`parseSignature`](#parsesignature)
    - [`serializePublicKey`](#serializepublickey)
    - [`serializeSignature`](#serializepublickey)
  - [Authors](#authors)
  - [License](#license)

## Install

```bash
npm i webauthn-p256
```

```bash
pnpm i webauthn-p256
```

```bash
bun i webauthn-p256
```

## Usage

```ts
import { createCredential, sign, verify } from 'webauthn-p256'

// Register a WebAuthn credential (ie. passkey).
const credential = createCredential({
  name: 'Example',
})

// Sign hash with credential.
const { signature, webauthn } = await sign({
  credentialId: credential.id,
  hash: '0x...'
})

// Verify signature with hash, public key, and WebAuthn data.
const verified = await verify({
  hash: '0x...',
  publicKey: credential.publicKey,
  signature,
  webauthn,
})
```

### Onchain Verification

We can also verify WebAuthn signatures onchain via contracts that expose a WebAuthn verifier interface.

The example below uses [Viem](https://viem.sh) to call the `verify` function on the [`WebAuthn.sol` contract](https://github.com/base-org/webauthn-sol/blob/main/src/WebAuthn.sol#L105). However, in a real world scenario, a contract implementing the WebAuthn verifier interface will call the `verify` function (e.g. a `isValidSignature` interface on an ERC-4337 Smart Wallet).

> Note: Bytecode for the `code` variable can be [obtained here](https://github.com/wevm/webauthn-p256/blob/c95b19129143a307ad5419c1911b66eccf8e24fc/playground/src/contracts.ts#L2-L3).

```ts
import { createCredential, parsePublicKey, parseSignature, sign } from 'webauthn-p256'
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

const abi = parseAbi([
  'struct WebAuthnAuth { bytes authenticatorData; string clientDataJSON; uint256 challengeIndex; uint256 typeIndex; uint256 r; uint256 s; }',
  'function verify(bytes, bool, WebAuthnAuth, uint256, uint256)'
])
const code = '0x...'

const credential = createCredential({
  name: 'Example',
})

const hash = '0x...'

const { signature, webauthn } = await sign({
  credentialId: credential.id,
  hash
})

const { x, y } = parsePublicKey(credential.publicKey)
const { r, s } = parseSignature(signature)

const verified = await client.readContract({
  abi,
  code,
  functionName: 'verify',
  args: [
    hash,
    webauthn.userVerificationRequired,
    { ...webauthn, r, s },
    x,
    y,
  ],
})
```

## Core Reference

### `createCredential`

Creates a P256 WebAuthn credential with a Passkey authenticator.

#### Usage

```ts
import { createCredential } from 'webauthn-p256'

const credential = createCredential({
  name: 'Example',
})
```

#### API

| Name                   | Description                                                                                                                                      | Type                                                                  |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------- |
| `name`                 | Name for the credential.                                                                                                                         | `string`                                                              |
| `attestation`          | Attestation type for the credential.                                                                                                              | `'none'`                                                             |
| `authenticatorSelection` | An object whose properties are criteria used to filter out the potential authenticators for the credential creation operation. | `AuthenticatorSelection`                                        |
| `challenge`            | Custom creation challenge for the credential.                                                                                                    | `BufferSource`                                                        |
| `createFn`             | Credential creation function. Useful for environments that do not support the WebAuthn API natively (i.e. React Native or testing environments). | `(options: CredentialCreationOptions) => Promise<Credential \| null>` |
| `excludeCredentialIds` | List of credential IDs to exclude from the creation. This property can be used to prevent creation of a credential if it already exists.         | `string[]`                                                            |
| `rp`                   | An object describing the relying party that requested the credential creation.                                                                   | `{ id: string; name: string }`                                        |
| `timeout`              | Timeout for the credential creation.                                                                                                             | `number`                                                              |
| `user`                 | An object describing the user account for which the credential is generated.                                                                     | `{ displayName: string; id: string; name: string }`                   |
| returns                | P256 Credential                                                                                                                                  | `P256Credential`                                                      |


### `sign`

Signs a hash using a stored credential. If no credential is provided, a prompt 
will be displayed for the user to select an existing credential that was previously registered.

#### Usage

```ts
import { sign } from 'webauthn-p256'

const credential = { /* ... */ }

const { signature, webauthn } = await sign({
  credentialId: credential.id,
  hash: '0x...',
})
```

#### API

| Name           | Description                       | Type                                                                 |
| -------------- | --------------------------------- | -------------------------------------------------------------------- |
| `credentialId` | Credential ID to use for signing. | `string`                                                             |
| `getFn`        | Credential retrieval function.    | `(options: CredentialRequestOptions) => Promise<Credential \| null>` |
| `hash`         | Hash to sign.                     | `0x${string}`                                                        |
| `rpId`         | Relying party identifier.         | `string`                                                             |
| returns        | Signature + WebAuthn response.     | `{ signature: Hex; webauthn: WebAuthnData }`                                                  |

### `verify`

Verifies a signature using the credential public key and the hash which was signed.

> [!WARNING]
> The `verify` implementation mimics [Daimo's audited `WebAuthn.sol`](https://github.com/daimo-eth/p256-verifier/blob/master/src/WebAuthn.sol) – however, this TypeScript implementation is unaudited.

#### Usage

```ts
import { verify } from 'webauthn-p256'

const credential = { /* ... */ }
const signature = '0x...'
const webauthn = { /* ... */ }
 
const valid = await verify({ 
  hash: '0x...', 
  publicKey: credential.publicKey, 
  signature,
  webauthn,
})
```

#### API

| Name        | Description                    | Type                |
| ----------- | ------------------------------ | ------------------- |
| `hash`      | Hash to verify.                | `0x${string}`       |
| `publicKey` | P256 Credential public key.    | `Hex`         |
| `signature` | P256 Signature.  | `Hex` |
| `webauthn` | WebAuthn response.  | `WebAuthnData` |
| returns     | Signature verification result. | `boolean`           |

## Utilities Reference

### `getCredentialCreationOptions`

Returns the credential creation options for a P256-flavoured WebAuthn credential.

#### Usage

```ts
import { getCredentialCreationOptions } from 'webauthn-p256'

const options = getCredentialCreationOptions({
  name: 'Example',
})
```

#### API

| Name                   | Description                                                                                                                              | Type                                                |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `name`                 | Name for the credential.                                                                                                                 | `string`                                            |
| `challenge`            | Custom creation challenge for the credential.                                                                                            | `BufferSource`                                      |
| `excludeCredentialIds` | List of credential IDs to exclude from the creation. This property can be used to prevent creation of a credential if it already exists. | `string[]`                                          |
| `rp`                   | An object describing the relying party that requested the credential creation.                                                           | `{ id: string; name: string }`                      |
| `timeout`              | Timeout for the credential creation.                                                                                                     | `number`                                            |
| `user`                 | An object describing the user account for which the credential is generated.                                                             | `{ displayName: string; id: string; name: string }` |
| returns                | Public key credential                                                                                                                    | `PublicKeyCredential`                               |

### `getCredentialSignRequestOptions`

Returns the credential sign request options for a P256-flavoured WebAuthn credential.

#### Usage

```ts
import { getCredentialSignRequestOptions } from 'webauthn-p256'

const options = getCredentialSignRequestOptions({
  credentialId: '...',
  hash: '0x...',
})
```

#### API

| Name           | Description                       | Type          |
| -------------- | --------------------------------- | ------------- |
| `credentialId` | Credential ID to use for signing. | `string`      |
| `hash`         | Hash to sign.                     | `0x${string}` |
| `rpId`         | Relying party identifier.         | `string`      |
| returns        | Credential                        | `Credential`  |

### `parsePublicKey`

Parses a serialized public key into x and y coordinates.

#### Usage

```ts
import { parsePublicKey } from 'webauthn-p256'

const publicKey = parsePublicKey('0x...')

console.log(publicKey)
// { x: 1231..., y: 12412... }
```

#### API

| Name        | Description                            | Type          |
| ----------- | -------------------------------------- | ------------- |
| `publicKey` | Serialized P256 Credential public key. | `0x${string}` |
| returns     | Parsed public key.                     | `PublicKey`   |

### `parseSignature`

Parses a serialized signature into r and s coordinates.

#### Usage

```ts
import { parseSignature } from 'webauthn-p256'

const signature = parseSignature('0x...')

console.log(signature)
// { r: 1231..., s: 12412... }
```

#### API

| Name        | Description                            | Type          |
| ----------- | -------------------------------------- | ------------- |
| `signature` | Serialized P256 signature. | `0x${string}` |
| returns     | Parsed P256 signature.                     | `Signature`   |

### `serializePublicKey`

Serializes a public key into a hex string or bytes.

#### Usage

```ts
import { serializePublicKey } from 'webauthn-p256'

const publicKey = serializePublicKey({
  x: 12341...,
  y: 12341...,
})

console.log(publicKey)
// '0x...'
```

#### API

| Name        | Description                 | Type        |
| ----------- | --------------------------- | ----------- |
| `publicKey` | P256 Credential public key. | `PublicKey` |
| returns     | Serialized public key.      | `string`    |

### `serializeSignature`

Serializes a signature into a hex string or bytes.

#### Usage

```ts
import { serializeSignature } from 'webauthn-p256'

const signature = serializeSignature({
  r: 12341...,
  s: 12341...,
})

console.log(signature)
// '0x...'
```

#### API

| Name        | Description                 | Type        |
| ----------- | --------------------------- | ----------- |
| `signature` | P256 signature. | `Signature` |
| returns     | Serialized signature.      | `string`    |

## Authors

- [@jxom](https://github.com/jxom) (jxom.eth, [X](https://x.com/_jxom))

## License

[MIT](/LICENSE) License
