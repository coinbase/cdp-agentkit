import { estimateGas, } from '../../actions/public/estimateGas.js';
import { prepareTransactionRequest, } from '../../actions/wallet/prepareTransactionRequest.js';
import { estimateL1Gas, } from './estimateL1Gas.js';
/**
 * Estimates the amount of L1 data gas + L2 gas required to execute an L2 transaction.
 *
 * @param client - Client to use
 * @param parameters - {@link EstimateTotalGasParameters}
 * @returns The gas estimate. {@link EstimateTotalGasReturnType}
 *
 * @example
 * import { createPublicClient, http, parseEther } from 'viem'
 * import { optimism } from 'viem/chains'
 * import { estimateTotalGas } from 'viem/chains/optimism'
 *
 * const client = createPublicClient({
 *   chain: optimism,
 *   transport: http(),
 * })
 * const totalGas = await estimateTotalGas(client, {
 *   account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
 *   to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
 *   value: parseEther('1'),
 * })
 */
export async function estimateTotalGas(client, args) {
    // Populate transaction with required fields to accurately estimate gas.
    const request = await prepareTransactionRequest(client, args);
    const [l1Gas, l2Gas] = await Promise.all([
        estimateL1Gas(client, request),
        estimateGas(client, request),
    ]);
    return l1Gas + l2Gas;
}
//# sourceMappingURL=estimateTotalGas.js.map