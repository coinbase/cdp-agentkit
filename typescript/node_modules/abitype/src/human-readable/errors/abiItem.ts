import { BaseError } from '../../errors.js'

export class InvalidAbiItemError extends BaseError {
  override name = 'InvalidAbiItemError'

  constructor({ signature }: { signature: string | object }) {
    super('Failed to parse ABI item.', {
      details: `parseAbiItem(${JSON.stringify(signature, null, 2)})`,
      docsPath: '/api/human#parseabiitem-1',
    })
  }
}

export class UnknownTypeError extends BaseError {
  override name = 'UnknownTypeError'

  constructor({ type }: { type: string }) {
    super('Unknown type.', {
      metaMessages: [
        `Type "${type}" is not a valid ABI type. Perhaps you forgot to include a struct signature?`,
      ],
    })
  }
}

export class UnknownSolidityTypeError extends BaseError {
  override name = 'UnknownSolidityTypeError'

  constructor({ type }: { type: string }) {
    super('Unknown type.', {
      metaMessages: [`Type "${type}" is not a valid ABI type.`],
    })
  }
}
