import { toBytes } from '../encoding/toBytes.js';
import { keccak256 } from './keccak256.js';
const hash = (value) => keccak256(toBytes(value));
export function hashSignature(sig) {
    return hash(sig);
}
//# sourceMappingURL=hashSignature.js.map