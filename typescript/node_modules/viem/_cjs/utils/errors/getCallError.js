"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCallError = getCallError;
const contract_js_1 = require("../../errors/contract.js");
const node_js_1 = require("../../errors/node.js");
const getNodeError_js_1 = require("./getNodeError.js");
function getCallError(err, { docsPath, ...args }) {
    const cause = (() => {
        const cause = (0, getNodeError_js_1.getNodeError)(err, args);
        if (cause instanceof node_js_1.UnknownNodeError)
            return err;
        return cause;
    })();
    return new contract_js_1.CallExecutionError(cause, {
        docsPath,
        ...args,
    });
}
//# sourceMappingURL=getCallError.js.map