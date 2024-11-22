"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recoverTypedDataAddress = recoverTypedDataAddress;
const hashTypedData_js_1 = require("./hashTypedData.js");
const recoverAddress_js_1 = require("./recoverAddress.js");
async function recoverTypedDataAddress(parameters) {
    const { domain, message, primaryType, signature, types } = parameters;
    return (0, recoverAddress_js_1.recoverAddress)({
        hash: (0, hashTypedData_js_1.hashTypedData)({
            domain,
            message,
            primaryType,
            types,
        }),
        signature,
    });
}
//# sourceMappingURL=recoverTypedDataAddress.js.map