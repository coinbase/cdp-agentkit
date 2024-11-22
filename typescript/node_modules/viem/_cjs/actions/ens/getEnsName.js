"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnsName = getEnsName;
const abis_js_1 = require("../../constants/abis.js");
const getChainContractAddress_js_1 = require("../../utils/chain/getChainContractAddress.js");
const toHex_js_1 = require("../../utils/encoding/toHex.js");
const errors_js_1 = require("../../utils/ens/errors.js");
const packetToBytes_js_1 = require("../../utils/ens/packetToBytes.js");
const getAction_js_1 = require("../../utils/getAction.js");
const readContract_js_1 = require("../public/readContract.js");
async function getEnsName(client, { address, blockNumber, blockTag, gatewayUrls, strict, universalResolverAddress: universalResolverAddress_, }) {
    let universalResolverAddress = universalResolverAddress_;
    if (!universalResolverAddress) {
        if (!client.chain)
            throw new Error('client chain not configured. universalResolverAddress is required.');
        universalResolverAddress = (0, getChainContractAddress_js_1.getChainContractAddress)({
            blockNumber,
            chain: client.chain,
            contract: 'ensUniversalResolver',
        });
    }
    const reverseNode = `${address.toLowerCase().substring(2)}.addr.reverse`;
    try {
        const readContractParameters = {
            address: universalResolverAddress,
            abi: abis_js_1.universalResolverReverseAbi,
            functionName: 'reverse',
            args: [(0, toHex_js_1.toHex)((0, packetToBytes_js_1.packetToBytes)(reverseNode))],
            blockNumber,
            blockTag,
        };
        const readContractAction = (0, getAction_js_1.getAction)(client, readContract_js_1.readContract, 'readContract');
        const [name, resolvedAddress] = gatewayUrls
            ? await readContractAction({
                ...readContractParameters,
                args: [...readContractParameters.args, gatewayUrls],
            })
            : await readContractAction(readContractParameters);
        if (address.toLowerCase() !== resolvedAddress.toLowerCase())
            return null;
        return name;
    }
    catch (err) {
        if (strict)
            throw err;
        if ((0, errors_js_1.isNullUniversalResolverError)(err, 'reverse'))
            return null;
        throw err;
    }
}
//# sourceMappingURL=getEnsName.js.map