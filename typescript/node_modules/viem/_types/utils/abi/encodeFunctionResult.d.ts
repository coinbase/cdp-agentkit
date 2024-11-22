import type { Abi, AbiStateMutability, ExtractAbiFunctions } from 'abitype';
import { AbiFunctionNotFoundError, AbiFunctionOutputsNotFoundError } from '../../errors/abi.js';
import type { ContractFunctionName, ContractFunctionReturnType } from '../../types/contract.js';
import type { ErrorType } from '../../errors/utils.js';
import type { Hex } from '../../types/misc.js';
import type { IsNarrowable, UnionEvaluate } from '../../types/utils.js';
import { type EncodeAbiParametersErrorType } from './encodeAbiParameters.js';
import { type GetAbiItemErrorType } from './getAbiItem.js';
export type EncodeFunctionResultParameters<abi extends Abi | readonly unknown[] = Abi, functionName extends ContractFunctionName<abi> | undefined = ContractFunctionName<abi>, hasFunctions = abi extends Abi ? Abi extends abi ? true : [ExtractAbiFunctions<abi>] extends [never] ? false : true : true, allFunctionNames = ContractFunctionName<abi>> = {
    abi: abi;
    result?: ContractFunctionReturnType<abi, AbiStateMutability, functionName extends ContractFunctionName<abi> ? functionName : ContractFunctionName<abi>, never> | undefined;
} & UnionEvaluate<IsNarrowable<abi, Abi> extends true ? abi['length'] extends 1 ? {
    functionName?: functionName | allFunctionNames | undefined;
} : {
    functionName: functionName | allFunctionNames;
} : {
    functionName?: functionName | allFunctionNames | undefined;
}> & (hasFunctions extends true ? unknown : never);
export type EncodeFunctionResultReturnType = Hex;
export type EncodeFunctionResultErrorType = AbiFunctionOutputsNotFoundError | AbiFunctionNotFoundError | EncodeAbiParametersErrorType | GetAbiItemErrorType | ErrorType;
export declare function encodeFunctionResult<const abi extends Abi | readonly unknown[], functionName extends ContractFunctionName<abi> | undefined = undefined>(parameters: EncodeFunctionResultParameters<abi, functionName>): EncodeFunctionResultReturnType;
//# sourceMappingURL=encodeFunctionResult.d.ts.map