import { GameNotFoundError, } from '../errors/withdrawal.js';
import { getGames } from './getGames.js';
/**
 * Retrieves a valid dispute game on an L2 that occurred after a provided L2 block number.
 *
 * - Docs: https://viem.sh/op-stack/actions/getGame
 *
 * @param client - Client to use
 * @param parameters - {@link GetGameParameters}
 * @returns A valid dispute game. {@link GetGameReturnType}
 *
 * @example
 * import { createPublicClient, http } from 'viem'
 * import { mainnet, optimism } from 'viem/chains'
 * import { getGame } from 'viem/op-stack'
 *
 * const publicClientL1 = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 *
 * const game = await getGame(publicClientL1, {
 *   l2BlockNumber: 69420n,
 *   targetChain: optimism
 * })
 */
export async function getGame(client, parameters) {
    const { l2BlockNumber, strategy = 'latest' } = parameters;
    const latestGames = await getGames(client, parameters);
    const games = latestGames.filter((game) => game.l2BlockNumber > l2BlockNumber);
    const game = (() => {
        if (strategy === 'random')
            return games[Math.floor(Math.random() * games.length)];
        return games[0];
    })();
    if (!game)
        throw new GameNotFoundError();
    return game;
}
//# sourceMappingURL=getGame.js.map