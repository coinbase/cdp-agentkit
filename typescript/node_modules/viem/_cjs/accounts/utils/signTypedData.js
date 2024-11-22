"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signTypedData = signTypedData;
const hashTypedData_js_1 = require("../../utils/signature/hashTypedData.js");
const sign_js_1 = require("./sign.js");
async function signTypedData(parameters) {
    const { privateKey, ...typedData } = parameters;
    return await (0, sign_js_1.sign)({
        hash: (0, hashTypedData_js_1.hashTypedData)(typedData),
        privateKey,
        to: 'hex',
    });
}
//# sourceMappingURL=signTypedData.js.map