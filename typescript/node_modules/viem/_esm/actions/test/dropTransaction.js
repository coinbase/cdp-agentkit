/**
 * Removes a transaction from the mempool.
 *
 * - Docs: https://viem.sh/docs/actions/test/dropTransaction
 *
 * @param client - Client to use
 * @param parameters - {@link DropTransactionParameters}
 *
 * @example
 * import { createTestClient, http } from 'viem'
 * import { foundry } from 'viem/chains'
 * import { dropTransaction } from 'viem/test'
 *
 * const client = createTestClient({
 *   mode: 'anvil',
 *   chain: 'foundry',
 *   transport: http(),
 * })
 * await dropTransaction(client, {
 *   hash: '0xe58dceb6b20b03965bb678e27d141e151d7d4efc2334c2d6a49b9fac523f7364'
 * })
 */
export async function dropTransaction(client, { hash }) {
    await client.request({
        method: `${client.mode}_dropTransaction`,
        params: [hash],
    });
}
//# sourceMappingURL=dropTransaction.js.map