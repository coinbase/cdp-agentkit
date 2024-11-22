import { TransactionNotFoundError } from '../../errors/transaction.js';
import { numberToHex, } from '../../utils/encoding/toHex.js';
import { formatTransaction, } from '../../utils/formatters/transaction.js';
/**
 * Returns information about a [Transaction](https://viem.sh/docs/glossary/terms#transaction) given a hash or block identifier.
 *
 * - Docs: https://viem.sh/docs/actions/public/getTransaction
 * - Example: https://stackblitz.com/github/wevm/viem/tree/main/examples/transactions_fetching-transactions
 * - JSON-RPC Methods: [`eth_getTransactionByHash`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getTransactionByHash)
 *
 * @param client - Client to use
 * @param parameters - {@link GetTransactionParameters}
 * @returns The transaction information. {@link GetTransactionReturnType}
 *
 * @example
 * import { createPublicClient, http } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { getTransaction } from 'viem/public'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const transaction = await getTransaction(client, {
 *   hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
 * })
 */
export async function getTransaction(client, { blockHash, blockNumber, blockTag: blockTag_, hash, index, }) {
    const blockTag = blockTag_ || 'latest';
    const blockNumberHex = blockNumber !== undefined ? numberToHex(blockNumber) : undefined;
    let transaction = null;
    if (hash) {
        transaction = await client.request({
            method: 'eth_getTransactionByHash',
            params: [hash],
        }, { dedupe: true });
    }
    else if (blockHash) {
        transaction = await client.request({
            method: 'eth_getTransactionByBlockHashAndIndex',
            params: [blockHash, numberToHex(index)],
        }, { dedupe: true });
    }
    else if (blockNumberHex || blockTag) {
        transaction = await client.request({
            method: 'eth_getTransactionByBlockNumberAndIndex',
            params: [blockNumberHex || blockTag, numberToHex(index)],
        }, { dedupe: Boolean(blockNumberHex) });
    }
    if (!transaction)
        throw new TransactionNotFoundError({
            blockHash,
            blockNumber,
            blockTag,
            hash,
            index,
        });
    const format = client.chain?.formatters?.transaction?.format || formatTransaction;
    return format(transaction);
}
//# sourceMappingURL=getTransaction.js.map