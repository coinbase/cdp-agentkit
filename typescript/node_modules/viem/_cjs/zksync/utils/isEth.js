"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEth = isEth;
const address_js_1 = require("../constants/address.js");
function isEth(token) {
    return (token.localeCompare(address_js_1.legacyEthAddress, undefined, {
        sensitivity: 'accent',
    }) === 0 ||
        token.localeCompare(address_js_1.l2BaseTokenAddress, undefined, {
            sensitivity: 'accent',
        }) === 0 ||
        token.localeCompare(address_js_1.ethAddressInContracts, undefined, {
            sensitivity: 'accent',
        }) === 0);
}
//# sourceMappingURL=isEth.js.map