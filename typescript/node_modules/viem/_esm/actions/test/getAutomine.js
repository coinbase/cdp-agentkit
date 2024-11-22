/**
 * Returns the automatic mining status of the node.
 *
 * - Docs: https://viem.sh/docs/actions/test/getAutomine
 *
 * @param client - Client to use
 * @returns Whether or not the node is auto mining. {@link GetAutomineReturnType}
 *
 * @example
 * import { createTestClient, http } from 'viem'
 * import { foundry } from 'viem/chains'
 * import { getAutomine } from 'viem/test'
 *
 * const client = createTestClient({
 *   mode: 'anvil',
 *   chain: 'foundry',
 *   transport: http(),
 * })
 * const isAutomining = await getAutomine(client)
 */
export async function getAutomine(client) {
    if (client.mode === 'ganache')
        return await client.request({
            method: 'eth_mining',
        });
    return await client.request({
        method: `${client.mode}_getAutomine`,
    });
}
//# sourceMappingURL=getAutomine.js.map