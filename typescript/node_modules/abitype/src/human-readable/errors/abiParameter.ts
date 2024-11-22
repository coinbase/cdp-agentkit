import type { AbiItemType, AbiParameter } from '../../abi.js'
import { BaseError } from '../../errors.js'
import type { Modifier } from '../types/signatures.js'

export class InvalidAbiParameterError extends BaseError {
  override name = 'InvalidAbiParameterError'

  constructor({ param }: { param: string | object }) {
    super('Failed to parse ABI parameter.', {
      details: `parseAbiParameter(${JSON.stringify(param, null, 2)})`,
      docsPath: '/api/human#parseabiparameter-1',
    })
  }
}

export class InvalidAbiParametersError extends BaseError {
  override name = 'InvalidAbiParametersError'

  constructor({ params }: { params: string | object }) {
    super('Failed to parse ABI parameters.', {
      details: `parseAbiParameters(${JSON.stringify(params, null, 2)})`,
      docsPath: '/api/human#parseabiparameters-1',
    })
  }
}

export class InvalidParameterError extends BaseError {
  override name = 'InvalidParameterError'

  constructor({ param }: { param: string }) {
    super('Invalid ABI parameter.', {
      details: param,
    })
  }
}

export class SolidityProtectedKeywordError extends BaseError {
  override name = 'SolidityProtectedKeywordError'

  constructor({ param, name }: { param: string; name: string }) {
    super('Invalid ABI parameter.', {
      details: param,
      metaMessages: [
        `"${name}" is a protected Solidity keyword. More info: https://docs.soliditylang.org/en/latest/cheatsheet.html`,
      ],
    })
  }
}

export class InvalidModifierError extends BaseError {
  override name = 'InvalidModifierError'

  constructor({
    param,
    type,
    modifier,
  }: {
    param: string
    type?: AbiItemType | 'struct' | undefined
    modifier: Modifier
  }) {
    super('Invalid ABI parameter.', {
      details: param,
      metaMessages: [
        `Modifier "${modifier}" not allowed${
          type ? ` in "${type}" type` : ''
        }.`,
      ],
    })
  }
}

export class InvalidFunctionModifierError extends BaseError {
  override name = 'InvalidFunctionModifierError'

  constructor({
    param,
    type,
    modifier,
  }: {
    param: string
    type?: AbiItemType | 'struct' | undefined
    modifier: Modifier
  }) {
    super('Invalid ABI parameter.', {
      details: param,
      metaMessages: [
        `Modifier "${modifier}" not allowed${
          type ? ` in "${type}" type` : ''
        }.`,
        `Data location can only be specified for array, struct, or mapping types, but "${modifier}" was given.`,
      ],
    })
  }
}

export class InvalidAbiTypeParameterError extends BaseError {
  override name = 'InvalidAbiTypeParameterError'

  constructor({
    abiParameter,
  }: {
    abiParameter: AbiParameter & { indexed?: boolean | undefined }
  }) {
    super('Invalid ABI parameter.', {
      details: JSON.stringify(abiParameter, null, 2),
      metaMessages: ['ABI parameter type is invalid.'],
    })
  }
}
