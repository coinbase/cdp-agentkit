import { type ReadContractErrorType } from '../../actions/public/readContract.js';
import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import type { ErrorType } from '../../errors/utils.js';
import type { Account } from '../../types/account.js';
import type { Chain, DeriveChain, GetChainParameter } from '../../types/chain.js';
import type { TransactionReceipt } from '../../types/transaction.js';
import type { OneOf } from '../../types/utils.js';
import { type ReceiptContainsNoWithdrawalsErrorType } from '../errors/withdrawal.js';
import type { GetContractAddressParameter } from '../types/contract.js';
import { type GetWithdrawalsErrorType } from '../utils/getWithdrawals.js';
import { type GetL2OutputErrorType } from './getL2Output.js';
import { type GetTimeToFinalizeErrorType } from './getTimeToFinalize.js';
export type GetWithdrawalStatusParameters<chain extends Chain | undefined = Chain | undefined, chainOverride extends Chain | undefined = Chain | undefined, _derivedChain extends Chain | undefined = DeriveChain<chain, chainOverride>> = GetChainParameter<chain, chainOverride> & OneOf<GetContractAddressParameter<_derivedChain, 'l2OutputOracle' | 'portal'> | GetContractAddressParameter<_derivedChain, 'disputeGameFactory' | 'portal'>> & {
    /**
     * Limit of games to extract to check withdrawal status.
     * @default 100
     */
    gameLimit?: number;
    /**
     * The relative index of the withdrawal in the transaction receipt logs.
     * @default 0
     */
    logIndex?: number;
    receipt: TransactionReceipt;
};
export type GetWithdrawalStatusReturnType = 'waiting-to-prove' | 'ready-to-prove' | 'waiting-to-finalize' | 'ready-to-finalize' | 'finalized';
export type GetWithdrawalStatusErrorType = GetL2OutputErrorType | GetTimeToFinalizeErrorType | GetWithdrawalsErrorType | ReadContractErrorType | ReceiptContainsNoWithdrawalsErrorType | ErrorType;
/**
 * Returns the current status of a withdrawal. Used for the [Withdrawal](/op-stack/guides/withdrawals) flow.
 *
 * - Docs: https://viem.sh/op-stack/actions/getWithdrawalStatus
 *
 * @param client - Client to use
 * @param parameters - {@link GetWithdrawalStatusParameters}
 * @returns Status of the withdrawal. {@link GetWithdrawalStatusReturnType}
 *
 * @example
 * import { createPublicClient, http } from 'viem'
 * import { getBlockNumber } from 'viem/actions'
 * import { mainnet, optimism } from 'viem/chains'
 * import { getWithdrawalStatus } from 'viem/op-stack'
 *
 * const publicClientL1 = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const publicClientL2 = createPublicClient({
 *   chain: optimism,
 *   transport: http(),
 * })
 *
 * const receipt = await publicClientL2.getTransactionReceipt({ hash: '0x...' })
 * const status = await getWithdrawalStatus(publicClientL1, {
 *   receipt,
 *   targetChain: optimism
 * })
 */
export declare function getWithdrawalStatus<chain extends Chain | undefined, account extends Account | undefined, chainOverride extends Chain | undefined = undefined>(client: Client<Transport, chain, account>, parameters: GetWithdrawalStatusParameters<chain, chainOverride>): Promise<GetWithdrawalStatusReturnType>;
//# sourceMappingURL=getWithdrawalStatus.d.ts.map