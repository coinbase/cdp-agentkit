/**
 * Sets the automatic mining interval (in seconds) of blocks. Setting the interval to 0 will disable automatic mining.
 *
 * - Docs: https://viem.sh/docs/actions/test/setIntervalMining
 *
 * @param client - Client to use
 * @param parameters – {@link SetIntervalMiningParameters}
 *
 * @example
 * import { createTestClient, http } from 'viem'
 * import { foundry } from 'viem/chains'
 * import { setIntervalMining } from 'viem/test'
 *
 * const client = createTestClient({
 *   mode: 'anvil',
 *   chain: 'foundry',
 *   transport: http(),
 * })
 * await setIntervalMining(client, { interval: 5 })
 */
export async function setIntervalMining(client, { interval }) {
    const interval_ = (() => {
        if (client.mode === 'hardhat')
            return interval * 1000;
        return interval;
    })();
    await client.request({
        method: 'evm_setIntervalMining',
        params: [interval_],
    });
}
//# sourceMappingURL=setIntervalMining.js.map