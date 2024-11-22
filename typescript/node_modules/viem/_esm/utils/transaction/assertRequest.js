import { parseAccount, } from '../../accounts/utils/parseAccount.js';
import { maxUint256 } from '../../constants/number.js';
import { InvalidAddressError, } from '../../errors/address.js';
import { FeeCapTooHighError, TipAboveFeeCapError, } from '../../errors/node.js';
import { FeeConflictError, } from '../../errors/transaction.js';
import { isAddress } from '../address/isAddress.js';
export function assertRequest(args) {
    const { account: account_, gasPrice, maxFeePerGas, maxPriorityFeePerGas, to, } = args;
    const account = account_ ? parseAccount(account_) : undefined;
    if (account && !isAddress(account.address))
        throw new InvalidAddressError({ address: account.address });
    if (to && !isAddress(to))
        throw new InvalidAddressError({ address: to });
    if (typeof gasPrice !== 'undefined' &&
        (typeof maxFeePerGas !== 'undefined' ||
            typeof maxPriorityFeePerGas !== 'undefined'))
        throw new FeeConflictError();
    if (maxFeePerGas && maxFeePerGas > maxUint256)
        throw new FeeCapTooHighError({ maxFeePerGas });
    if (maxPriorityFeePerGas &&
        maxFeePerGas &&
        maxPriorityFeePerGas > maxFeePerGas)
        throw new TipAboveFeeCapError({ maxFeePerGas, maxPriorityFeePerGas });
}
//# sourceMappingURL=assertRequest.js.map