"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAddressEqual = isAddressEqual;
const address_js_1 = require("../../errors/address.js");
const isAddress_js_1 = require("./isAddress.js");
function isAddressEqual(a, b) {
    if (!(0, isAddress_js_1.isAddress)(a, { strict: false }))
        throw new address_js_1.InvalidAddressError({ address: a });
    if (!(0, isAddress_js_1.isAddress)(b, { strict: false }))
        throw new address_js_1.InvalidAddressError({ address: b });
    return a.toLowerCase() === b.toLowerCase();
}
//# sourceMappingURL=isAddressEqual.js.map