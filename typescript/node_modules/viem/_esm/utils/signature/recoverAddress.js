import { publicKeyToAddress } from '../../accounts/utils/publicKeyToAddress.js';
import { recoverPublicKey } from './recoverPublicKey.js';
export async function recoverAddress({ hash, signature, }) {
    return publicKeyToAddress(await recoverPublicKey({ hash: hash, signature }));
}
//# sourceMappingURL=recoverAddress.js.map