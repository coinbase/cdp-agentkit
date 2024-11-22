import { hashMessage } from './hashMessage.js';
import { recoverAddress, } from './recoverAddress.js';
export async function recoverMessageAddress({ message, signature, }) {
    return recoverAddress({ hash: hashMessage(message), signature });
}
//# sourceMappingURL=recoverMessageAddress.js.map