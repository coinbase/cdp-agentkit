import { keccak256 } from '../hash/keccak256.js';
import { toPrefixedMessage } from './toPrefixedMessage.js';
export function hashMessage(message, to_) {
    return keccak256(toPrefixedMessage(message), to_);
}
//# sourceMappingURL=hashMessage.js.map