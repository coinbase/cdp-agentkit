import { parseAccount } from '../../accounts/utils/parseAccount.js';
export async function estimateGasL1ToL2(client, parameters) {
    const { account: account_, ...request } = parameters;
    const account = account_ ? parseAccount(account_) : client.account;
    const formatters = client.chain?.formatters;
    const formatted = formatters?.transactionRequest?.format({
        ...request,
        from: account?.address,
    });
    const result = await client.request({
        method: 'zks_estimateGasL1ToL2',
        params: [formatted],
    });
    return result;
}
//# sourceMappingURL=estimateGasL1ToL2.js.map