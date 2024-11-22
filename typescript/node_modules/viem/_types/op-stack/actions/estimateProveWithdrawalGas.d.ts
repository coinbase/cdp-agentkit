import type { Address } from 'abitype';
import { type EstimateContractGasErrorType } from '../../actions/public/estimateContractGas.js';
import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import type { ErrorType } from '../../errors/utils.js';
import type { Account, GetAccountParameter } from '../../types/account.js';
import type { Chain, DeriveChain, GetChainParameter } from '../../types/chain.js';
import type { Hex } from '../../types/misc.js';
import type { UnionEvaluate, UnionOmit } from '../../types/utils.js';
import type { FormattedTransactionRequest } from '../../utils/formatters/transactionRequest.js';
import type { GetContractAddressParameter } from '../types/contract.js';
export type EstimateProveWithdrawalGasParameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined, chainOverride extends Chain | undefined = Chain | undefined, _derivedChain extends Chain | undefined = DeriveChain<chain, chainOverride>> = UnionEvaluate<UnionOmit<FormattedTransactionRequest<_derivedChain>, 'accessList' | 'data' | 'from' | 'gas' | 'gasPrice' | 'to' | 'type' | 'value'>> & GetAccountParameter<account, Account | Address> & GetChainParameter<chain, chainOverride> & GetContractAddressParameter<_derivedChain, 'portal'> & {
    /** Gas limit for transaction execution on the L2. */
    gas?: bigint | undefined;
    l2OutputIndex: bigint;
    outputRootProof: {
        version: Hex;
        stateRoot: Hex;
        messagePasserStorageRoot: Hex;
        latestBlockhash: Hex;
    };
    withdrawalProof: readonly Hex[];
    withdrawal: {
        data: Hex;
        gasLimit: bigint;
        nonce: bigint;
        sender: Address;
        target: Address;
        value: bigint;
    };
};
export type EstimateProveWithdrawalGasReturnType = bigint;
export type EstimateProveWithdrawalGasErrorType = EstimateContractGasErrorType | ErrorType;
/**
 * Estimates gas required to prove a withdrawal that occurred on an L2.
 *
 * - Docs: https://viem.sh/op-stack/actions/estimateProveWithdrawalGas
 *
 * @param client - Client to use
 * @param parameters - {@link EstimateProveWithdrawalGasParameters}
 * @returns Estimated gas. {@link EstimateProveWithdrawalGasReturnType}
 *
 * @example
 * import { createPublicClient, http, parseEther } from 'viem'
 * import { base, mainnet } from 'viem/chains'
 * import { estimateProveWithdrawalGas } from 'viem/op-stack'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 *
 * const gas = await estimateProveWithdrawalGas(client, {
 *   account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
 *   l2OutputIndex: 4529n,
 *   outputRootProof: { ... },
 *   targetChain: optimism,
 *   withdrawalProof: [ ... ],
 *   withdrawal: { ... },
 * })
 */
export declare function estimateProveWithdrawalGas<chain extends Chain | undefined, account extends Account | undefined, chainOverride extends Chain | undefined = undefined>(client: Client<Transport, chain, account>, parameters: EstimateProveWithdrawalGasParameters<chain, account, chainOverride>): Promise<bigint>;
//# sourceMappingURL=estimateProveWithdrawalGas.d.ts.map