"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSiweMessage = validateSiweMessage;
const isAddressEqual_js_1 = require("../address/isAddressEqual.js");
function validateSiweMessage(parameters) {
    const { address, domain, message, nonce, scheme, time = new Date(), } = parameters;
    if (domain && message.domain !== domain)
        return false;
    if (nonce && message.nonce !== nonce)
        return false;
    if (scheme && message.scheme !== scheme)
        return false;
    if (message.expirationTime && time >= message.expirationTime)
        return false;
    if (message.notBefore && time < message.notBefore)
        return false;
    try {
        if (!message.address)
            return false;
        if (address && !(0, isAddressEqual_js_1.isAddressEqual)(message.address, address))
            return false;
    }
    catch {
        return false;
    }
    return true;
}
//# sourceMappingURL=validateSiweMessage.js.map