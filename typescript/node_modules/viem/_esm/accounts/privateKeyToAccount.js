import { secp256k1 } from '@noble/curves/secp256k1';
import { toHex } from '../utils/encoding/toHex.js';
import { toAccount } from './toAccount.js';
import { publicKeyToAddress, } from './utils/publicKeyToAddress.js';
import { sign } from './utils/sign.js';
import { experimental_signAuthorization } from './utils/signAuthorization.js';
import { signMessage } from './utils/signMessage.js';
import { signTransaction, } from './utils/signTransaction.js';
import { signTypedData, } from './utils/signTypedData.js';
/**
 * @description Creates an Account from a private key.
 *
 * @returns A Private Key Account.
 */
export function privateKeyToAccount(privateKey, options = {}) {
    const { nonceManager } = options;
    const publicKey = toHex(secp256k1.getPublicKey(privateKey.slice(2), false));
    const address = publicKeyToAddress(publicKey);
    const account = toAccount({
        address,
        nonceManager,
        async sign({ hash }) {
            return sign({ hash, privateKey, to: 'hex' });
        },
        async experimental_signAuthorization(authorization) {
            return experimental_signAuthorization({ ...authorization, privateKey });
        },
        async signMessage({ message }) {
            return signMessage({ message, privateKey });
        },
        async signTransaction(transaction, { serializer } = {}) {
            return signTransaction({ privateKey, transaction, serializer });
        },
        async signTypedData(typedData) {
            return signTypedData({ ...typedData, privateKey });
        },
    });
    return {
        ...account,
        publicKey,
        source: 'privateKey',
    };
}
//# sourceMappingURL=privateKeyToAccount.js.map