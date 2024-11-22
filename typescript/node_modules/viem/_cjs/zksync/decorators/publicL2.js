"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicActionsL2 = publicActionsL2;
const estimateFee_js_1 = require("../actions/estimateFee.js");
const estimateGasL1ToL2_js_1 = require("../actions/estimateGasL1ToL2.js");
const getAllBalances_js_1 = require("../actions/getAllBalances.js");
const getBaseTokenL1Address_js_1 = require("../actions/getBaseTokenL1Address.js");
const getBlockDetails_js_1 = require("../actions/getBlockDetails.js");
const getBridgehubContractAddress_js_1 = require("../actions/getBridgehubContractAddress.js");
const getDefaultBridgeAddresses_js_1 = require("../actions/getDefaultBridgeAddresses.js");
const getL1BatchBlockRange_js_1 = require("../actions/getL1BatchBlockRange.js");
const getL1BatchDetails_js_1 = require("../actions/getL1BatchDetails.js");
const getL1BatchNumber_js_1 = require("../actions/getL1BatchNumber.js");
const getL1ChainId_js_1 = require("../actions/getL1ChainId.js");
const getLogProof_js_1 = require("../actions/getLogProof.js");
const getMainContractAddress_js_1 = require("../actions/getMainContractAddress.js");
const getRawBlockTransactions_js_1 = require("../actions/getRawBlockTransactions.js");
const getTestnetPaymasterAddress_js_1 = require("../actions/getTestnetPaymasterAddress.js");
const getTransactionDetails_js_1 = require("../actions/getTransactionDetails.js");
function publicActionsL2() {
    return (client) => {
        return {
            estimateGasL1ToL2: (args) => (0, estimateGasL1ToL2_js_1.estimateGasL1ToL2)(client, args),
            getDefaultBridgeAddresses: () => (0, getDefaultBridgeAddresses_js_1.getDefaultBridgeAddresses)(client),
            getTestnetPaymasterAddress: () => (0, getTestnetPaymasterAddress_js_1.getTestnetPaymasterAddress)(client),
            getL1ChainId: () => (0, getL1ChainId_js_1.getL1ChainId)(client),
            getMainContractAddress: () => (0, getMainContractAddress_js_1.getMainContractAddress)(client),
            getAllBalances: (args) => (0, getAllBalances_js_1.getAllBalances)(client, args),
            getRawBlockTransaction: (args) => (0, getRawBlockTransactions_js_1.getRawBlockTransactions)(client, args),
            getBlockDetails: (args) => (0, getBlockDetails_js_1.getBlockDetails)(client, args),
            getL1BatchDetails: (args) => (0, getL1BatchDetails_js_1.getL1BatchDetails)(client, args),
            getL1BatchBlockRange: (args) => (0, getL1BatchBlockRange_js_1.getL1BatchBlockRange)(client, args),
            getL1BatchNumber: () => (0, getL1BatchNumber_js_1.getL1BatchNumber)(client),
            getLogProof: (args) => (0, getLogProof_js_1.getLogProof)(client, args),
            getTransactionDetails: (args) => (0, getTransactionDetails_js_1.getTransactionDetails)(client, args),
            estimateFee: (args) => (0, estimateFee_js_1.estimateFee)(client, args),
            getBridgehubContractAddress: () => (0, getBridgehubContractAddress_js_1.getBridgehubContractAddress)(client),
            getBaseTokenL1Address: () => (0, getBaseTokenL1Address_js_1.getBaseTokenL1Address)(client),
        };
    };
}
//# sourceMappingURL=publicL2.js.map