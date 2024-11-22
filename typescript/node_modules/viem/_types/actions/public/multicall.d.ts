import type { AbiStateMutability, Address, Narrow } from 'abitype';
import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import type { Chain } from '../../types/chain.js';
import type { ContractFunctionParameters } from '../../types/contract.js';
import type { MulticallContracts, MulticallResults } from '../../types/multicall.js';
import { type DecodeFunctionResultErrorType } from '../../utils/abi/decodeFunctionResult.js';
import { type EncodeFunctionDataErrorType } from '../../utils/abi/encodeFunctionData.js';
import { type GetChainContractAddressErrorType } from '../../utils/chain/getChainContractAddress.js';
import { type GetContractErrorReturnType } from '../../utils/errors/getContractError.js';
import type { ErrorType } from '../../errors/utils.js';
import type { CallParameters } from './call.js';
import { type ReadContractErrorType } from './readContract.js';
export type MulticallParameters<contracts extends readonly unknown[] = readonly ContractFunctionParameters[], allowFailure extends boolean = true, options extends {
    optional?: boolean;
    properties?: Record<string, any>;
} = {}> = Pick<CallParameters, 'blockNumber' | 'blockTag' | 'stateOverride'> & {
    allowFailure?: allowFailure | boolean | undefined;
    batchSize?: number | undefined;
    contracts: MulticallContracts<Narrow<contracts>, {
        mutability: AbiStateMutability;
    } & options>;
    multicallAddress?: Address | undefined;
};
export type MulticallReturnType<contracts extends readonly unknown[] = readonly ContractFunctionParameters[], allowFailure extends boolean = true, options extends {
    error?: Error;
} = {
    error: Error;
}> = MulticallResults<Narrow<contracts>, allowFailure, {
    mutability: AbiStateMutability;
} & options>;
export type MulticallErrorType = GetChainContractAddressErrorType | ReadContractErrorType | GetContractErrorReturnType<EncodeFunctionDataErrorType | DecodeFunctionResultErrorType> | ErrorType;
/**
 * Similar to [`readContract`](https://viem.sh/docs/contract/readContract), but batches up multiple functions on a contract in a single RPC call via the [`multicall3` contract](https://github.com/mds1/multicall).
 *
 * - Docs: https://viem.sh/docs/contract/multicall
 *
 * @param client - Client to use
 * @param parameters - {@link MulticallParameters}
 * @returns An array of results with accompanying status. {@link MulticallReturnType}
 *
 * @example
 * import { createPublicClient, http, parseAbi } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { multicall } from 'viem/contract'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const abi = parseAbi([
 *   'function balanceOf(address) view returns (uint256)',
 *   'function totalSupply() view returns (uint256)',
 * ])
 * const results = await multicall(client, {
 *   contracts: [
 *     {
 *       address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
 *       abi,
 *       functionName: 'balanceOf',
 *       args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e'],
 *     },
 *     {
 *       address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
 *       abi,
 *       functionName: 'totalSupply',
 *     },
 *   ],
 * })
 * // [{ result: 424122n, status: 'success' }, { result: 1000000n, status: 'success' }]
 */
export declare function multicall<const contracts extends readonly unknown[], chain extends Chain | undefined, allowFailure extends boolean = true>(client: Client<Transport, chain>, parameters: MulticallParameters<contracts, allowFailure>): Promise<MulticallReturnType<contracts, allowFailure>>;
//# sourceMappingURL=multicall.d.ts.map