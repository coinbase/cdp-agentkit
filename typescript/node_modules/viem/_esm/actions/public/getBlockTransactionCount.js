import { hexToNumber, } from '../../utils/encoding/fromHex.js';
import { numberToHex, } from '../../utils/encoding/toHex.js';
/**
 * Returns the number of Transactions at a block number, hash, or tag.
 *
 * - Docs: https://viem.sh/docs/actions/public/getBlockTransactionCount
 * - JSON-RPC Methods:
 *   - Calls [`eth_getBlockTransactionCountByNumber`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblocktransactioncountbynumber) for `blockNumber` & `blockTag`.
 *   - Calls [`eth_getBlockTransactionCountByHash`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblocktransactioncountbyhash) for `blockHash`.
 *
 * @param client - Client to use
 * @param parameters - {@link GetBlockTransactionCountParameters}
 * @returns The block transaction count. {@link GetBlockTransactionCountReturnType}
 *
 * @example
 * import { createPublicClient, http } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { getBlockTransactionCount } from 'viem/public'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const count = await getBlockTransactionCount(client)
 */
export async function getBlockTransactionCount(client, { blockHash, blockNumber, blockTag = 'latest', } = {}) {
    const blockNumberHex = blockNumber !== undefined ? numberToHex(blockNumber) : undefined;
    let count;
    if (blockHash) {
        count = await client.request({
            method: 'eth_getBlockTransactionCountByHash',
            params: [blockHash],
        }, { dedupe: true });
    }
    else {
        count = await client.request({
            method: 'eth_getBlockTransactionCountByNumber',
            params: [blockNumberHex || blockTag],
        }, { dedupe: Boolean(blockNumberHex) });
    }
    return hexToNumber(count);
}
//# sourceMappingURL=getBlockTransactionCount.js.map