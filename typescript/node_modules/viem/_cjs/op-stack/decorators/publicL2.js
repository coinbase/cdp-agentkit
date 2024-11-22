"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicActionsL2 = publicActionsL2;
const buildDepositTransaction_js_1 = require("../actions/buildDepositTransaction.js");
const buildProveWithdrawal_js_1 = require("../actions/buildProveWithdrawal.js");
const estimateContractL1Fee_js_1 = require("../actions/estimateContractL1Fee.js");
const estimateContractL1Gas_js_1 = require("../actions/estimateContractL1Gas.js");
const estimateContractTotalFee_js_1 = require("../actions/estimateContractTotalFee.js");
const estimateContractTotalGas_js_1 = require("../actions/estimateContractTotalGas.js");
const estimateInitiateWithdrawalGas_js_1 = require("../actions/estimateInitiateWithdrawalGas.js");
const estimateL1Fee_js_1 = require("../actions/estimateL1Fee.js");
const estimateL1Gas_js_1 = require("../actions/estimateL1Gas.js");
const estimateTotalFee_js_1 = require("../actions/estimateTotalFee.js");
const estimateTotalGas_js_1 = require("../actions/estimateTotalGas.js");
const getL1BaseFee_js_1 = require("../actions/getL1BaseFee.js");
function publicActionsL2() {
    return (client) => {
        return {
            buildDepositTransaction: (args) => (0, buildDepositTransaction_js_1.buildDepositTransaction)(client, args),
            buildProveWithdrawal: (args) => (0, buildProveWithdrawal_js_1.buildProveWithdrawal)(client, args),
            estimateContractL1Fee: (args) => (0, estimateContractL1Fee_js_1.estimateContractL1Fee)(client, args),
            estimateContractL1Gas: (args) => (0, estimateContractL1Gas_js_1.estimateContractL1Gas)(client, args),
            estimateContractTotalFee: (args) => (0, estimateContractTotalFee_js_1.estimateContractTotalFee)(client, args),
            estimateContractTotalGas: (args) => (0, estimateContractTotalGas_js_1.estimateContractTotalGas)(client, args),
            estimateInitiateWithdrawalGas: (args) => (0, estimateInitiateWithdrawalGas_js_1.estimateInitiateWithdrawalGas)(client, args),
            estimateL1Fee: (args) => (0, estimateL1Fee_js_1.estimateL1Fee)(client, args),
            getL1BaseFee: (args) => (0, getL1BaseFee_js_1.getL1BaseFee)(client, args),
            estimateL1Gas: (args) => (0, estimateL1Gas_js_1.estimateL1Gas)(client, args),
            estimateTotalFee: (args) => (0, estimateTotalFee_js_1.estimateTotalFee)(client, args),
            estimateTotalGas: (args) => (0, estimateTotalGas_js_1.estimateTotalGas)(client, args),
        };
    };
}
//# sourceMappingURL=publicL2.js.map