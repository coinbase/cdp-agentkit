"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyHash = verifyHash;
const getAddress_js_1 = require("../address/getAddress.js");
const isAddressEqual_js_1 = require("../address/isAddressEqual.js");
const recoverAddress_js_1 = require("./recoverAddress.js");
async function verifyHash({ address, hash, signature, }) {
    return (0, isAddressEqual_js_1.isAddressEqual)((0, getAddress_js_1.getAddress)(address), await (0, recoverAddress_js_1.recoverAddress)({ hash, signature }));
}
//# sourceMappingURL=verifyHash.js.map