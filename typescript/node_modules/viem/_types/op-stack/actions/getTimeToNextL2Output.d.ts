import { type MulticallErrorType } from '../../actions/public/multicall.js';
import { type ReadContractErrorType } from '../../actions/public/readContract.js';
import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import type { ErrorType } from '../../errors/utils.js';
import type { Account } from '../../types/account.js';
import type { Chain, DeriveChain, GetChainParameter } from '../../types/chain.js';
import type { GetContractAddressParameter } from '../types/contract.js';
export type GetTimeToNextL2OutputParameters<chain extends Chain | undefined = Chain | undefined, chainOverride extends Chain | undefined = Chain | undefined, _derivedChain extends Chain | undefined = DeriveChain<chain, chainOverride>> = GetChainParameter<chain, chainOverride> & GetContractAddressParameter<_derivedChain, 'l2OutputOracle'> & {
    /**
     * The buffer to account for discrepancies between non-deterministic time intervals.
     * @default 1.1
     */
    intervalBuffer?: number | undefined;
    l2BlockNumber: bigint;
};
export type GetTimeToNextL2OutputReturnType = {
    /** The interval (in seconds) between L2 outputs. */
    interval: number;
    /**
     * Seconds until the next L2 output.
     * `0` if the next L2 output has already been submitted.
     */
    seconds: number;
    /**
     * Estimated timestamp of the next L2 output.
     * `undefined` if the next L2 output has already been submitted.
     */
    timestamp?: number | undefined;
};
export type GetTimeToNextL2OutputErrorType = MulticallErrorType | ReadContractErrorType | ErrorType;
/**
 * Returns the time until the next L2 output (after the provided block number) is submitted. Used for the [Withdrawal](/op-stack/guides/withdrawals) flow.
 *
 * - Docs: https://viem.sh/op-stack/actions/getTimeToNextL2Output
 *
 * @param client - Client to use
 * @param parameters - {@link GetTimeToNextL2OutputParameters}
 * @returns The L2 transaction hash. {@link GetTimeToNextL2OutputReturnType}
 *
 * @example
 * import { createPublicClient, http } from 'viem'
 * import { getBlockNumber } from 'viem/actions'
 * import { mainnet, optimism } from 'viem/chains'
 * import { getTimeToNextL2Output } from 'viem/op-stack'
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
 * const { seconds } = await getTimeToNextL2Output(publicClientL1, {
 *   targetChain: optimism
 * })
 */
export declare function getTimeToNextL2Output<chain extends Chain | undefined, account extends Account | undefined, chainOverride extends Chain | undefined = undefined>(client: Client<Transport, chain, account>, parameters: GetTimeToNextL2OutputParameters<chain, chainOverride>): Promise<GetTimeToNextL2OutputReturnType>;
//# sourceMappingURL=getTimeToNextL2Output.d.ts.map