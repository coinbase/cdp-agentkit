"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApprovalBasedPaymasterInput = getApprovalBasedPaymasterInput;
const encodeFunctionData_js_1 = require("../../../utils/abi/encodeFunctionData.js");
const toHex_js_1 = require("../../../utils/encoding/toHex.js");
const abis_js_1 = require("../../constants/abis.js");
function getApprovalBasedPaymasterInput(parameters) {
    const { innerInput, minAllowance, token } = parameters;
    const innerInputHex = typeof innerInput === 'string' ? innerInput : (0, toHex_js_1.bytesToHex)(innerInput);
    return (0, encodeFunctionData_js_1.encodeFunctionData)({
        abi: abis_js_1.paymasterAbi,
        functionName: 'approvalBased',
        args: [token, minAllowance, innerInputHex],
    });
}
//# sourceMappingURL=getApprovalBasedPaymasterInput.js.map