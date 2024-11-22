/**
 * Enable or disable logging on the test node network.
 *
 * - Docs: https://viem.sh/docs/actions/test/setLoggingEnabled
 *
 * @param client - Client to use
 *
 * @example
 * import { createTestClient, http } from 'viem'
 * import { foundry } from 'viem/chains'
 * import { setLoggingEnabled } from 'viem/test'
 *
 * const client = createTestClient({
 *   mode: 'anvil',
 *   chain: 'foundry',
 *   transport: http(),
 * })
 * await setLoggingEnabled(client)
 */
export async function setLoggingEnabled(client, enabled) {
    await client.request({
        method: `${client.mode}_setLoggingEnabled`,
        params: [enabled],
    });
}
//# sourceMappingURL=setLoggingEnabled.js.map