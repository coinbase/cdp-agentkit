import type { Abi } from 'abitype';
import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import type { Chain } from '../../types/chain.js';
import type { ContractFunctionArgs, ContractFunctionName, ContractFunctionParameters, ContractFunctionReturnType } from '../../types/contract.js';
import type { UnionEvaluate } from '../../types/utils.js';
import { type DecodeFunctionResultErrorType } from '../../utils/abi/decodeFunctionResult.js';
import { type EncodeFunctionDataErrorType } from '../../utils/abi/encodeFunctionData.js';
import { type GetContractErrorReturnType } from '../../utils/errors/getContractError.js';
import { type CallErrorType, type CallParameters } from './call.js';
export type ReadContractParameters<abi extends Abi | readonly unknown[] = Abi, functionName extends ContractFunctionName<abi, 'pure' | 'view'> = ContractFunctionName<abi, 'pure' | 'view'>, args extends ContractFunctionArgs<abi, 'pure' | 'view', functionName> = ContractFunctionArgs<abi, 'pure' | 'view', functionName>> = UnionEvaluate<Pick<CallParameters, 'account' | 'blockNumber' | 'blockTag' | 'factory' | 'factoryData' | 'stateOverride'>> & ContractFunctionParameters<abi, 'pure' | 'view', functionName, args, boolean>;
export type ReadContractReturnType<abi extends Abi | readonly unknown[] = Abi, functionName extends ContractFunctionName<abi, 'pure' | 'view'> = ContractFunctionName<abi, 'pure' | 'view'>, args extends ContractFunctionArgs<abi, 'pure' | 'view', functionName> = ContractFunctionArgs<abi, 'pure' | 'view', functionName>> = ContractFunctionReturnType<abi, 'pure' | 'view', functionName, args>;
export type ReadContractErrorType = GetContractErrorReturnType<CallErrorType | EncodeFunctionDataErrorType | DecodeFunctionResultErrorType>;
/**
 * Calls a read-only function on a contract, and returns the response.
 *
 * - Docs: https://viem.sh/docs/contract/readContract
 * - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/contracts_reading-contracts
 *
 * A "read-only" function (constant function) on a Solidity contract is denoted by a `view` or `pure` keyword. They can only read the state of the contract, and cannot make any changes to it. Since read-only methods do not change the state of the contract, they do not require any gas to be executed, and can be called by any user without the need to pay for gas.
 *
 * Internally, uses a [Public Client](https://viem.sh/docs/clients/public) to call the [`call` action](https://viem.sh/docs/actions/public/call) with [ABI-encoded `data`](https://viem.sh/docs/contract/encodeFunctionData).
 *
 * @param client - Client to use
 * @param parameters - {@link ReadContractParameters}
 * @returns The response from the contract. Type is inferred. {@link ReadContractReturnType}
 *
 * @example
 * import { createPublicClient, http, parseAbi } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { readContract } from 'viem/contract'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const result = await readContract(client, {
 *   address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
 *   abi: parseAbi(['function balanceOf(address) view returns (uint256)']),
 *   functionName: 'balanceOf',
 *   args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e'],
 * })
 * // 424122n
 */
export declare function readContract<chain extends Chain | undefined, const abi extends Abi | readonly unknown[], functionName extends ContractFunctionName<abi, 'pure' | 'view'>, const args extends ContractFunctionArgs<abi, 'pure' | 'view', functionName>>(client: Client<Transport, chain>, parameters: ReadContractParameters<abi, functionName, args>): Promise<ReadContractReturnType<abi, functionName, args>>;
//# sourceMappingURL=readContract.d.ts.map