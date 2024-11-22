import { ripemd160 as noble_ripemd160 } from '@noble/hashes/ripemd160';
import { isHex } from '../data/isHex.js';
import { toBytes } from '../encoding/toBytes.js';
import { toHex } from '../encoding/toHex.js';
export function ripemd160(value, to_) {
    const to = to_ || 'hex';
    const bytes = noble_ripemd160(isHex(value, { strict: false }) ? toBytes(value) : value);
    if (to === 'bytes')
        return bytes;
    return toHex(bytes);
}
//# sourceMappingURL=ripemd160.js.map