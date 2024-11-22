import type { Abi, AbiStateMutability, ExtractAbiFunction, ExtractAbiFunctions } from 'abitype';
import { type AbiFunctionNotFoundErrorType } from '../../errors/abi.js';
import type { ContractFunctionArgs, ContractFunctionName } from '../../types/contract.js';
import type { ConcatHexErrorType } from '../data/concat.js';
import { type ToFunctionSelectorErrorType } from '../hash/toFunctionSelector.js';
import type { ErrorType } from '../../errors/utils.js';
import type { Hex } from '../../types/misc.js';
import type { IsNarrowable, UnionEvaluate } from '../../types/utils.js';
import { type FormatAbiItemErrorType } from './formatAbiItem.js';
import { type GetAbiItemErrorType } from './getAbiItem.js';
export type PrepareEncodeFunctionDataParameters<abi extends Abi | readonly unknown[] = Abi, functionName extends ContractFunctionName<abi> | undefined = ContractFunctionName<abi>, hasFunctions = abi extends Abi ? Abi extends abi ? true : [ExtractAbiFunctions<abi>] extends [never] ? false : true : true, allArgs = ContractFunctionArgs<abi, AbiStateMutability, functionName extends ContractFunctionName<abi> ? functionName : ContractFunctionName<abi>>, allFunctionNames = ContractFunctionName<abi>> = {
    abi: abi;
} & UnionEvaluate<IsNarrowable<abi, Abi> extends true ? abi['length'] extends 1 ? {
    functionName?: functionName | allFunctionNames | Hex | undefined;
} : {
    functionName: functionName | allFunctionNames | Hex;
} : {
    functionName?: functionName | allFunctionNames | Hex | undefined;
}> & UnionEvaluate<{
    args?: allArgs | undefined;
}> & (hasFunctions extends true ? unknown : never);
export type PrepareEncodeFunctionDataReturnType<abi extends Abi | readonly unknown[] = Abi, functionName extends ContractFunctionName<abi> | undefined = ContractFunctionName<abi>> = {
    abi: abi extends Abi ? functionName extends ContractFunctionName<abi> ? [ExtractAbiFunction<abi, functionName>] : abi : Abi;
    functionName: Hex;
};
export type PrepareEncodeFunctionDataErrorType = AbiFunctionNotFoundErrorType | ConcatHexErrorType | FormatAbiItemErrorType | GetAbiItemErrorType | ToFunctionSelectorErrorType | ErrorType;
export declare function prepareEncodeFunctionData<const abi extends Abi | readonly unknown[], functionName extends ContractFunctionName<abi> | undefined = undefined>(parameters: PrepareEncodeFunctionDataParameters<abi, functionName>): PrepareEncodeFunctionDataReturnType<abi, functionName>;
//# sourceMappingURL=prepareEncodeFunctionData.d.ts.map