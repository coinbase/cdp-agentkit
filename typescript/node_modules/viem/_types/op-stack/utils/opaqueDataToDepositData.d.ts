import type { ErrorType } from '../../errors/utils.js';
import type { Hex } from '../../types/misc.js';
import { type SizeErrorType } from '../../utils/data/size.js';
import { type SliceErrorType } from '../../utils/data/slice.js';
export type OpaqueDataToDepositDataParameters = Hex;
export type OpaqueDataToDepositDataReturnType = {
    mint: bigint;
    value: bigint;
    gas: bigint;
    isCreation: boolean;
    data: Hex;
};
export type OpaqueDataToDepositDataErrorType = SliceErrorType | SizeErrorType | ErrorType;
export declare function opaqueDataToDepositData(opaqueData: Hex): OpaqueDataToDepositDataReturnType;
//# sourceMappingURL=opaqueDataToDepositData.d.ts.map