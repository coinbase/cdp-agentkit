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
import { type EstimateL1FeeErrorType, type EstimateL1FeeParameters } from './estimateL1Fee.js';
export type EstimateContractL1FeeParameters<abi extends Abi | readonly unknown[] = Abi, functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'> = ContractFunctionName<abi, 'nonpayable' | 'payable'>, args extends ContractFunctionArgs<abi, 'nonpayable' | 'payable', functionName> = ContractFunctionArgs<abi, 'nonpayable' | 'payable', functionName>, chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = undefined, chainOverride extends Chain | undefined = Chain | undefined> = ContractFunctionParameters<abi, 'nonpayable' | 'payable', functionName, args> & UnionOmit<EstimateL1FeeParameters<chain, account, chainOverride>, 'data' | 'to' | 'value'> & GetValue<abi, functionName, EstimateL1FeeParameters<chain, account, chainOverride> extends EstimateL1FeeParameters ? EstimateL1FeeParameters<chain, account, chainOverride>['value'] : EstimateL1FeeParameters['value']>;
export type EstimateContractL1FeeReturnType = bigint;
export type EstimateContractL1FeeErrorType = GetContractErrorReturnType<EncodeFunctionDataErrorType | EstimateL1FeeErrorType | ParseAccountErrorType>;
/**
 * Estimates the L1 data fee required to execute an L2 contract write.
 *
 * @param client - Client to use
 * @param parameters - {@link EstimateContractL1FeeParameters}
 * @returns The gas estimate (in wei). {@link EstimateContractL1FeeReturnType}
 *
 * @example
 * import { createPublicClient, http, parseAbi } from 'viem'
 * import { optimism } from 'viem/chains'
 * import { estimateContractL1Fee } from 'viem/op-stack'
 *
 * const client = createPublicClient({
 *   chain: optimism,
 *   transport: http(),
 * })
 * const l1Fee = await estimateContractL1Fee(client, {
 *   address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
 *   abi: parseAbi(['function mint() public']),
 *   functionName: 'mint',
 *   account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
 * })
 */
export declare function estimateContractL1Fee<const abi extends Abi | readonly unknown[], functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>, args extends ContractFunctionArgs<abi, 'pure' | 'view', functionName>, chain extends Chain | undefined, account extends Account | undefined = undefined, chainOverride extends Chain | undefined = undefined>(client: Client<Transport, chain, account>, parameters: EstimateContractL1FeeParameters<abi, functionName, args, chain, account, chainOverride>): Promise<EstimateContractL1FeeReturnType>;
//# sourceMappingURL=estimateContractL1Fee.d.ts.map