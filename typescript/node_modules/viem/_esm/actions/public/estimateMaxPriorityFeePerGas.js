import { Eip1559FeesNotSupportedError, } from '../../errors/fee.js';
import { hexToBigInt, } from '../../utils/encoding/fromHex.js';
import { getAction } from '../../utils/getAction.js';
import { getBlock } from './getBlock.js';
import { getGasPrice } from './getGasPrice.js';
/**
 * Returns an estimate for the max priority fee per gas (in wei) for a
 * transaction to be likely included in the next block.
 * Defaults to [`chain.fees.defaultPriorityFee`](/docs/clients/chains#fees-defaultpriorityfee) if set.
 *
 * - Docs: https://viem.sh/docs/actions/public/estimateMaxPriorityFeePerGas
 *
 * @param client - Client to use
 * @returns An estimate (in wei) for the max priority fee per gas. {@link EstimateMaxPriorityFeePerGasReturnType}
 *
 * @example
 * import { createPublicClient, http } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { estimateMaxPriorityFeePerGas } from 'viem/actions'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const maxPriorityFeePerGas = await estimateMaxPriorityFeePerGas(client)
 * // 10000000n
 */
export async function estimateMaxPriorityFeePerGas(client, args) {
    return internal_estimateMaxPriorityFeePerGas(client, args);
}
export async function internal_estimateMaxPriorityFeePerGas(client, args) {
    const { block: block_, chain = client.chain, request } = args || {};
    try {
        const maxPriorityFeePerGas = chain?.fees?.maxPriorityFeePerGas ?? chain?.fees?.defaultPriorityFee;
        if (typeof maxPriorityFeePerGas === 'function') {
            const block = block_ || (await getAction(client, getBlock, 'getBlock')({}));
            const maxPriorityFeePerGas_ = await maxPriorityFeePerGas({
                block,
                client,
                request,
            });
            if (maxPriorityFeePerGas_ === null)
                throw new Error();
            return maxPriorityFeePerGas_;
        }
        if (typeof maxPriorityFeePerGas !== 'undefined')
            return maxPriorityFeePerGas;
        const maxPriorityFeePerGasHex = await client.request({
            method: 'eth_maxPriorityFeePerGas',
        });
        return hexToBigInt(maxPriorityFeePerGasHex);
    }
    catch {
        // If the RPC Provider does not support `eth_maxPriorityFeePerGas`
        // fall back to calculating it manually via `gasPrice - baseFeePerGas`.
        // See: https://github.com/ethereum/pm/issues/328#:~:text=eth_maxPriorityFeePerGas%20after%20London%20will%20effectively%20return%20eth_gasPrice%20%2D%20baseFee
        const [block, gasPrice] = await Promise.all([
            block_
                ? Promise.resolve(block_)
                : getAction(client, getBlock, 'getBlock')({}),
            getAction(client, getGasPrice, 'getGasPrice')({}),
        ]);
        if (typeof block.baseFeePerGas !== 'bigint')
            throw new Eip1559FeesNotSupportedError();
        const maxPriorityFeePerGas = gasPrice - block.baseFeePerGas;
        if (maxPriorityFeePerGas < 0n)
            return 0n;
        return maxPriorityFeePerGas;
    }
}
//# sourceMappingURL=estimateMaxPriorityFeePerGas.js.map