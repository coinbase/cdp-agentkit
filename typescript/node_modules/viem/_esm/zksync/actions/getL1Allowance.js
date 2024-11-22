import { parseAccount } from '../../accounts/utils/parseAccount.js';
import { readContract } from '../../actions/public/readContract.js';
import { erc20Abi } from '../../constants/abis.js';
export async function getL1Allowance(client, parameters) {
    const { token, bridgeAddress, blockTag, account: account_ } = parameters;
    const account = account_ ? parseAccount(account_) : client.account;
    return await readContract(client, {
        abi: erc20Abi,
        address: token,
        functionName: 'allowance',
        args: [account.address, bridgeAddress],
        blockTag: blockTag,
    });
}
//# sourceMappingURL=getL1Allowance.js.map