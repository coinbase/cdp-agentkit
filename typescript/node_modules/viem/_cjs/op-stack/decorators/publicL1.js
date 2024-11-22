"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicActionsL1 = publicActionsL1;
const buildInitiateWithdrawal_js_1 = require("../actions/buildInitiateWithdrawal.js");
const estimateDepositTransactionGas_js_1 = require("../actions/estimateDepositTransactionGas.js");
const estimateFinalizeWithdrawalGas_js_1 = require("../actions/estimateFinalizeWithdrawalGas.js");
const estimateProveWithdrawalGas_js_1 = require("../actions/estimateProveWithdrawalGas.js");
const getGame_js_1 = require("../actions/getGame.js");
const getGames_js_1 = require("../actions/getGames.js");
const getL2Output_js_1 = require("../actions/getL2Output.js");
const getPortalVersion_js_1 = require("../actions/getPortalVersion.js");
const getTimeToFinalize_js_1 = require("../actions/getTimeToFinalize.js");
const getTimeToNextGame_js_1 = require("../actions/getTimeToNextGame.js");
const getTimeToNextL2Output_js_1 = require("../actions/getTimeToNextL2Output.js");
const getTimeToProve_js_1 = require("../actions/getTimeToProve.js");
const getWithdrawalStatus_js_1 = require("../actions/getWithdrawalStatus.js");
const waitForNextGame_js_1 = require("../actions/waitForNextGame.js");
const waitForNextL2Output_js_1 = require("../actions/waitForNextL2Output.js");
const waitToFinalize_js_1 = require("../actions/waitToFinalize.js");
const waitToProve_js_1 = require("../actions/waitToProve.js");
function publicActionsL1() {
    return (client) => {
        return {
            buildInitiateWithdrawal: (args) => (0, buildInitiateWithdrawal_js_1.buildInitiateWithdrawal)(client, args),
            estimateDepositTransactionGas: (args) => (0, estimateDepositTransactionGas_js_1.estimateDepositTransactionGas)(client, args),
            estimateFinalizeWithdrawalGas: (args) => (0, estimateFinalizeWithdrawalGas_js_1.estimateFinalizeWithdrawalGas)(client, args),
            estimateProveWithdrawalGas: (args) => (0, estimateProveWithdrawalGas_js_1.estimateProveWithdrawalGas)(client, args),
            getGame: (args) => (0, getGame_js_1.getGame)(client, args),
            getGames: (args) => (0, getGames_js_1.getGames)(client, args),
            getL2Output: (args) => (0, getL2Output_js_1.getL2Output)(client, args),
            getPortalVersion: (args) => (0, getPortalVersion_js_1.getPortalVersion)(client, args),
            getTimeToFinalize: (args) => (0, getTimeToFinalize_js_1.getTimeToFinalize)(client, args),
            getTimeToNextGame: (args) => (0, getTimeToNextGame_js_1.getTimeToNextGame)(client, args),
            getTimeToNextL2Output: (args) => (0, getTimeToNextL2Output_js_1.getTimeToNextL2Output)(client, args),
            getTimeToProve: (args) => (0, getTimeToProve_js_1.getTimeToProve)(client, args),
            getWithdrawalStatus: (args) => (0, getWithdrawalStatus_js_1.getWithdrawalStatus)(client, args),
            waitForNextGame: (args) => (0, waitForNextGame_js_1.waitForNextGame)(client, args),
            waitForNextL2Output: (args) => (0, waitForNextL2Output_js_1.waitForNextL2Output)(client, args),
            waitToFinalize: (args) => (0, waitToFinalize_js_1.waitToFinalize)(client, args),
            waitToProve: (args) => (0, waitToProve_js_1.waitToProve)(client, args),
        };
    };
}
//# sourceMappingURL=publicL1.js.map