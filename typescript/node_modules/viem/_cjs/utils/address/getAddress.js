"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checksumAddress = checksumAddress;
exports.getAddress = getAddress;
const address_js_1 = require("../../errors/address.js");
const toBytes_js_1 = require("../encoding/toBytes.js");
const keccak256_js_1 = require("../hash/keccak256.js");
const lru_js_1 = require("../lru.js");
const isAddress_js_1 = require("./isAddress.js");
const checksumAddressCache = new lru_js_1.LruMap(8192);
function checksumAddress(address_, chainId) {
    if (checksumAddressCache.has(`${address_}.${chainId}`))
        return checksumAddressCache.get(`${address_}.${chainId}`);
    const hexAddress = chainId
        ? `${chainId}${address_.toLowerCase()}`
        : address_.substring(2).toLowerCase();
    const hash = (0, keccak256_js_1.keccak256)((0, toBytes_js_1.stringToBytes)(hexAddress), 'bytes');
    const address = (chainId ? hexAddress.substring(`${chainId}0x`.length) : hexAddress).split('');
    for (let i = 0; i < 40; i += 2) {
        if (hash[i >> 1] >> 4 >= 8 && address[i]) {
            address[i] = address[i].toUpperCase();
        }
        if ((hash[i >> 1] & 0x0f) >= 8 && address[i + 1]) {
            address[i + 1] = address[i + 1].toUpperCase();
        }
    }
    const result = `0x${address.join('')}`;
    checksumAddressCache.set(`${address_}.${chainId}`, result);
    return result;
}
function getAddress(address, chainId) {
    if (!(0, isAddress_js_1.isAddress)(address, { strict: false }))
        throw new address_js_1.InvalidAddressError({ address });
    return checksumAddress(address, chainId);
}
//# sourceMappingURL=getAddress.js.map