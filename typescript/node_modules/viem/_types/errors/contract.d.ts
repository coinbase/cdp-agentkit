import type { Abi, Address } from 'abitype';
import type { CallParameters } from '../actions/public/call.js';
import type { Chain } from '../types/chain.js';
import type { Hex } from '../types/misc.js';
import { type DecodeErrorResultReturnType } from '../utils/abi/decodeErrorResult.js';
import { BaseError } from './base.js';
export type CallExecutionErrorType = CallExecutionError & {
    name: 'CallExecutionError';
};
export declare class CallExecutionError extends BaseError {
    cause: BaseError;
    constructor(cause: BaseError, { account: account_, docsPath, chain, data, gas, gasPrice, maxFeePerGas, maxPriorityFeePerGas, nonce, to, value, stateOverride, }: CallParameters & {
        chain?: Chain | undefined;
        docsPath?: string | undefined;
    });
}
export type ContractFunctionExecutionErrorType = ContractFunctionExecutionError & {
    name: 'ContractFunctionExecutionError';
};
export declare class ContractFunctionExecutionError extends BaseError {
    abi: Abi;
    args?: unknown[] | undefined;
    cause: BaseError;
    contractAddress?: Address | undefined;
    formattedArgs?: string | undefined;
    functionName: string;
    sender?: Address | undefined;
    constructor(cause: BaseError, { abi, args, contractAddress, docsPath, functionName, sender, }: {
        abi: Abi;
        args?: any | undefined;
        contractAddress?: Address | undefined;
        docsPath?: string | undefined;
        functionName: string;
        sender?: Address | undefined;
    });
}
export type ContractFunctionRevertedErrorType = ContractFunctionRevertedError & {
    name: 'ContractFunctionRevertedError';
};
export declare class ContractFunctionRevertedError extends BaseError {
    data?: DecodeErrorResultReturnType | undefined;
    reason?: string | undefined;
    signature?: Hex | undefined;
    constructor({ abi, data, functionName, message, }: {
        abi: Abi;
        data?: Hex | undefined;
        functionName: string;
        message?: string | undefined;
    });
}
export type ContractFunctionZeroDataErrorType = ContractFunctionZeroDataError & {
    name: 'ContractFunctionZeroDataError';
};
export declare class ContractFunctionZeroDataError extends BaseError {
    constructor({ functionName }: {
        functionName: string;
    });
}
export type CounterfactualDeploymentFailedErrorType = CounterfactualDeploymentFailedError & {
    name: 'CounterfactualDeploymentFailedError';
};
export declare class CounterfactualDeploymentFailedError extends BaseError {
    constructor({ factory }: {
        factory?: Address | undefined;
    });
}
export type RawContractErrorType = RawContractError & {
    name: 'RawContractError';
};
export declare class RawContractError extends BaseError {
    code: number;
    data?: Hex | {
        data?: Hex | undefined;
    } | undefined;
    constructor({ data, message, }: {
        data?: Hex | {
            data?: Hex | undefined;
        } | undefined;
        message?: string | undefined;
    });
}
//# sourceMappingURL=contract.d.ts.map