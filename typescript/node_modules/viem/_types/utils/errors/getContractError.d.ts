import type { Abi, Address } from 'abitype';
import { type ContractFunctionExecutionErrorType, type ContractFunctionRevertedErrorType, type ContractFunctionZeroDataErrorType } from '../../errors/contract.js';
import type { ErrorType } from '../../errors/utils.js';
export type GetContractErrorReturnType<cause = ErrorType> = Omit<ContractFunctionExecutionErrorType, 'cause'> & {
    cause: cause | ContractFunctionZeroDataErrorType | ContractFunctionRevertedErrorType;
};
export declare function getContractError<err extends ErrorType<string>>(err: err, { abi, address, args, docsPath, functionName, sender, }: {
    abi: Abi;
    args: any;
    address?: Address | undefined;
    docsPath?: string | undefined;
    functionName: string;
    sender?: Address | undefined;
}): GetContractErrorReturnType;
//# sourceMappingURL=getContractError.d.ts.map