import { keccak_256 } from '@noble/hashes/sha3';
import { isHex } from '../data/isHex.js';
import { toBytes } from '../encoding/toBytes.js';
import { toHex } from '../encoding/toHex.js';
export function keccak256(value, to_) {
    const to = to_ || 'hex';
    const bytes = keccak_256(isHex(value, { strict: false }) ? toBytes(value) : value);
    if (to === 'bytes')
        return bytes;
    return toHex(bytes);
}
//# sourceMappingURL=keccak256.js.map