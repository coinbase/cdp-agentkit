import type { Abi, AbiStateMutability, ExtractAbiFunctions } from 'abitype';
import { type AbiFunctionNotFoundErrorType, type AbiFunctionOutputsNotFoundErrorType } from '../../errors/abi.js';
import type { ContractFunctionArgs, ContractFunctionName, ContractFunctionReturnType, Widen } from '../../types/contract.js';
import type { Hex } from '../../types/misc.js';
import type { ErrorType } from '../../errors/utils.js';
import type { IsNarrowable, UnionEvaluate } from '../../types/utils.js';
import { type DecodeAbiParametersErrorType } from './decodeAbiParameters.js';
import { type GetAbiItemErrorType } from './getAbiItem.js';
export type DecodeFunctionResultParameters<abi extends Abi | readonly unknown[] = Abi, functionName extends ContractFunctionName<abi> | undefined = ContractFunctionName<abi>, args extends ContractFunctionArgs<abi, AbiStateMutability, functionName extends ContractFunctionName<abi> ? functionName : ContractFunctionName<abi>> = ContractFunctionArgs<abi, AbiStateMutability, functionName extends ContractFunctionName<abi> ? functionName : ContractFunctionName<abi>>, hasFunctions = abi extends Abi ? Abi extends abi ? true : [ExtractAbiFunctions<abi>] extends [never] ? false : true : true, allArgs = ContractFunctionArgs<abi, AbiStateMutability, functionName extends ContractFunctionName<abi> ? functionName : ContractFunctionName<abi>>, allFunctionNames = ContractFunctionName<abi>> = {
    abi: abi;
    data: Hex;
} & UnionEvaluate<IsNarrowable<abi, Abi> extends true ? abi['length'] extends 1 ? {
    functionName?: functionName | allFunctionNames | undefined;
} : {
    functionName: functionName | allFunctionNames;
} : {
    functionName?: functionName | allFunctionNames | undefined;
}> & UnionEvaluate<readonly [] extends allArgs ? {
    args?: allArgs | (abi extends Abi ? args extends allArgs ? Widen<args> : never : never) | undefined;
} : {
    args?: allArgs | (Widen<args> & (args extends allArgs ? unknown : never)) | undefined;
}> & (hasFunctions extends true ? unknown : never);
export type DecodeFunctionResultReturnType<abi extends Abi | readonly unknown[] = Abi, functionName extends ContractFunctionName<abi> | undefined = ContractFunctionName<abi>, args extends ContractFunctionArgs<abi, AbiStateMutability, functionName extends ContractFunctionName<abi> ? functionName : ContractFunctionName<abi>> = ContractFunctionArgs<abi, AbiStateMutability, functionName extends ContractFunctionName<abi> ? functionName : ContractFunctionName<abi>>> = ContractFunctionReturnType<abi, AbiStateMutability, functionName extends ContractFunctionName<abi> ? functionName : ContractFunctionName<abi>, args>;
export type DecodeFunctionResultErrorType = AbiFunctionNotFoundErrorType | AbiFunctionOutputsNotFoundErrorType | DecodeAbiParametersErrorType | GetAbiItemErrorType | ErrorType;
export declare function decodeFunctionResult<const abi extends Abi | readonly unknown[], functionName extends ContractFunctionName<abi> | undefined = undefined, const args extends ContractFunctionArgs<abi, AbiStateMutability, functionName extends ContractFunctionName<abi> ? functionName : ContractFunctionName<abi>> = ContractFunctionArgs<abi, AbiStateMutability, functionName extends ContractFunctionName<abi> ? functionName : ContractFunctionName<abi>>>(parameters: DecodeFunctionResultParameters<abi, functionName, args>): DecodeFunctionResultReturnType<abi, functionName, args>;
//# sourceMappingURL=decodeFunctionResult.d.ts.map