import { getGames } from './getGames.js';
/**
 * Returns the time until the next L2 dispute game (after the provided block number) is submitted.
 * Used for the [Withdrawal](/op-stack/guides/withdrawals) flow.
 *
 * - Docs: https://viem.sh/op-stack/actions/getTimeToNextGame
 *
 * @param client - Client to use
 * @param parameters - {@link GetTimeToNextGameParameters}
 * @returns The L2 transaction hash. {@link GetTimeToNextGameReturnType}
 *
 * @example
 * import { createPublicClient, http } from 'viem'
 * import { getBlockNumber } from 'viem/actions'
 * import { mainnet, optimism } from 'viem/chains'
 * import { getTimeToNextGame } from 'viem/op-stack'
 *
 * const publicClientL1 = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 *
 * const { seconds } = await getTimeToNextGame(publicClientL1, {
 *   l2BlockNumber: 113405763n,
 *   targetChain: optimism
 * })
 */
export async function getTimeToNextGame(client, parameters) {
    const { intervalBuffer = 1.1, l2BlockNumber } = parameters;
    const games = await getGames(client, {
        ...parameters,
        l2BlockNumber: undefined,
        limit: 10,
    });
    const deltas = games
        .map(({ l2BlockNumber, timestamp }, index) => {
        return index === games.length - 1
            ? null
            : [
                games[index + 1].timestamp - timestamp,
                games[index + 1].l2BlockNumber - l2BlockNumber,
            ];
    })
        .filter(Boolean);
    const interval = Math.ceil(deltas.reduce((a, [b]) => Number(a) - Number(b), 0) / deltas.length);
    const blockInterval = Math.ceil(deltas.reduce((a, [_, b]) => Number(a) - Number(b), 0) / deltas.length);
    const latestGame = games[0];
    const latestGameTimestamp = Number(latestGame.timestamp) * 1000;
    const intervalWithBuffer = Math.ceil(interval * intervalBuffer);
    const now = Date.now();
    const seconds = (() => {
        // If the current timestamp is lesser than the latest dispute game timestamp,
        // then we assume that the dispute game has already been submitted.
        if (now < latestGameTimestamp)
            return 0;
        // If the latest dispute game block is newer than the provided dispute game block number,
        // then we assume that the dispute game has already been submitted.
        if (latestGame.l2BlockNumber > l2BlockNumber)
            return 0;
        const elapsedBlocks = Number(l2BlockNumber - latestGame.l2BlockNumber);
        const elapsed = Math.ceil((now - latestGameTimestamp) / 1000);
        const secondsToNextOutput = intervalWithBuffer - (elapsed % intervalWithBuffer);
        return elapsedBlocks < blockInterval
            ? secondsToNextOutput
            : Math.floor(elapsedBlocks / Number(blockInterval)) * intervalWithBuffer +
                secondsToNextOutput;
    })();
    const timestamp = seconds > 0 ? now + seconds * 1000 : undefined;
    return { interval, seconds, timestamp };
}
//# sourceMappingURL=getTimeToNextGame.js.map