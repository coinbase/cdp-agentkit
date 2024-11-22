"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContractError = getContractError;
const abi_js_1 = require("../../errors/abi.js");
const base_js_1 = require("../../errors/base.js");
const contract_js_1 = require("../../errors/contract.js");
const rpc_js_1 = require("../../errors/rpc.js");
const EXECUTION_REVERTED_ERROR_CODE = 3;
function getContractError(err, { abi, address, args, docsPath, functionName, sender, }) {
    const { code, data, message, shortMessage } = (err instanceof contract_js_1.RawContractError
        ? err
        : err instanceof base_js_1.BaseError
            ? err.walk((err) => 'data' in err) || err.walk()
            : {});
    const cause = (() => {
        if (err instanceof abi_js_1.AbiDecodingZeroDataError)
            return new contract_js_1.ContractFunctionZeroDataError({ functionName });
        if ([EXECUTION_REVERTED_ERROR_CODE, rpc_js_1.InternalRpcError.code].includes(code) &&
            (data || message || shortMessage)) {
            return new contract_js_1.ContractFunctionRevertedError({
                abi,
                data: typeof data === 'object' ? data.data : data,
                functionName,
                message: shortMessage ?? message,
            });
        }
        return err;
    })();
    return new contract_js_1.ContractFunctionExecutionError(cause, {
        abi,
        args,
        contractAddress: address,
        docsPath,
        functionName,
        sender,
    });
}
//# sourceMappingURL=getContractError.js.map