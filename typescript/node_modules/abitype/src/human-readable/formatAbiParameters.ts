import type { AbiEventParameter, AbiParameter } from '../abi.js'
import type { Join } from '../types.js'
import {
  type FormatAbiParameter,
  formatAbiParameter,
} from './formatAbiParameter.js'

/**
 * Formats {@link AbiParameter}s to human-readable ABI parameter.
 *
 * @param abiParameters - ABI parameters
 * @returns Human-readable ABI parameters
 *
 * @example
 * type Result = FormatAbiParameters<[
 *   // ^? type Result = 'address from, uint256 tokenId'
 *   { type: 'address'; name: 'from'; },
 *   { type: 'uint256'; name: 'tokenId'; },
 * ]>
 */
export type FormatAbiParameters<
  abiParameters extends readonly [
    AbiParameter | AbiEventParameter,
    ...(readonly (AbiParameter | AbiEventParameter)[]),
  ],
> = Join<
  {
    [key in keyof abiParameters]: FormatAbiParameter<abiParameters[key]>
  },
  ', '
>

/**
 * Formats {@link AbiParameter}s to human-readable ABI parameters.
 *
 * @param abiParameters - ABI parameters
 * @returns Human-readable ABI parameters
 *
 * @example
 * const result = formatAbiParameters([
 *   //  ^? const result: 'address from, uint256 tokenId'
 *   { type: 'address', name: 'from' },
 *   { type: 'uint256', name: 'tokenId' },
 * ])
 */
export function formatAbiParameters<
  const abiParameters extends readonly [
    AbiParameter | AbiEventParameter,
    ...(readonly (AbiParameter | AbiEventParameter)[]),
  ],
>(abiParameters: abiParameters): FormatAbiParameters<abiParameters> {
  let params = ''
  const length = abiParameters.length
  for (let i = 0; i < length; i++) {
    const abiParameter = abiParameters[i]!
    params += formatAbiParameter(abiParameter)
    if (i !== length - 1) params += ', '
  }
  return params as FormatAbiParameters<abiParameters>
}
