import { sha256 as noble_sha256 } from '@noble/hashes/sha256';
import { isHex } from '../data/isHex.js';
import { toBytes } from '../encoding/toBytes.js';
import { toHex } from '../encoding/toHex.js';
export function sha256(value, to_) {
    const to = to_ || 'hex';
    const bytes = noble_sha256(isHex(value, { strict: false }) ? toBytes(value) : value);
    if (to === 'bytes')
        return bytes;
    return toHex(bytes);
}
//# sourceMappingURL=sha256.js.map