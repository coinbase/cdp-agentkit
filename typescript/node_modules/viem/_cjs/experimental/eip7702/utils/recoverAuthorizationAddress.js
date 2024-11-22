"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recoverAuthorizationAddress = recoverAuthorizationAddress;
const recoverAddress_js_1 = require("../../../utils/signature/recoverAddress.js");
const hashAuthorization_js_1 = require("./hashAuthorization.js");
async function recoverAuthorizationAddress(parameters) {
    const { authorization, signature } = parameters;
    return (0, recoverAddress_js_1.recoverAddress)({
        hash: (0, hashAuthorization_js_1.hashAuthorization)(authorization),
        signature: (signature ?? authorization),
    });
}
//# sourceMappingURL=recoverAuthorizationAddress.js.map