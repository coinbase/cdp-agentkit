import { hexToNumber } from '../../utils/encoding/fromHex.js';
/**
 * Returns a summary of all the transactions currently pending for inclusion in the next block(s), as well as the ones that are being scheduled for future execution only.
 *
 * - Docs: https://viem.sh/docs/actions/test/getTxpoolStatus
 *
 * @param client - Client to use
 * @returns Transaction pool status. {@link GetTxpoolStatusReturnType}
 *
 * @example
 * import { createTestClient, http } from 'viem'
 * import { foundry } from 'viem/chains'
 * import { getTxpoolStatus } from 'viem/test'
 *
 * const client = createTestClient({
 *   mode: 'anvil',
 *   chain: 'foundry',
 *   transport: http(),
 * })
 * const status = await getTxpoolStatus(client)
 */
export async function getTxpoolStatus(client) {
    const { pending, queued } = await client.request({
        method: 'txpool_status',
    });
    return {
        pending: hexToNumber(pending),
        queued: hexToNumber(queued),
    };
}
//# sourceMappingURL=getTxpoolStatus.js.map