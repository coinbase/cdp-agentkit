import { estimateGas, } from '../../actions/public/estimateGas.js';
import { getGasPrice, } from '../../actions/public/getGasPrice.js';
import { prepareTransactionRequest, } from '../../actions/wallet/prepareTransactionRequest.js';
import { estimateL1Fee, } from './estimateL1Fee.js';
/**
 * Estimates the L1 data fee + L2 fee to execute an L2 transaction.
 *
 * @param client - Client to use
 * @param parameters - {@link EstimateTotalFeeParameters}
 * @returns The fee (in wei). {@link EstimateTotalFeeReturnType}
 *
 * @example
 * import { createPublicClient, http, parseEther } from 'viem'
 * import { optimism } from 'viem/chains'
 * import { estimateTotalFee } from 'viem/chains/optimism'
 *
 * const client = createPublicClient({
 *   chain: optimism,
 *   transport: http(),
 * })
 * const totalGas = await estimateTotalFee(client, {
 *   account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
 *   to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
 *   value: parseEther('1'),
 * })
 */
export async function estimateTotalFee(client, args) {
    // Populate transaction with required fields to accurately estimate gas.
    const request = await prepareTransactionRequest(client, args);
    const [l1Fee, l2Gas, l2GasPrice] = await Promise.all([
        estimateL1Fee(client, request),
        estimateGas(client, request),
        getGasPrice(client),
    ]);
    return l1Fee + l2Gas * l2GasPrice;
}
//# sourceMappingURL=estimateTotalFee.js.map