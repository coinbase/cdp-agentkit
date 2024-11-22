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
import { type EstimateTotalGasErrorType, type EstimateTotalGasParameters } from './estimateTotalGas.js';
export type EstimateContractTotalGasParameters<abi extends Abi | readonly unknown[] = Abi, functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'> = ContractFunctionName<abi, 'nonpayable' | 'payable'>, args extends ContractFunctionArgs<abi, 'nonpayable' | 'payable', functionName> = ContractFunctionArgs<abi, 'nonpayable' | 'payable', functionName>, chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = undefined, chainOverride extends Chain | undefined = Chain | undefined> = ContractFunctionParameters<abi, 'nonpayable' | 'payable', functionName, args> & UnionOmit<EstimateTotalGasParameters<chain, account, chainOverride>, 'data' | 'to' | 'value'> & GetValue<abi, functionName, EstimateTotalGasParameters<chain, account, chainOverride> extends EstimateTotalGasParameters ? EstimateTotalGasParameters<chain, account, chainOverride>['value'] : EstimateTotalGasParameters['value']>;
export type EstimateContractTotalGasReturnType = bigint;
export type EstimateContractTotalGasErrorType = GetContractErrorReturnType<EncodeFunctionDataErrorType | EstimateTotalGasErrorType | ParseAccountErrorType>;
/**
 * Estimates the L1 data gas + L2 gas required to successfully execute a contract write function call.
 *
 * @param client - Client to use
 * @param parameters - {@link EstimateContractTotalGasParameters}
 * @returns The gas estimate (in wei). {@link EstimateContractTotalGasReturnType}
 *
 * @example
 * import { createPublicClient, http, parseAbi } from 'viem'
 * import { optimism } from 'viem/chains'
 * import { estimateContractTotalGas } from 'viem/op-stack'
 *
 * const client = createPublicClient({
 *   chain: optimism,
 *   transport: http(),
 * })
 * const totalGas = await estimateContractTotalGas(client, {
 *   address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
 *   abi: parseAbi(['function mint() public']),
 *   functionName: 'mint',
 *   account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
 * })
 */
export declare function estimateContractTotalGas<const abi extends Abi | readonly unknown[], functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>, args extends ContractFunctionArgs<abi, 'pure' | 'view', functionName>, chain extends Chain | undefined, account extends Account | undefined = undefined, chainOverride extends Chain | undefined = undefined>(client: Client<Transport, chain, account>, parameters: EstimateContractTotalGasParameters<abi, functionName, args, chain, account, chainOverride>): Promise<EstimateContractTotalGasReturnType>;
//# sourceMappingURL=estimateContractTotalGas.d.ts.map