import { erc6492MagicBytes } from '../../constants/bytes.js';
import { sliceHex } from '../data/slice.js';
/** Whether or not the signature is an ERC-6492 formatted signature. */
export function isErc6492Signature(signature) {
    return sliceHex(signature, -32) === erc6492MagicBytes;
}
//# sourceMappingURL=isErc6492Signature.js.map