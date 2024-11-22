/**
 * Sets the backend RPC URL.
 *
 * - Docs: https://viem.sh/docs/actions/test/setRpcUrl
 *
 * @param client - Client to use
 * @param jsonRpcUrl – RPC URL
 *
 * @example
 * import { createTestClient, http } from 'viem'
 * import { foundry } from 'viem/chains'
 * import { setRpcUrl } from 'viem/test'
 *
 * const client = createTestClient({
 *   mode: 'anvil',
 *   chain: 'foundry',
 *   transport: http(),
 * })
 * await setRpcUrl(client, 'https://eth-mainnet.g.alchemy.com/v2')
 */
export async function setRpcUrl(client, jsonRpcUrl) {
    await client.request({
        method: `${client.mode}_setRpcUrl`,
        params: [jsonRpcUrl],
    });
}
//# sourceMappingURL=setRpcUrl.js.map