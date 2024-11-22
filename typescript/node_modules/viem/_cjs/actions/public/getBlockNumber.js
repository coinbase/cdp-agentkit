"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlockNumberCache = getBlockNumberCache;
exports.getBlockNumber = getBlockNumber;
const withCache_js_1 = require("../../utils/promise/withCache.js");
const cacheKey = (id) => `blockNumber.${id}`;
function getBlockNumberCache(id) {
    return (0, withCache_js_1.getCache)(cacheKey(id));
}
async function getBlockNumber(client, { cacheTime = client.cacheTime } = {}) {
    const blockNumberHex = await (0, withCache_js_1.withCache)(() => client.request({
        method: 'eth_blockNumber',
    }), { cacheKey: cacheKey(client.uid), cacheTime });
    return BigInt(blockNumberHex);
}
//# sourceMappingURL=getBlockNumber.js.map