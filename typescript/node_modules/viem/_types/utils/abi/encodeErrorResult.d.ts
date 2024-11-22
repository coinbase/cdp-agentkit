import type { Abi, ExtractAbiErrors } from 'abitype';
import type { ContractErrorArgs, ContractErrorName } from '../../types/contract.js';
import type { Hex } from '../../types/misc.js';
import { type ConcatHexErrorType } from '../data/concat.js';
import { type ToFunctionSelectorErrorType } from '../hash/toFunctionSelector.js';
import type { ErrorType } from '../../errors/utils.js';
import type { IsNarrowable, UnionEvaluate } from '../../types/utils.js';
import { type EncodeAbiParametersErrorType } from './encodeAbiParameters.js';
import { type FormatAbiItemErrorType } from './formatAbiItem.js';
import { type GetAbiItemErrorType } from './getAbiItem.js';
export type EncodeErrorResultParameters<abi extends Abi | readonly unknown[] = Abi, errorName extends ContractErrorName<abi> | undefined = ContractErrorName<abi>, hasErrors = abi extends Abi ? Abi extends abi ? true : [ExtractAbiErrors<abi>] extends [never] ? false : true : true, allArgs = ContractErrorArgs<abi, errorName extends ContractErrorName<abi> ? errorName : ContractErrorName<abi>>, allErrorNames = ContractErrorName<abi>> = {
    abi: abi;
    args?: allArgs | undefined;
} & UnionEvaluate<IsNarrowable<abi, Abi> extends true ? abi['length'] extends 1 ? {
    errorName?: errorName | allErrorNames | undefined;
} : {
    errorName: errorName | allErrorNames;
} : {
    errorName?: errorName | allErrorNames | undefined;
}> & (hasErrors extends true ? unknown : never);
export type EncodeErrorResultReturnType = Hex;
export type EncodeErrorResultErrorType = GetAbiItemErrorType | FormatAbiItemErrorType | ToFunctionSelectorErrorType | EncodeAbiParametersErrorType | ConcatHexErrorType | ErrorType;
export declare function encodeErrorResult<const abi extends Abi | readonly unknown[], errorName extends ContractErrorName<abi> | undefined = undefined>(parameters: EncodeErrorResultParameters<abi, errorName>): EncodeErrorResultReturnType;
//# sourceMappingURL=encodeErrorResult.d.ts.map