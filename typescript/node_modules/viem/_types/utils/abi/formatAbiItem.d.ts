import type { AbiParameter } from 'abitype';
import { type InvalidDefinitionTypeErrorType } from '../../errors/abi.js';
import type { ErrorType } from '../../errors/utils.js';
import type { AbiItem } from '../../types/contract.js';
export type FormatAbiItemErrorType = FormatAbiParamsErrorType | InvalidDefinitionTypeErrorType | ErrorType;
export declare function formatAbiItem(abiItem: AbiItem, { includeName }?: {
    includeName?: boolean | undefined;
}): string;
export type FormatAbiParamsErrorType = ErrorType;
export declare function formatAbiParams(params: readonly AbiParameter[] | undefined, { includeName }?: {
    includeName?: boolean | undefined;
}): string;
export type FormatAbiParamErrorType = ErrorType;
//# sourceMappingURL=formatAbiItem.d.ts.map