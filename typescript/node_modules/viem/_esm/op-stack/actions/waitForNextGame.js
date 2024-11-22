import { poll } from '../../utils/poll.js';
import { GameNotFoundError } from '../errors/withdrawal.js';
import { getGame, } from './getGame.js';
import { getTimeToNextGame, } from './getTimeToNextGame.js';
/**
 * Waits for the next dispute game (after the provided block number) to be submitted.
 *
 * - Docs: https://viem.sh/op-stack/actions/waitForNextGame
 *
 * @param client - Client to use
 * @param parameters - {@link WaitForNextGameParameters}
 * @returns The L2 transaction hash. {@link WaitForNextGameReturnType}
 *
 * @example
 * import { createPublicClient, http } from 'viem'
 * import { getBlockNumber } from 'viem/actions'
 * import { mainnet, optimism } from 'viem/chains'
 * import { waitForNextGame } from 'viem/op-stack'
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
 * const l2BlockNumber = await getBlockNumber(publicClientL2)
 * await waitForNextGame(publicClientL1, {
 *   l2BlockNumber,
 *   targetChain: optimism
 * })
 */
export async function waitForNextGame(client, parameters) {
    const { pollingInterval = client.pollingInterval } = parameters;
    const { seconds } = await getTimeToNextGame(client, parameters);
    return new Promise((resolve, reject) => {
        poll(async ({ unpoll }) => {
            try {
                const game = await getGame(client, {
                    ...parameters,
                    strategy: 'random',
                });
                unpoll();
                resolve(game);
            }
            catch (e) {
                const error = e;
                if (!(error instanceof GameNotFoundError)) {
                    unpoll();
                    reject(e);
                }
            }
        }, {
            interval: pollingInterval,
            initialWaitTime: async () => seconds * 1000,
        });
    });
}
//# sourceMappingURL=waitForNextGame.js.map