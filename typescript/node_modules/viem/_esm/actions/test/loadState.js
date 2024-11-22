/**
 * Adds state previously dumped with `dumpState` to the current chain.
 *
 * - Docs: https://viem.sh/docs/actions/test/loadState
 *
 * @param client - Client to use
 * @param parameters - {@link LoadStateParameters}
 *
 * @example
 * import { createTestClient, http } from 'viem'
 * import { foundry } from 'viem/chains'
 * import { loadState } from 'viem/test'
 *
 * const client = createTestClient({
 *   mode: 'anvil',
 *   chain: 'foundry',
 *   transport: http(),
 * })
 * await loadState(client, { state: '0x...' })
 */
export async function loadState(client, { state }) {
    await client.request({
        method: `${client.mode}_loadState`,
        params: [state],
    });
}
//# sourceMappingURL=loadState.js.map