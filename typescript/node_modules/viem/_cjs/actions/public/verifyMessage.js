"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyMessage = verifyMessage;
const hashMessage_js_1 = require("../../utils/signature/hashMessage.js");
const verifyHash_js_1 = require("./verifyHash.js");
async function verifyMessage(client, { address, message, factory, factoryData, signature, ...callRequest }) {
    const hash = (0, hashMessage_js_1.hashMessage)(message);
    return (0, verifyHash_js_1.verifyHash)(client, {
        address,
        factory: factory,
        factoryData: factoryData,
        hash,
        signature,
        ...callRequest,
    });
}
//# sourceMappingURL=verifyMessage.js.map