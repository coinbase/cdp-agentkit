"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAddressCache = void 0;
exports.isAddress = isAddress;
const lru_js_1 = require("../lru.js");
const getAddress_js_1 = require("./getAddress.js");
const addressRegex = /^0x[a-fA-F0-9]{40}$/;
exports.isAddressCache = new lru_js_1.LruMap(8192);
function isAddress(address, options) {
    const { strict = true } = options ?? {};
    const cacheKey = `${address}.${strict}`;
    if (exports.isAddressCache.has(cacheKey))
        return exports.isAddressCache.get(cacheKey);
    const result = (() => {
        if (!addressRegex.test(address))
            return false;
        if (address.toLowerCase() === address)
            return true;
        if (strict)
            return (0, getAddress_js_1.checksumAddress)(address) === address;
        return true;
    })();
    exports.isAddressCache.set(cacheKey, result);
    return result;
}
//# sourceMappingURL=isAddress.js.map