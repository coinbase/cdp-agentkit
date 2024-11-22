"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPortalVersion = getPortalVersion;
const readContract_js_1 = require("../../actions/public/readContract.js");
const withCache_js_1 = require("../../utils/promise/withCache.js");
const abis_js_1 = require("../abis.js");
async function getPortalVersion(client, parameters) {
    const { chain = client.chain, targetChain } = parameters;
    const portalAddress = (() => {
        if (parameters.portalAddress)
            return parameters.portalAddress;
        if (chain)
            return targetChain.contracts.portal[chain.id].address;
        return Object.values(targetChain.contracts.portal)[0].address;
    })();
    const version = await (0, withCache_js_1.withCache)(() => (0, readContract_js_1.readContract)(client, {
        abi: abis_js_1.portal2Abi,
        address: portalAddress,
        functionName: 'version',
    }), { cacheKey: ['portalVersion', portalAddress].join('.'), cacheTime: 300 });
    const [major, minor, patch] = version.split('.').map(Number);
    return { major, minor, patch };
}
//# sourceMappingURL=getPortalVersion.js.map