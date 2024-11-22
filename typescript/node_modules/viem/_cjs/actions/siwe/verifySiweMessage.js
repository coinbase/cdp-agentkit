"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifySiweMessage = verifySiweMessage;
const hashMessage_js_1 = require("../../utils/signature/hashMessage.js");
const parseSiweMessage_js_1 = require("../../utils/siwe/parseSiweMessage.js");
const validateSiweMessage_js_1 = require("../../utils/siwe/validateSiweMessage.js");
const verifyHash_js_1 = require("../public/verifyHash.js");
async function verifySiweMessage(client, parameters) {
    const { address, domain, message, nonce, scheme, signature, time = new Date(), ...callRequest } = parameters;
    const parsed = (0, parseSiweMessage_js_1.parseSiweMessage)(message);
    if (!parsed.address)
        return false;
    const isValid = (0, validateSiweMessage_js_1.validateSiweMessage)({
        address,
        domain,
        message: parsed,
        nonce,
        scheme,
        time,
    });
    if (!isValid)
        return false;
    const hash = (0, hashMessage_js_1.hashMessage)(message);
    return (0, verifyHash_js_1.verifyHash)(client, {
        address: parsed.address,
        hash,
        signature,
        ...callRequest,
    });
}
//# sourceMappingURL=verifySiweMessage.js.map