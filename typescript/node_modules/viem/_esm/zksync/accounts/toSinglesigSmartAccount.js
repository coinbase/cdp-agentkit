import { sign } from '../../accounts/utils/sign.js';
import { toSmartAccount } from './toSmartAccount.js';
/**
 * Creates a [ZKsync Smart Account](https://docs.zksync.io/build/developer-reference/account-abstraction/building-smart-accounts)
 * from a Contract Address and a Private Key belonging to the owner.
 */
export function toSinglesigSmartAccount(parameters) {
    const { address, privateKey } = parameters;
    return toSmartAccount({
        address,
        async sign({ hash }) {
            return sign({ hash, privateKey, to: 'hex' });
        },
    });
}
//# sourceMappingURL=toSinglesigSmartAccount.js.map