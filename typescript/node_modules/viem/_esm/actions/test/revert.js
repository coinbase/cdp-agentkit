/**
 * Revert the state of the blockchain at the current block.
 *
 * - Docs: https://viem.sh/docs/actions/test/revert
 *
 * @param client - Client to use
 * @param parameters – {@link RevertParameters}
 *
 * @example
 * import { createTestClient, http } from 'viem'
 * import { foundry } from 'viem/chains'
 * import { revert } from 'viem/test'
 *
 * const client = createTestClient({
 *   mode: 'anvil',
 *   chain: 'foundry',
 *   transport: http(),
 * })
 * await revert(client, { id: '0x…' })
 */
export async function revert(client, { id }) {
    await client.request({
        method: 'evm_revert',
        params: [id],
    });
}
//# sourceMappingURL=revert.js.map