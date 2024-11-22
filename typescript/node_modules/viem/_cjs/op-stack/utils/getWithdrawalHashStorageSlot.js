"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWithdrawalHashStorageSlot = getWithdrawalHashStorageSlot;
const encodeAbiParameters_js_1 = require("../../utils/abi/encodeAbiParameters.js");
const keccak256_js_1 = require("../../utils/hash/keccak256.js");
function getWithdrawalHashStorageSlot({ withdrawalHash, }) {
    const data = (0, encodeAbiParameters_js_1.encodeAbiParameters)([{ type: 'bytes32' }, { type: 'uint256' }], [withdrawalHash, 0n]);
    return (0, keccak256_js_1.keccak256)(data);
}
//# sourceMappingURL=getWithdrawalHashStorageSlot.js.map