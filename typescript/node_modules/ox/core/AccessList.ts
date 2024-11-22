import * as Address from './Address.js'
import * as Errors from './Errors.js'
import * as Hash from './Hash.js'
import * as Hex from './Hex.js'
import type { Compute, Mutable } from './internal/types.js'

export type AccessList = Compute<readonly Item[]>

export type Item = Compute<{
  address: Address.Address
  storageKeys: readonly Hex.Hex[]
}>

export type ItemTuple = Compute<
  [address: Address.Address, storageKeys: readonly Hex.Hex[]]
>

export type Tuple = readonly ItemTuple[]

/**
 * Converts a list of Access List tuples into a object-formatted list.
 *
 * @example
 * ```ts twoslash
 * import { AccessList } from 'ox'
 *
 * const accessList = AccessList.fromTupleList([
 *   [
 *     '0x0000000000000000000000000000000000000000',
 *     [
 *       '0x0000000000000000000000000000000000000000000000000000000000000001',
 *       '0x60fdd29ff912ce880cd3edaf9f932dc61d3dae823ea77e0323f94adb9f6a72fe',
 *     ],
 *   ],
 * ])
 * // @log: [
 * // @log:   {
 * // @log:     address: '0x0000000000000000000000000000000000000000',
 * // @log:     storageKeys: [
 * // @log:       '0x0000000000000000000000000000000000000000000000000000000000000001',
 * // @log:       '0x60fdd29ff912ce880cd3edaf9f932dc61d3dae823ea77e0323f94adb9f6a72fe',
 * // @log:     ],
 * // @log:   },
 * // @log: ]
 * ```
 *
 * @param accessList - List of tuples.
 * @returns Access list.
 */
export function fromTupleList(accessList: Tuple): AccessList {
  const list: Mutable<AccessList> = []
  for (let i = 0; i < accessList.length; i++) {
    const [address, storageKeys] = accessList[i] as [Hex.Hex, Hex.Hex[]]

    if (address) Address.assert(address, { strict: false })

    list.push({
      address: address,
      storageKeys: storageKeys.map((key) =>
        Hash.validate(key) ? key : Hex.trimLeft(key),
      ),
    })
  }
  return list
}

/**
 * Converts a structured Access List into a list of tuples.
 *
 * @example
 * ```ts twoslash
 * import { AccessList } from 'ox'
 *
 * const accessList = AccessList.toTupleList([
 *   {
 *     address: '0x0000000000000000000000000000000000000000',
 *     storageKeys: [
 *       '0x0000000000000000000000000000000000000000000000000000000000000001',
 *       '0x60fdd29ff912ce880cd3edaf9f932dc61d3dae823ea77e0323f94adb9f6a72fe'],
 *   },
 * ])
 * // @log: [
 * // @log:   [
 * // @log:     '0x0000000000000000000000000000000000000000',
 * // @log:     [
 * // @log:       '0x0000000000000000000000000000000000000000000000000000000000000001',
 * // @log:       '0x60fdd29ff912ce880cd3edaf9f932dc61d3dae823ea77e0323f94adb9f6a72fe',
 * // @log:     ],
 * // @log:   ],
 * // @log: ]
 * ```
 *
 * @param accessList - Access list.
 * @returns List of tuples.
 */
export function toTupleList(
  accessList?: AccessList | undefined,
): Compute<Tuple> {
  if (!accessList || accessList.length === 0) return []

  const tuple: Mutable<Tuple> = []
  for (const { address, storageKeys } of accessList) {
    for (let j = 0; j < storageKeys.length; j++)
      if (Hex.size(storageKeys[j]!) !== 32)
        throw new InvalidStorageKeySizeError({
          storageKey: storageKeys[j]!,
        })

    if (address) Address.assert(address, { strict: false })

    tuple.push([address, storageKeys])
  }
  return tuple
}

/** Thrown when the size of a storage key is invalid. */
export class InvalidStorageKeySizeError extends Errors.BaseError {
  override readonly name = 'AccessList.InvalidStorageKeySizeError'
  constructor({ storageKey }: { storageKey: Hex.Hex }) {
    super(
      `Size for storage key "${storageKey}" is invalid. Expected 32 bytes. Got ${Hex.size(storageKey)} bytes.`,
    )
  }
}
