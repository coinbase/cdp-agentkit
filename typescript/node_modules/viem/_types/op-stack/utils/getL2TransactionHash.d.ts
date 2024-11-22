import type { ErrorType } from '../../errors/utils.js';
import type { Log } from '../../types/log.js';
import type { Hex } from '../../types/misc.js';
import type { portalAbi } from '../abis.js';
export type GetL2TransactionHashParameters = {
    /** The "TransactionDeposited" log to compute the L2 hash from. */
    log: Log<bigint, number, false, undefined, true, typeof portalAbi, 'TransactionDeposited'>;
};
export type GetL2TransactionHashReturnType = Hex;
export type GetL2TransactionHashErrorType = ErrorType;
export declare function getL2TransactionHash({ log }: GetL2TransactionHashParameters): `0x${string}`;
//# sourceMappingURL=getL2TransactionHash.d.ts.map