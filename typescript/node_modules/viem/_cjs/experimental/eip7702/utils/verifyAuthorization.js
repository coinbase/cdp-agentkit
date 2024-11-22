"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthorization = verifyAuthorization;
const getAddress_js_1 = require("../../../utils/address/getAddress.js");
const isAddressEqual_js_1 = require("../../../utils/address/isAddressEqual.js");
const recoverAuthorizationAddress_js_1 = require("./recoverAuthorizationAddress.js");
async function verifyAuthorization({ address, authorization, signature, }) {
    return (0, isAddressEqual_js_1.isAddressEqual)((0, getAddress_js_1.getAddress)(address), await (0, recoverAuthorizationAddress_js_1.recoverAuthorizationAddress)({
        authorization,
        signature,
    }));
}
//# sourceMappingURL=verifyAuthorization.js.map