import type {
  Abi,
  AbiConstructor,
  AbiError,
  AbiEvent,
  AbiEventParameter,
  AbiFallback,
  AbiFunction,
  AbiParameter,
  AbiReceive,
  AbiStateMutability,
} from '../abi.js'
import {
  type FormatAbiParameters as FormatAbiParameters_,
  formatAbiParameters,
} from './formatAbiParameters.js'
import type { AssertName } from './types/signatures.js'

/**
 * Formats ABI item (e.g. error, event, function) into human-readable ABI item
 *
 * @param abiItem - ABI item
 * @returns Human-readable ABI item
 */
export type FormatAbiItem<abiItem extends Abi[number]> =
  Abi[number] extends abiItem
    ? string
    :
        | (abiItem extends AbiFunction
            ? AbiFunction extends abiItem
              ? string
              : `function ${AssertName<abiItem['name']>}(${FormatAbiParameters<
                  abiItem['inputs']
                >})${abiItem['stateMutability'] extends Exclude<
                  AbiStateMutability,
                  'nonpayable'
                >
                  ? ` ${abiItem['stateMutability']}`
                  : ''}${abiItem['outputs']['length'] extends 0
                  ? ''
                  : ` returns (${FormatAbiParameters<abiItem['outputs']>})`}`
            : never)
        | (abiItem extends AbiEvent
            ? AbiEvent extends abiItem
              ? string
              : `event ${AssertName<abiItem['name']>}(${FormatAbiParameters<
                  abiItem['inputs']
                >})`
            : never)
        | (abiItem extends AbiError
            ? AbiError extends abiItem
              ? string
              : `error ${AssertName<abiItem['name']>}(${FormatAbiParameters<
                  abiItem['inputs']
                >})`
            : never)
        | (abiItem extends AbiConstructor
            ? AbiConstructor extends abiItem
              ? string
              : `constructor(${FormatAbiParameters<
                  abiItem['inputs']
                >})${abiItem['stateMutability'] extends 'payable'
                  ? ' payable'
                  : ''}`
            : never)
        | (abiItem extends AbiFallback
            ? AbiFallback extends abiItem
              ? string
              : 'fallback()'
            : never)
        | (abiItem extends AbiReceive
            ? AbiReceive extends abiItem
              ? string
              : 'receive() external payable'
            : never)

type FormatAbiParameters<
  abiParameters extends readonly (AbiParameter | AbiEventParameter)[],
> = abiParameters['length'] extends 0
  ? ''
  : FormatAbiParameters_<
      abiParameters extends readonly [
        AbiParameter | AbiEventParameter,
        ...(readonly (AbiParameter | AbiEventParameter)[]),
      ]
        ? abiParameters
        : never
    >

/**
 * Formats ABI item (e.g. error, event, function) into human-readable ABI item
 *
 * @param abiItem - ABI item
 * @returns Human-readable ABI item
 */
export function formatAbiItem<const abiItem extends Abi[number]>(
  abiItem: abiItem,
): FormatAbiItem<abiItem> {
  type Result = FormatAbiItem<abiItem>
  type Params = readonly [
    AbiParameter | AbiEventParameter,
    ...(readonly (AbiParameter | AbiEventParameter)[]),
  ]

  if (abiItem.type === 'function')
    return `function ${abiItem.name}(${formatAbiParameters(
      abiItem.inputs as Params,
    )})${
      abiItem.stateMutability && abiItem.stateMutability !== 'nonpayable'
        ? ` ${abiItem.stateMutability}`
        : ''
    }${
      abiItem.outputs.length
        ? ` returns (${formatAbiParameters(abiItem.outputs as Params)})`
        : ''
    }`
  if (abiItem.type === 'event')
    return `event ${abiItem.name}(${formatAbiParameters(
      abiItem.inputs as Params,
    )})`
  if (abiItem.type === 'error')
    return `error ${abiItem.name}(${formatAbiParameters(
      abiItem.inputs as Params,
    )})`
  if (abiItem.type === 'constructor')
    return `constructor(${formatAbiParameters(abiItem.inputs as Params)})${
      abiItem.stateMutability === 'payable' ? ' payable' : ''
    }`
  if (abiItem.type === 'fallback') return 'fallback()' as Result
  return 'receive() external payable' as Result
}
