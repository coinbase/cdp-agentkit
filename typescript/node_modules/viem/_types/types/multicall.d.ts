import type { Abi, AbiStateMutability } from 'abitype';
import type { ContractFunctionArgs, ContractFunctionName, ContractFunctionParameters, ContractFunctionReturnType } from './contract.js';
import type { MaybePartial, Prettify } from './utils.js';
export type MulticallContracts<contracts extends readonly unknown[], options extends {
    mutability: AbiStateMutability;
    optional?: boolean;
    properties?: Record<string, any>;
} = {
    mutability: AbiStateMutability;
}, result extends readonly any[] = []> = contracts extends readonly [] ? readonly [] : contracts extends readonly [infer contract] ? readonly [
    ...result,
    MaybePartial<Prettify<GetMulticallContractParameters<contract, options['mutability']> & options['properties']>, options['optional']>
] : contracts extends readonly [infer contract, ...infer rest] ? MulticallContracts<[
    ...rest
], options, [
    ...result,
    MaybePartial<Prettify<GetMulticallContractParameters<contract, options['mutability']> & options['properties']>, options['optional']>
]> : readonly unknown[] extends contracts ? contracts : contracts extends readonly (infer contract extends ContractFunctionParameters)[] ? readonly MaybePartial<Prettify<contract & options['properties']>, options['optional']>[] : readonly MaybePartial<Prettify<ContractFunctionParameters & options['properties']>, options['optional']>[];
export type MulticallResults<contracts extends readonly unknown[] = readonly ContractFunctionParameters[], allowFailure extends boolean = true, options extends {
    error?: Error;
    mutability: AbiStateMutability;
} = {
    error: Error;
    mutability: AbiStateMutability;
}, result extends any[] = []> = contracts extends readonly [] ? readonly [] : contracts extends readonly [infer contract] ? [
    ...result,
    MulticallResponse<GetMulticallContractReturnType<contract, options['mutability']>, options['error'], allowFailure>
] : contracts extends readonly [infer contract, ...infer rest] ? MulticallResults<[
    ...rest
], allowFailure, options, [
    ...result,
    MulticallResponse<GetMulticallContractReturnType<contract, options['mutability']>, options['error'], allowFailure>
]> : readonly unknown[] extends contracts ? MulticallResponse<unknown, options['error'], allowFailure>[] : contracts extends readonly (infer contract extends ContractFunctionParameters)[] ? MulticallResponse<GetMulticallContractReturnType<contract, options['mutability']>, options['error'], allowFailure>[] : MulticallResponse<unknown, options['error'], allowFailure>[];
export type MulticallResponse<result = unknown, error = unknown, allowFailure extends boolean = true> = allowFailure extends true ? {
    error?: undefined;
    result: result;
    status: 'success';
} | {
    error: unknown extends error ? Error : error;
    result?: undefined;
    status: 'failure';
} : result;
export type GetMulticallContractParameters<contract, mutability extends AbiStateMutability> = contract extends {
    abi: infer abi extends Abi;
} ? contract extends {
    functionName: infer functionName extends ContractFunctionName<abi, mutability>;
} ? contract extends {
    args: infer args extends ContractFunctionArgs<abi, mutability, functionName>;
} ? ContractFunctionParameters<abi, mutability, functionName, args> : ContractFunctionParameters<abi, mutability, functionName> : Abi extends abi ? ContractFunctionParameters : ContractFunctionParameters<abi, mutability> : ContractFunctionParameters<readonly unknown[]>;
type GetMulticallContractReturnType<contract, mutability extends AbiStateMutability> = contract extends {
    abi: infer abi extends Abi;
} ? contract extends {
    functionName: infer functionName extends ContractFunctionName<abi, mutability>;
} ? contract extends {
    args: infer args extends ContractFunctionArgs<abi, mutability, functionName>;
} ? ContractFunctionReturnType<abi, mutability, functionName, args> : ContractFunctionReturnType<abi, mutability, functionName> : ContractFunctionReturnType<abi, mutability> : ContractFunctionReturnType;
export {};
//# sourceMappingURL=multicall.d.ts.map