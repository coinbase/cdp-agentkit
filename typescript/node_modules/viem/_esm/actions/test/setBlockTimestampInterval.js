/**
 * Similar to [`increaseTime`](https://viem.sh/docs/actions/test/increaseTime), but sets a block timestamp `interval`. The timestamp of future blocks will be computed as `lastBlock_timestamp` + `interval`.
 *
 * - Docs: https://viem.sh/docs/actions/test/setBlockTimestampInterval
 *
 * @param client - Client to use
 * @param parameters – {@link SetBlockTimestampIntervalParameters}
 *
 * @example
 * import { createTestClient, http } from 'viem'
 * import { foundry } from 'viem/chains'
 * import { setBlockTimestampInterval } from 'viem/test'
 *
 * const client = createTestClient({
 *   mode: 'anvil',
 *   chain: 'foundry',
 *   transport: http(),
 * })
 * await setBlockTimestampInterval(client, { interval: 5 })
 */
export async function setBlockTimestampInterval(client, { interval }) {
    const interval_ = (() => {
        if (client.mode === 'hardhat')
            return interval * 1000;
        return interval;
    })();
    await client.request({
        method: `${client.mode}_setBlockTimestampInterval`,
        params: [interval_],
    });
}
//# sourceMappingURL=setBlockTimestampInterval.js.map