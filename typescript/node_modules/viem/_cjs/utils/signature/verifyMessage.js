"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyMessage = verifyMessage;
const getAddress_js_1 = require("../address/getAddress.js");
const isAddressEqual_js_1 = require("../address/isAddressEqual.js");
const recoverMessageAddress_js_1 = require("./recoverMessageAddress.js");
async function verifyMessage({ address, message, signature, }) {
    return (0, isAddressEqual_js_1.isAddressEqual)((0, getAddress_js_1.getAddress)(address), await (0, recoverMessageAddress_js_1.recoverMessageAddress)({ message, signature }));
}
//# sourceMappingURL=verifyMessage.js.map