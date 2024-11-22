/**
 * Enables or disables the automatic mining of new blocks with each new transaction submitted to the network.
 *
 * - Docs: https://viem.sh/docs/actions/test/setAutomine
 *
 * @param client - Client to use
 *
 * @example
 * import { createTestClient, http } from 'viem'
 * import { foundry } from 'viem/chains'
 * import { setAutomine } from 'viem/test'
 *
 * const client = createTestClient({
 *   mode: 'anvil',
 *   chain: 'foundry',
 *   transport: http(),
 * })
 * await setAutomine(client)
 */
export async function setAutomine(client, enabled) {
    if (client.mode === 'ganache') {
        if (enabled)
            await client.request({ method: 'miner_start' });
        else
            await client.request({ method: 'miner_stop' });
    }
    else
        await client.request({
            method: 'evm_setAutomine',
            params: [enabled],
        });
}
//# sourceMappingURL=setAutomine.js.map