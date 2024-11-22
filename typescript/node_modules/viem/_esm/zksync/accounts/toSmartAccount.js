import { toAccount } from '../../accounts/toAccount.js';
import { keccak256 } from '../../utils/index.js';
import { hashMessage } from '../../utils/signature/hashMessage.js';
import { hashTypedData } from '../../utils/signature/hashTypedData.js';
import { serializeTransaction } from '../serializers.js';
/**
 * Creates a [ZKsync Smart Account](https://docs.zksync.io/build/developer-reference/account-abstraction/building-smart-accounts)
 * from a Contract Address and a custom sign function.
 */
export function toSmartAccount(parameters) {
    const { address, sign } = parameters;
    const account = toAccount({
        address,
        sign,
        async signMessage({ message }) {
            return sign({
                hash: hashMessage(message),
            });
        },
        async signTransaction(transaction) {
            const signableTransaction = {
                ...transaction,
                from: this.address,
            };
            return serializeTransaction({
                ...signableTransaction,
                customSignature: await sign({
                    hash: keccak256(serializeTransaction(signableTransaction)),
                }),
            });
        },
        async signTypedData(typedData) {
            return sign({
                hash: hashTypedData(typedData),
            });
        },
    });
    return {
        ...account,
        source: 'smartAccountZksync',
    };
}
//# sourceMappingURL=toSmartAccount.js.map