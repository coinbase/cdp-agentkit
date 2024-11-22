import type { Abi } from 'abitype';
import type { Account } from '../../accounts/types.js';
import { type ParseAccountErrorType } from '../../accounts/utils/parseAccount.js';
import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import type { Chain } from '../../types/chain.js';
import type { ContractFunctionArgs, ContractFunctionName, ContractFunctionParameters, GetValue } from '../../types/contract.js';
import type { UnionOmit } from '../../types/utils.js';
import { type EncodeFunctionDataErrorType } from '../../utils/abi/encodeFunctionData.js';
import { type GetContractErrorReturnType } from '../../utils/errors/getContractError.js';
import { type EstimateGasErrorType, type EstimateGasParameters } from './estimateGas.js';
export type EstimateContractGasParameters<abi extends Abi | readonly unknown[] = Abi, functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'> = ContractFunctionName<abi, 'nonpayable' | 'payable'>, args extends ContractFunctionArgs<abi, 'nonpayable' | 'payable', functionName> = ContractFunctionArgs<abi, 'nonpayable' | 'payable', functionName>, chain extends Chain | undefined = Chain | undefined> = ContractFunctionParameters<abi, 'nonpayable' | 'payable', functionName, args> & UnionOmit<EstimateGasParameters<chain>, 'data' | 'to' | 'value'> & GetValue<abi, functionName, EstimateGasParameters<chain> extends EstimateGasParameters ? EstimateGasParameters<chain>['value'] : EstimateGasParameters['value']>;
export type EstimateContractGasReturnType = bigint;
export type EstimateContractGasErrorType = GetContractErrorReturnType<EncodeFunctionDataErrorType | EstimateGasErrorType | ParseAccountErrorType>;
/**
 * Estimates the gas required to successfully execute a contract write function call.
 *
 * - Docs: https://viem.sh/docs/contract/estimateContractGas
 *
 * Internally, uses a [Public Client](https://viem.sh/docs/clients/public) to call the [`estimateGas` action](https://viem.sh/docs/actions/public/estimateGas) with [ABI-encoded `data`](https://viem.sh/docs/contract/encodeFunctionData).
 *
 * @param client - Client to use
 * @param parameters - {@link EstimateContractGasParameters}
 * @returns The gas estimate (in wei). {@link EstimateContractGasReturnType}
 *
 * @example
 * import { createPublicClient, http, parseAbi } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { estimateContractGas } from 'viem/contract'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const gas = await estimateContractGas(client, {
 *   address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
 *   abi: parseAbi(['function mint() public']),
 *   functionName: 'mint',
 *   account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
 * })
 */
export declare function estimateContractGas<const abi extends Abi | readonly unknown[], functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>, args extends ContractFunctionArgs<abi, 'pure' | 'view', functionName>, chain extends Chain | undefined, account extends Account | undefined = undefined>(client: Client<Transport, chain, account>, parameters: EstimateContractGasParameters<abi, functionName, args, chain>): Promise<EstimateContractGasReturnType>;
//# sourceMappingURL=estimateContractGas.d.ts.map