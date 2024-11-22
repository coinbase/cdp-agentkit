import type { ErrorType } from '../../errors/utils.js';
import type { Log } from '../../types/log.js';
import type { Hex } from '../../types/misc.js';
export type GetL2TransactionHashesParameters = {
    /** The L1 transaction receipt logs. */
    logs: Log[];
};
export type GetL2TransactionHashesReturnType = Hex[];
export type GetL2TransactionHashesErrorType = ErrorType;
export declare function getL2TransactionHashes({ logs, }: GetL2TransactionHashesParameters): GetL2TransactionHashesReturnType;
//# sourceMappingURL=getL2TransactionHashes.d.ts.map