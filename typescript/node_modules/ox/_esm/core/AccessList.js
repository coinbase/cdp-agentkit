import * as Address from './Address.js';
import * as Errors from './Errors.js';
import * as Hash from './Hash.js';
import * as Hex from './Hex.js';
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
export function fromTupleList(accessList) {
    const list = [];
    for (let i = 0; i < accessList.length; i++) {
        const [address, storageKeys] = accessList[i];
        if (address)
            Address.assert(address, { strict: false });
        list.push({
            address: address,
            storageKeys: storageKeys.map((key) => Hash.validate(key) ? key : Hex.trimLeft(key)),
        });
    }
    return list;
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
export function toTupleList(accessList) {
    if (!accessList || accessList.length === 0)
        return [];
    const tuple = [];
    for (const { address, storageKeys } of accessList) {
        for (let j = 0; j < storageKeys.length; j++)
            if (Hex.size(storageKeys[j]) !== 32)
                throw new InvalidStorageKeySizeError({
                    storageKey: storageKeys[j],
                });
        if (address)
            Address.assert(address, { strict: false });
        tuple.push([address, storageKeys]);
    }
    return tuple;
}
/** Thrown when the size of a storage key is invalid. */
export class InvalidStorageKeySizeError extends Errors.BaseError {
    constructor({ storageKey }) {
        super(`Size for storage key "${storageKey}" is invalid. Expected 32 bytes. Got ${Hex.size(storageKey)} bytes.`);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'AccessList.InvalidStorageKeySizeError'
        });
    }
}
//# sourceMappingURL=AccessList.js.map