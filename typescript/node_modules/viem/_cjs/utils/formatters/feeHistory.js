"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatFeeHistory = formatFeeHistory;
function formatFeeHistory(feeHistory) {
    return {
        baseFeePerGas: feeHistory.baseFeePerGas.map((value) => BigInt(value)),
        gasUsedRatio: feeHistory.gasUsedRatio,
        oldestBlock: BigInt(feeHistory.oldestBlock),
        reward: feeHistory.reward?.map((reward) => reward.map((value) => BigInt(value))),
    };
}
//# sourceMappingURL=feeHistory.js.map