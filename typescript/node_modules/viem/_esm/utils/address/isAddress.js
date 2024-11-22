import { LruMap } from '../lru.js';
import { checksumAddress } from './getAddress.js';
const addressRegex = /^0x[a-fA-F0-9]{40}$/;
/** @internal */
export const isAddressCache = /*#__PURE__*/ new LruMap(8192);
export function isAddress(address, options) {
    const { strict = true } = options ?? {};
    const cacheKey = `${address}.${strict}`;
    if (isAddressCache.has(cacheKey))
        return isAddressCache.get(cacheKey);
    const result = (() => {
        if (!addressRegex.test(address))
            return false;
        if (address.toLowerCase() === address)
            return true;
        if (strict)
            return checksumAddress(address) === address;
        return true;
    })();
    isAddressCache.set(cacheKey, result);
    return result;
}
//# sourceMappingURL=isAddress.js.map