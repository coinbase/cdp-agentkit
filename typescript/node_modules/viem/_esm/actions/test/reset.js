/**
 * Resets fork back to its original state.
 *
 * - Docs: https://viem.sh/docs/actions/test/reset
 *
 * @param client - Client to use
 * @param parameters – {@link ResetParameters}
 *
 * @example
 * import { createTestClient, http } from 'viem'
 * import { foundry } from 'viem/chains'
 * import { reset } from 'viem/test'
 *
 * const client = createTestClient({
 *   mode: 'anvil',
 *   chain: 'foundry',
 *   transport: http(),
 * })
 * await reset(client, { blockNumber: 69420n })
 */
export async function reset(client, { blockNumber, jsonRpcUrl } = {}) {
    await client.request({
        method: `${client.mode}_reset`,
        params: [{ forking: { blockNumber: Number(blockNumber), jsonRpcUrl } }],
    });
}
//# sourceMappingURL=reset.js.map