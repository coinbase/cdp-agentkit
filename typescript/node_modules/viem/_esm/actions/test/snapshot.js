/**
 * Snapshot the state of the blockchain at the current block.
 *
 * - Docs: https://viem.sh/docs/actions/test/snapshot
 *
 * @param client - Client to use
 *
 * @example
 * import { createTestClient, http } from 'viem'
 * import { foundry } from 'viem/chains'
 * import { snapshot } from 'viem/test'
 *
 * const client = createTestClient({
 *   mode: 'anvil',
 *   chain: 'foundry',
 *   transport: http(),
 * })
 * await snapshot(client)
 */
export async function snapshot(client) {
    return await client.request({
        method: 'evm_snapshot',
    });
}
//# sourceMappingURL=snapshot.js.map