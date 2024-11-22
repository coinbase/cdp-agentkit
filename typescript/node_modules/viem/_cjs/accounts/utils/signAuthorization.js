"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.experimental_signAuthorization = experimental_signAuthorization;
const hashAuthorization_js_1 = require("../../experimental/eip7702/utils/hashAuthorization.js");
const sign_js_1 = require("./sign.js");
async function experimental_signAuthorization(parameters) {
    const { contractAddress, chainId, nonce, privateKey, to = 'object', } = parameters;
    const signature = await (0, sign_js_1.sign)({
        hash: (0, hashAuthorization_js_1.hashAuthorization)({ contractAddress, chainId, nonce }),
        privateKey,
        to,
    });
    if (to === 'object')
        return {
            contractAddress,
            chainId,
            nonce,
            ...signature,
        };
    return signature;
}
//# sourceMappingURL=signAuthorization.js.map