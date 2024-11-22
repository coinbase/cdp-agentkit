import { parseAccount } from '../../accounts/utils/parseAccount.js';
import { getBalance, } from '../../actions/public/getBalance.js';
import { legacyEthAddress } from '../constants/address.js';
import { isEth } from '../utils/isEth.js';
import { getL1TokenBalance, } from './getL1TokenBalance.js';
export async function getL1Balance(client, ...[parameters = {}]) {
    const { account: account_ = client.account, blockNumber, blockTag, token = legacyEthAddress, } = parameters;
    const account = account_ ? parseAccount(account_) : undefined;
    if (isEth(token))
        return await getBalance(client, {
            address: account.address,
            blockNumber,
            blockTag,
        });
    return await getL1TokenBalance(client, {
        ...parameters,
    });
}
//# sourceMappingURL=getL1Balance.js.map