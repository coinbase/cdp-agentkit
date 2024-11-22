import { parseAccount } from '../../accounts/utils/parseAccount.js';
import { hexToBigInt } from '../../utils/encoding/fromHex.js';
export async function estimateFee(client, parameters) {
    const { account: account_, ...request } = parameters;
    const account = account_ ? parseAccount(account_) : client.account;
    const formatters = client.chain?.formatters;
    const formatted = formatters?.transactionRequest?.format({
        ...request,
        from: account?.address,
    });
    const result = await client.request({
        method: 'zks_estimateFee',
        params: [formatted],
    });
    return {
        gasLimit: hexToBigInt(result.gas_limit),
        gasPerPubdataLimit: hexToBigInt(result.gas_per_pubdata_limit),
        maxPriorityFeePerGas: hexToBigInt(result.max_priority_fee_per_gas),
        maxFeePerGas: hexToBigInt(result.max_fee_per_gas),
    };
}
//# sourceMappingURL=estimateFee.js.map