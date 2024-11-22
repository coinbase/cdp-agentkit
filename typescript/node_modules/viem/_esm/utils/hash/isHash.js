import { isHex } from '../data/isHex.js';
import { size } from '../data/size.js';
export function isHash(hash) {
    return isHex(hash) && size(hash) === 32;
}
//# sourceMappingURL=isHash.js.map