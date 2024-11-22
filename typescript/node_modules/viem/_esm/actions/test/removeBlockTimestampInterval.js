/**
 * Removes [`setBlockTimestampInterval`](https://viem.sh/docs/actions/test/setBlockTimestampInterval) if it exists.
 *
 * - Docs: https://viem.sh/docs/actions/test/removeBlockTimestampInterval
 *
 * @param client - Client to use
 *
 * @example
 * import { createTestClient, http } from 'viem'
 * import { foundry } from 'viem/chains'
 * import { removeBlockTimestampInterval } from 'viem/test'
 *
 * const client = createTestClient({
 *   mode: 'anvil',
 *   chain: 'foundry',
 *   transport: http(),
 * })
 * await removeBlockTimestampInterval(client)
 */
export async function removeBlockTimestampInterval(client) {
    await client.request({
        method: `${client.mode}_removeBlockTimestampInterval`,
    });
}
//# sourceMappingURL=removeBlockTimestampInterval.js.map