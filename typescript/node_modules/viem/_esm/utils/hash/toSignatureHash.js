import { hashSignature } from './hashSignature.js';
import { toSignature } from './toSignature.js';
/**
 * Returns the hash (of the function/event signature) for a given event or function definition.
 */
export function toSignatureHash(fn) {
    return hashSignature(toSignature(fn));
}
//# sourceMappingURL=toSignatureHash.js.map