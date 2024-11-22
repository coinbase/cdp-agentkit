"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getL2TransactionHash = getL2TransactionHash;
const keccak256_js_1 = require("../../utils/hash/keccak256.js");
const serializers_js_1 = require("../serializers.js");
const getSourceHash_js_1 = require("./getSourceHash.js");
const opaqueDataToDepositData_js_1 = require("./opaqueDataToDepositData.js");
function getL2TransactionHash({ log }) {
    const sourceHash = (0, getSourceHash_js_1.getSourceHash)({
        domain: 'userDeposit',
        l1BlockHash: log.blockHash,
        l1LogIndex: log.logIndex,
    });
    const { data, gas, isCreation, mint, value } = (0, opaqueDataToDepositData_js_1.opaqueDataToDepositData)(log.args.opaqueData);
    return (0, keccak256_js_1.keccak256)((0, serializers_js_1.serializeTransaction)({
        from: log.args.from,
        to: isCreation ? undefined : log.args.to,
        sourceHash,
        data,
        gas,
        isSystemTx: false,
        mint,
        type: 'deposit',
        value,
    }));
}
//# sourceMappingURL=getL2TransactionHash.js.map