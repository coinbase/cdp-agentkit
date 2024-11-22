import type { HDKey } from '@scure/bip32'
import type * as Errors from '../Errors.js'
import type * as HdKey from '../HdKey.js'
import * as Hex from '../Hex.js'
import * as Secp256k1 from '../Secp256k1.js'

/** @internal */
export function fromScure(key: HDKey): HdKey.HdKey {
  return {
    derive: (path) => fromScure(key.derive(path)),
    depth: key.depth,
    identifier: Hex.fromBytes(key.identifier!),
    index: key.index,
    privateKey: Hex.fromBytes(key.privateKey!),
    privateExtendedKey: key.privateExtendedKey,
    publicKey: Secp256k1.getPublicKey({ privateKey: key.privateKey! }),
    publicExtendedKey: key.publicExtendedKey,
    versions: key.versions,
  }
}

/** @internal */
export declare namespace fromScure {
  type ErrorType = Errors.GlobalErrorType
}
