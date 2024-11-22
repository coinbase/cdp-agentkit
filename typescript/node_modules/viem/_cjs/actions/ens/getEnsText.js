"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnsText = getEnsText;
const abis_js_1 = require("../../constants/abis.js");
const decodeFunctionResult_js_1 = require("../../utils/abi/decodeFunctionResult.js");
const encodeFunctionData_js_1 = require("../../utils/abi/encodeFunctionData.js");
const getChainContractAddress_js_1 = require("../../utils/chain/getChainContractAddress.js");
const toHex_js_1 = require("../../utils/encoding/toHex.js");
const errors_js_1 = require("../../utils/ens/errors.js");
const namehash_js_1 = require("../../utils/ens/namehash.js");
const packetToBytes_js_1 = require("../../utils/ens/packetToBytes.js");
const getAction_js_1 = require("../../utils/getAction.js");
const readContract_js_1 = require("../public/readContract.js");
async function getEnsText(client, { blockNumber, blockTag, name, key, gatewayUrls, strict, universalResolverAddress: universalResolverAddress_, }) {
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
    try {
        const readContractParameters = {
            address: universalResolverAddress,
            abi: abis_js_1.universalResolverResolveAbi,
            functionName: 'resolve',
            args: [
                (0, toHex_js_1.toHex)((0, packetToBytes_js_1.packetToBytes)(name)),
                (0, encodeFunctionData_js_1.encodeFunctionData)({
                    abi: abis_js_1.textResolverAbi,
                    functionName: 'text',
                    args: [(0, namehash_js_1.namehash)(name), key],
                }),
            ],
            blockNumber,
            blockTag,
        };
        const readContractAction = (0, getAction_js_1.getAction)(client, readContract_js_1.readContract, 'readContract');
        const res = gatewayUrls
            ? await readContractAction({
                ...readContractParameters,
                args: [...readContractParameters.args, gatewayUrls],
            })
            : await readContractAction(readContractParameters);
        if (res[0] === '0x')
            return null;
        const record = (0, decodeFunctionResult_js_1.decodeFunctionResult)({
            abi: abis_js_1.textResolverAbi,
            functionName: 'text',
            data: res[0],
        });
        return record === '' ? null : record;
    }
    catch (err) {
        if (strict)
            throw err;
        if ((0, errors_js_1.isNullUniversalResolverError)(err, 'resolve'))
            return null;
        throw err;
    }
}
//# sourceMappingURL=getEnsText.js.map