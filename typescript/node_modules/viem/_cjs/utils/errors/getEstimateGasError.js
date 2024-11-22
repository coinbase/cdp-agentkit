"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEstimateGasError = getEstimateGasError;
const estimateGas_js_1 = require("../../errors/estimateGas.js");
const node_js_1 = require("../../errors/node.js");
const getNodeError_js_1 = require("./getNodeError.js");
function getEstimateGasError(err, { docsPath, ...args }) {
    const cause = (() => {
        const cause = (0, getNodeError_js_1.getNodeError)(err, args);
        if (cause instanceof node_js_1.UnknownNodeError)
            return err;
        return cause;
    })();
    return new estimateGas_js_1.EstimateGasExecutionError(cause, {
        docsPath,
        ...args,
    });
}
//# sourceMappingURL=getEstimateGasError.js.map