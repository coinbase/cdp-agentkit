import { numberToHex, } from '../../utils/encoding/toHex.js';
import { formatFeeHistory, } from '../../utils/formatters/feeHistory.js';
/**
 * Returns a collection of historical gas information.
 *
 * - Docs: https://viem.sh/docs/actions/public/getFeeHistory
 * - JSON-RPC Methods: [`eth_feeHistory`](https://docs.alchemy.com/reference/eth-feehistory)
 *
 * @param client - Client to use
 * @param parameters - {@link GetFeeHistoryParameters}
 * @returns The gas estimate (in wei). {@link GetFeeHistoryReturnType}
 *
 * @example
 * import { createPublicClient, http } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { getFeeHistory } from 'viem/public'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const feeHistory = await getFeeHistory(client, {
 *   blockCount: 4,
 *   rewardPercentiles: [25, 75],
 * })
 */
export async function getFeeHistory(client, { blockCount, blockNumber, blockTag = 'latest', rewardPercentiles, }) {
    const blockNumberHex = blockNumber ? numberToHex(blockNumber) : undefined;
    const feeHistory = await client.request({
        method: 'eth_feeHistory',
        params: [
            numberToHex(blockCount),
            blockNumberHex || blockTag,
            rewardPercentiles,
        ],
    }, { dedupe: Boolean(blockNumberHex) });
    return formatFeeHistory(feeHistory);
}
//# sourceMappingURL=getFeeHistory.js.map