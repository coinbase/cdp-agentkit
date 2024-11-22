import type { Abi, AbiStateMutability } from 'abitype';
import { AbiFunctionSignatureNotFoundError } from '../../errors/abi.js';
import type { ErrorType } from '../../errors/utils.js';
import type { ContractFunctionArgs, ContractFunctionName } from '../../types/contract.js';
import type { Hex } from '../../types/misc.js';
import type { IsNarrowable, UnionEvaluate } from '../../types/utils.js';
import { type SliceErrorType } from '../data/slice.js';
import { type ToFunctionSelectorErrorType } from '../hash/toFunctionSelector.js';
import { type DecodeAbiParametersErrorType } from './decodeAbiParameters.js';
import { type FormatAbiItemErrorType } from './formatAbiItem.js';
export type DecodeFunctionDataParameters<abi extends Abi | readonly unknown[] = Abi> = {
    abi: abi;
    data: Hex;
};
export type DecodeFunctionDataReturnType<abi extends Abi | readonly unknown[] = Abi, allFunctionNames extends ContractFunctionName<abi> = ContractFunctionName<abi>> = IsNarrowable<abi, Abi> extends true ? UnionEvaluate<{
    [functionName in allFunctionNames]: {
        args: ContractFunctionArgs<abi, AbiStateMutability, functionName>;
        functionName: functionName;
    };
}[allFunctionNames]> : {
    args: readonly unknown[] | undefined;
    functionName: string;
};
export type DecodeFunctionDataErrorType = AbiFunctionSignatureNotFoundError | DecodeAbiParametersErrorType | FormatAbiItemErrorType | ToFunctionSelectorErrorType | SliceErrorType | ErrorType;
export declare function decodeFunctionData<const abi extends Abi | readonly unknown[]>(parameters: DecodeFunctionDataParameters<abi>): DecodeFunctionDataReturnType<abi>;
//# sourceMappingURL=decodeFunctionData.d.ts.map