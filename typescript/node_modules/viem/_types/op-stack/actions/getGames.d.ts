import { type ReadContractErrorType } from '../../actions/public/readContract.js';
import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import type { ErrorType } from '../../errors/utils.js';
import type { Account } from '../../types/account.js';
import type { Chain, DeriveChain, GetChainParameter } from '../../types/chain.js';
import type { GetContractAddressParameter } from '../types/contract.js';
import type { Game } from '../types/withdrawal.js';
export type GetGamesParameters<chain extends Chain | undefined = Chain | undefined, chainOverride extends Chain | undefined = Chain | undefined, _derivedChain extends Chain | undefined = DeriveChain<chain, chainOverride>> = GetChainParameter<chain, chainOverride> & GetContractAddressParameter<_derivedChain, 'portal' | 'disputeGameFactory'> & {
    /**
     * Filter by minimum block number of the dispute games.
     */
    l2BlockNumber?: bigint | undefined;
    /**
     * Limit of games to extract.
     * @default 100
     */
    limit?: number | undefined;
};
export type GetGamesReturnType = (Game & {
    l2BlockNumber: bigint;
})[];
export type GetGamesErrorType = ReadContractErrorType | ErrorType;
/**
 * Retrieves dispute games for an L2.
 *
 * - Docs: https://viem.sh/op-stack/actions/getGame
 *
 * @param client - Client to use
 * @param parameters - {@link GetGameParameters}
 * @returns Dispute games. {@link GetGameReturnType}
 *
 * @example
 * import { createPublicClient, http } from 'viem'
 * import { mainnet, optimism } from 'viem/chains'
 * import { getGames } from 'viem/op-stack'
 *
 * const publicClientL1 = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 *
 * const games = await getGames(publicClientL1, {
 *   targetChain: optimism
 * })
 */
export declare function getGames<chain extends Chain | undefined, account extends Account | undefined, chainOverride extends Chain | undefined = undefined>(client: Client<Transport, chain, account>, parameters: GetGamesParameters<chain, chainOverride>): Promise<GetGamesReturnType>;
//# sourceMappingURL=getGames.d.ts.map