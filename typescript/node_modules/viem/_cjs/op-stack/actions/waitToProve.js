"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitToProve = waitToProve;
const withdrawal_js_1 = require("../errors/withdrawal.js");
const getWithdrawals_js_1 = require("../utils/getWithdrawals.js");
const getPortalVersion_js_1 = require("./getPortalVersion.js");
const waitForNextGame_js_1 = require("./waitForNextGame.js");
const waitForNextL2Output_js_1 = require("./waitForNextL2Output.js");
async function waitToProve(client, parameters) {
    const { gameLimit, receipt } = parameters;
    const [withdrawal] = (0, getWithdrawals_js_1.getWithdrawals)(receipt);
    if (!withdrawal)
        throw new withdrawal_js_1.ReceiptContainsNoWithdrawalsError({
            hash: receipt.transactionHash,
        });
    const portalVersion = await (0, getPortalVersion_js_1.getPortalVersion)(client, parameters);
    if (portalVersion.major < 3) {
        const output = await (0, waitForNextL2Output_js_1.waitForNextL2Output)(client, {
            ...parameters,
            l2BlockNumber: receipt.blockNumber,
        });
        return {
            game: {
                extraData: '0x',
                index: output.outputIndex,
                l2BlockNumber: output.l2BlockNumber,
                metadata: '0x',
                rootClaim: output.outputRoot,
                timestamp: output.timestamp,
            },
            output,
            withdrawal,
        };
    }
    const game = await (0, waitForNextGame_js_1.waitForNextGame)(client, {
        ...parameters,
        limit: gameLimit,
        l2BlockNumber: receipt.blockNumber,
    });
    return {
        game,
        output: {
            l2BlockNumber: game.l2BlockNumber,
            outputIndex: game.index,
            outputRoot: game.rootClaim,
            timestamp: game.timestamp,
        },
        withdrawal,
    };
}
//# sourceMappingURL=waitToProve.js.map