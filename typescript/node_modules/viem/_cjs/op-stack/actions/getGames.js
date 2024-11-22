"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGames = getGames;
const readContract_js_1 = require("../../actions/public/readContract.js");
const decodeAbiParameters_js_1 = require("../../utils/abi/decodeAbiParameters.js");
const abis_js_1 = require("../abis.js");
async function getGames(client, parameters) {
    const { chain = client.chain, l2BlockNumber, limit = 100, targetChain, } = parameters;
    const portalAddress = (() => {
        if (parameters.portalAddress)
            return parameters.portalAddress;
        if (chain)
            return targetChain.contracts.portal[chain.id].address;
        return Object.values(targetChain.contracts.portal)[0].address;
    })();
    const disputeGameFactoryAddress = (() => {
        if (parameters.disputeGameFactoryAddress)
            return parameters.disputeGameFactoryAddress;
        if (chain)
            return targetChain.contracts.disputeGameFactory[chain.id].address;
        return Object.values(targetChain.contracts.disputeGameFactory)[0].address;
    })();
    const [gameCount, gameType] = await Promise.all([
        (0, readContract_js_1.readContract)(client, {
            abi: abis_js_1.disputeGameFactoryAbi,
            functionName: 'gameCount',
            args: [],
            address: disputeGameFactoryAddress,
        }),
        (0, readContract_js_1.readContract)(client, {
            abi: abis_js_1.portal2Abi,
            functionName: 'respectedGameType',
            address: portalAddress,
        }),
    ]);
    const games = (await (0, readContract_js_1.readContract)(client, {
        abi: abis_js_1.disputeGameFactoryAbi,
        functionName: 'findLatestGames',
        address: disputeGameFactoryAddress,
        args: [
            gameType,
            BigInt(Math.max(0, Number(gameCount - 1n))),
            BigInt(Math.min(limit, Number(gameCount))),
        ],
    }))
        .map((game) => {
        const [blockNumber] = (0, decodeAbiParameters_js_1.decodeAbiParameters)([{ type: 'uint256' }], game.extraData);
        return !l2BlockNumber || blockNumber > l2BlockNumber
            ? { ...game, l2BlockNumber: blockNumber }
            : null;
    })
        .filter(Boolean);
    return games;
}
//# sourceMappingURL=getGames.js.map