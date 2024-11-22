import { type MulticallErrorType } from '../../actions/public/multicall.js';
import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import type { ErrorType } from '../../errors/utils.js';
import type { Account } from '../../types/account.js';
import type { Chain, DeriveChain, GetChainParameter } from '../../types/chain.js';
import type { Hash } from '../../types/misc.js';
import type { GetContractAddressParameter } from '../types/contract.js';
export type GetTimeToFinalizeParameters<chain extends Chain | undefined = Chain | undefined, chainOverride extends Chain | undefined = Chain | undefined, _derivedChain extends Chain | undefined = DeriveChain<chain, chainOverride>> = GetChainParameter<chain, chainOverride> & GetContractAddressParameter<_derivedChain, 'l2OutputOracle' | 'portal'> & {
    withdrawalHash: Hash;
};
export type GetTimeToFinalizeReturnType = {
    /** The finalization period (in seconds). */
    period: number;
    /** Seconds until the withdrawal can be finalized. */
    seconds: number;
    /** Timestamp of when the withdrawal can be finalized. */
    timestamp: number;
};
export type GetTimeToFinalizeErrorType = MulticallErrorType | ErrorType;
/**
 * Returns the time until the withdrawal transaction can be finalized. Used for the [Withdrawal](/op-stack/guides/withdrawals) flow.
 *
 * - Docs: https://viem.sh/op-stack/actions/getTimeToFinalize
 *
 * @param client - Client to use
 * @param parameters - {@link GetTimeToFinalizeParameters}
 * @returns Time until finalize. {@link GetTimeToFinalizeReturnType}
 *
 * @example
 * import { createPublicClient, http } from 'viem'
 * import { getBlockNumber } from 'viem/actions'
 * import { mainnet, optimism } from 'viem/chains'
 * import { getTimeToFinalize } from 'viem/op-stack'
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
 * const receipt = await publicClientL2.getTransactionReceipt({
 *   hash: '0x9a2f4283636ddeb9ac32382961b22c177c9e86dd3b283735c154f897b1a7ff4a',
 * })
 *
 * const [withdrawal] = getWithdrawals(receipt)
 *
 * const { seconds } = await getTimeToFinalize(publicClientL1, {
 *   withdrawalHash: withdrawal.withdrawalHash,
 *   targetChain: optimism
 * })
 */
export declare function getTimeToFinalize<chain extends Chain | undefined, account extends Account | undefined, chainOverride extends Chain | undefined = undefined>(client: Client<Transport, chain, account>, parameters: GetTimeToFinalizeParameters<chain, chainOverride>): Promise<GetTimeToFinalizeReturnType>;
//# sourceMappingURL=getTimeToFinalize.d.ts.map