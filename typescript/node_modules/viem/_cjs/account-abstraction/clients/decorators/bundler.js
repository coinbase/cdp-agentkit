"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bundlerActions = bundlerActions;
const getChainId_js_1 = require("../../../actions/public/getChainId.js");
const estimateUserOperationGas_js_1 = require("../../actions/bundler/estimateUserOperationGas.js");
const getSupportedEntryPoints_js_1 = require("../../actions/bundler/getSupportedEntryPoints.js");
const getUserOperation_js_1 = require("../../actions/bundler/getUserOperation.js");
const getUserOperationReceipt_js_1 = require("../../actions/bundler/getUserOperationReceipt.js");
const prepareUserOperation_js_1 = require("../../actions/bundler/prepareUserOperation.js");
const sendUserOperation_js_1 = require("../../actions/bundler/sendUserOperation.js");
const waitForUserOperationReceipt_js_1 = require("../../actions/bundler/waitForUserOperationReceipt.js");
function bundlerActions(client) {
    return {
        estimateUserOperationGas: (parameters) => (0, estimateUserOperationGas_js_1.estimateUserOperationGas)(client, parameters),
        getChainId: () => (0, getChainId_js_1.getChainId)(client),
        getSupportedEntryPoints: () => (0, getSupportedEntryPoints_js_1.getSupportedEntryPoints)(client),
        getUserOperation: (parameters) => (0, getUserOperation_js_1.getUserOperation)(client, parameters),
        getUserOperationReceipt: (parameters) => (0, getUserOperationReceipt_js_1.getUserOperationReceipt)(client, parameters),
        prepareUserOperation: (parameters) => (0, prepareUserOperation_js_1.prepareUserOperation)(client, parameters),
        sendUserOperation: (parameters) => (0, sendUserOperation_js_1.sendUserOperation)(client, parameters),
        waitForUserOperationReceipt: (parameters) => (0, waitForUserOperationReceipt_js_1.waitForUserOperationReceipt)(client, parameters),
    };
}
//# sourceMappingURL=bundler.js.map