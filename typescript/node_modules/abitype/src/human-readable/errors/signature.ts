import type { AbiItemType } from '../../abi.js'
import { BaseError } from '../../errors.js'

export class InvalidSignatureError extends BaseError {
  override name = 'InvalidSignatureError'

  constructor({
    signature,
    type,
  }: {
    signature: string
    type: AbiItemType | 'struct'
  }) {
    super(`Invalid ${type} signature.`, {
      details: signature,
    })
  }
}

export class UnknownSignatureError extends BaseError {
  override name = 'UnknownSignatureError'

  constructor({ signature }: { signature: string }) {
    super('Unknown signature.', {
      details: signature,
    })
  }
}

export class InvalidStructSignatureError extends BaseError {
  override name = 'InvalidStructSignatureError'

  constructor({ signature }: { signature: string }) {
    super('Invalid struct signature.', {
      details: signature,
      metaMessages: ['No properties exist.'],
    })
  }
}
