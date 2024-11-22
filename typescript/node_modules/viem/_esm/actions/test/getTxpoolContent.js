/**
 * Returns the details of all transactions currently pending for inclusion in the next block(s), as well as the ones that are being scheduled for future execution only.
 *
 * - Docs: https://viem.sh/docs/actions/test/getTxpoolContent
 *
 * @param client - Client to use
 * @returns Transaction pool content. {@link GetTxpoolContentReturnType}
 *
 * @example
 * import { createTestClient, http } from 'viem'
 * import { foundry } from 'viem/chains'
 * import { getTxpoolContent } from 'viem/test'
 *
 * const client = createTestClient({
 *   mode: 'anvil',
 *   chain: 'foundry',
 *   transport: http(),
 * })
 * const content = await getTxpoolContent(client)
 */
export async function getTxpoolContent(client) {
    return await client.request({
        method: 'txpool_content',
    });
}
//# sourceMappingURL=getTxpoolContent.js.map