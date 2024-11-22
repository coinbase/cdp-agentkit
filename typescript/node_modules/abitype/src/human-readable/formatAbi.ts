import type { Abi } from '../abi.js'
import { type FormatAbiItem, formatAbiItem } from './formatAbiItem.js'

/**
 * Parses JSON ABI into human-readable ABI
 *
 * @param abi - ABI
 * @returns Human-readable ABI
 */
export type FormatAbi<abi extends Abi | readonly unknown[]> = Abi extends abi
  ? readonly string[]
  : abi extends readonly []
    ? never
    : abi extends Abi
      ? {
          [key in keyof abi]: FormatAbiItem<abi[key]>
        }
      : readonly string[]

/**
 * Parses JSON ABI into human-readable ABI
 *
 * @param abi - ABI
 * @returns Human-readable ABI
 */
export function formatAbi<const abi extends Abi | readonly unknown[]>(
  abi: abi,
): FormatAbi<abi> {
  const signatures = []
  const length = abi.length
  for (let i = 0; i < length; i++) {
    const abiItem = abi[i]!
    const signature = formatAbiItem(abiItem as Abi[number])
    signatures.push(signature)
  }
  return signatures as unknown as FormatAbi<abi>
}
