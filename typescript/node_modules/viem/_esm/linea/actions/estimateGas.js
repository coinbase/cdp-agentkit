import { parseAccount } from '../../accounts/utils/parseAccount.js';
import { AccountNotFoundError } from '../../errors/account.js';
import { numberToHex } from '../../utils/encoding/toHex.js';
import { getCallError } from '../../utils/errors/getCallError.js';
import { extract } from '../../utils/formatters/extract.js';
import { formatTransactionRequest } from '../../utils/formatters/transactionRequest.js';
import { assertRequest, } from '../../utils/transaction/assertRequest.js';
/**
 * Estimates the gas and fees per gas necessary to complete a transaction without submitting it to the network.
 *
 * @param client - Client to use
 * @param parameters - {@link EstimateGasParameters}
 * @returns A gas estimate and fees per gas (in wei). {@link EstimateGasReturnType}
 *
 * @example
 * import { createPublicClient, http, parseEther } from 'viem'
 * import { linea } from 'viem/chains'
 * import { estimateGas } from 'viem/linea'
 *
 * const client = createPublicClient({
 *   chain: linea,
 *   transport: http(),
 * })
 * const gasEstimate = await estimateGas(client, {
 *   account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
 *   to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
 *   value: 0n,
 * })
 */
export async function estimateGas(client, args) {
    const { account: account_ = client.account } = args;
    if (!account_)
        throw new AccountNotFoundError();
    const account = parseAccount(account_);
    try {
        const { accessList, blockNumber, blockTag, data, gas, gasPrice, maxFeePerGas, maxPriorityFeePerGas, nonce, to, value, ...rest } = args;
        const blockNumberHex = blockNumber ? numberToHex(blockNumber) : undefined;
        const block = blockNumberHex || blockTag;
        assertRequest(args);
        const chainFormat = client.chain?.formatters?.transactionRequest?.format;
        const format = chainFormat || formatTransactionRequest;
        const request = format({
            // Pick out extra data that might exist on the chain's transaction request type.
            ...extract(rest, { format: chainFormat }),
            from: account?.address,
            accessList,
            data,
            gas,
            gasPrice,
            maxFeePerGas,
            maxPriorityFeePerGas,
            nonce,
            to,
            value,
        });
        const { baseFeePerGas, gasLimit, priorityFeePerGas } = await client.request({
            method: 'linea_estimateGas',
            params: block ? [request, block] : [request],
        });
        return {
            baseFeePerGas: BigInt(baseFeePerGas),
            gasLimit: BigInt(gasLimit),
            priorityFeePerGas: BigInt(priorityFeePerGas),
        };
    }
    catch (err) {
        throw getCallError(err, {
            ...args,
            account,
            chain: client.chain,
        });
    }
}
//# sourceMappingURL=estimateGas.js.map