/**
 * Returns a summary of all the transactions currently pending for inclusion in the next block(s), as well as the ones that are being scheduled for future execution only.
 *
 * - Docs: https://viem.sh/docs/actions/test/inspectTxpool
 *
 * @param client - Client to use
 * @returns Transaction pool inspection data. {@link InspectTxpoolReturnType}
 *
 * @example
 * import { createTestClient, http } from 'viem'
 * import { foundry } from 'viem/chains'
 * import { inspectTxpool } from 'viem/test'
 *
 * const client = createTestClient({
 *   mode: 'anvil',
 *   chain: 'foundry',
 *   transport: http(),
 * })
 * const data = await inspectTxpool(client)
 */
export async function inspectTxpool(client) {
    return await client.request({
        method: 'txpool_inspect',
    });
}
//# sourceMappingURL=inspectTxpool.js.map