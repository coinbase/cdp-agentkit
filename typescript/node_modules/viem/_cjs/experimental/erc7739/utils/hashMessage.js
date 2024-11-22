"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashMessage = hashMessage;
const index_js_1 = require("../../../utils/index.js");
const toPrefixedMessage_js_1 = require("../../../utils/signature/toPrefixedMessage.js");
function hashMessage(parameters) {
    const { message, verifierDomain: { salt, ...domain }, } = parameters;
    return (0, index_js_1.hashTypedData)({
        domain,
        types: {
            PersonalSign: [{ name: 'prefixed', type: 'bytes' }],
        },
        primaryType: 'PersonalSign',
        message: {
            prefixed: (0, toPrefixedMessage_js_1.toPrefixedMessage)(message),
        },
    });
}
//# sourceMappingURL=hashMessage.js.map