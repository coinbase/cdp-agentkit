import { readContract, } from '../../actions/public/readContract.js';
import { prepareTransactionRequest, } from '../../actions/wallet/prepareTransactionRequest.js';
import { getChainContractAddress } from '../../utils/chain/getChainContractAddress.js';
import { assertRequest, } from '../../utils/transaction/assertRequest.js';
import { serializeTransaction, } from '../../utils/transaction/serializeTransaction.js';
import { gasPriceOracleAbi } from '../abis.js';
import { contracts } from '../contracts.js';
/**
 * Estimates the L1 data gas required to execute an L2 transaction.
 *
 * @param client - Client to use
 * @param parameters - {@link EstimateL1GasParameters}
 * @returns The gas estimate. {@link EstimateL1GasReturnType}
 *
 * @example
 * import { createPublicClient, http, parseEther } from 'viem'
 * import { optimism } from 'viem/chains'
 * import { estimateL1Gas } from 'viem/chains/optimism'
 *
 * const client = createPublicClient({
 *   chain: optimism,
 *   transport: http(),
 * })
 * const l1Gas = await estimateL1Gas(client, {
 *   account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
 *   to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
 *   value: parseEther('1'),
 * })
 */
export async function estimateL1Gas(client, args) {
    const { chain = client.chain, gasPriceOracleAddress: gasPriceOracleAddress_, } = args;
    const gasPriceOracleAddress = (() => {
        if (gasPriceOracleAddress_)
            return gasPriceOracleAddress_;
        if (chain)
            return getChainContractAddress({
                chain,
                contract: 'gasPriceOracle',
            });
        return contracts.gasPriceOracle.address;
    })();
    // Populate transaction with required fields to accurately estimate gas.
    const request = await prepareTransactionRequest(client, args);
    assertRequest(request);
    const transaction = serializeTransaction({
        ...request,
        type: 'eip1559',
    });
    return readContract(client, {
        abi: gasPriceOracleAbi,
        address: gasPriceOracleAddress,
        functionName: 'getL1GasUsed',
        args: [transaction],
    });
}
//# sourceMappingURL=estimateL1Gas.js.map