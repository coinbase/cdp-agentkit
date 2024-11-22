import type { Abi, ExtractAbiError } from 'abitype';
import { type AbiDecodingZeroDataErrorType, type AbiErrorSignatureNotFoundErrorType } from '../../errors/abi.js';
import type { ErrorType } from '../../errors/utils.js';
import type { AbiItem, ContractErrorArgs, ContractErrorName } from '../../types/contract.js';
import type { Hex } from '../../types/misc.js';
import type { IsNarrowable, UnionEvaluate } from '../../types/utils.js';
import { type ToFunctionSelectorErrorType } from '../hash/toFunctionSelector.js';
import { type DecodeAbiParametersErrorType } from './decodeAbiParameters.js';
import { type FormatAbiItemErrorType } from './formatAbiItem.js';
export type DecodeErrorResultParameters<abi extends Abi | readonly unknown[] = Abi> = {
    abi?: abi | undefined;
    data: Hex;
};
export type DecodeErrorResultReturnType<abi extends Abi | readonly unknown[] = Abi, allErrorNames extends ContractErrorName<abi> = ContractErrorName<abi>> = IsNarrowable<abi, Abi> extends true ? UnionEvaluate<{
    [errorName in allErrorNames]: {
        abiItem: abi extends Abi ? Abi extends abi ? AbiItem : ExtractAbiError<abi, errorName> : AbiItem;
        args: ContractErrorArgs<abi, errorName>;
        errorName: errorName;
    };
}[allErrorNames]> : {
    abiItem: AbiItem;
    args: readonly unknown[] | undefined;
    errorName: string;
};
export type DecodeErrorResultErrorType = AbiDecodingZeroDataErrorType | AbiErrorSignatureNotFoundErrorType | DecodeAbiParametersErrorType | FormatAbiItemErrorType | ToFunctionSelectorErrorType | ErrorType;
export declare function decodeErrorResult<const abi extends Abi | readonly unknown[]>(parameters: DecodeErrorResultParameters<abi>): DecodeErrorResultReturnType<abi>;
//# sourceMappingURL=decodeErrorResult.d.ts.map