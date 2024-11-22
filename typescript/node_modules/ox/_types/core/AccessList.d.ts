import * as Address from './Address.js';
import * as Errors from './Errors.js';
import * as Hex from './Hex.js';
import type { Compute } from './internal/types.js';
export type AccessList = Compute<readonly Item[]>;
export type Item = Compute<{
    address: Address.Address;
    storageKeys: readonly Hex.Hex[];
}>;
export type ItemTuple = Compute<[
    address: Address.Address,
    storageKeys: readonly Hex.Hex[]
]>;
export type Tuple = readonly ItemTuple[];
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
export declare function fromTupleList(accessList: Tuple): AccessList;
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
export declare function toTupleList(accessList?: AccessList | undefined): Compute<Tuple>;
/** Thrown when the size of a storage key is invalid. */
export declare class InvalidStorageKeySizeError extends Errors.BaseError {
    readonly name = "AccessList.InvalidStorageKeySizeError";
    constructor({ storageKey }: {
        storageKey: Hex.Hex;
    });
}
//# sourceMappingURL=AccessList.d.ts.map