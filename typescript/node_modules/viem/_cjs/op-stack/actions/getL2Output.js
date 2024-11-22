"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getL2Output = getL2Output;
const readContract_js_1 = require("../../actions/public/readContract.js");
const abis_js_1 = require("../abis.js");
const getGame_js_1 = require("./getGame.js");
const getPortalVersion_js_1 = require("./getPortalVersion.js");
async function getL2Output(client, parameters) {
    const { chain = client.chain, l2BlockNumber, targetChain } = parameters;
    const version = await (0, getPortalVersion_js_1.getPortalVersion)(client, parameters);
    if (version.major >= 3) {
        const game = await (0, getGame_js_1.getGame)(client, parameters);
        return {
            l2BlockNumber: game.l2BlockNumber,
            outputIndex: game.index,
            outputRoot: game.rootClaim,
            timestamp: game.timestamp,
        };
    }
    const l2OutputOracleAddress = (() => {
        if (parameters.l2OutputOracleAddress)
            return parameters.l2OutputOracleAddress;
        if (chain)
            return targetChain.contracts.l2OutputOracle[chain.id].address;
        return Object.values(targetChain.contracts.l2OutputOracle)[0].address;
    })();
    const outputIndex = await (0, readContract_js_1.readContract)(client, {
        address: l2OutputOracleAddress,
        abi: abis_js_1.l2OutputOracleAbi,
        functionName: 'getL2OutputIndexAfter',
        args: [l2BlockNumber],
    });
    const output = await (0, readContract_js_1.readContract)(client, {
        address: l2OutputOracleAddress,
        abi: abis_js_1.l2OutputOracleAbi,
        functionName: 'getL2Output',
        args: [outputIndex],
    });
    return { outputIndex, ...output };
}
//# sourceMappingURL=getL2Output.js.map