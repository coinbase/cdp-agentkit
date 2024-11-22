"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recoverMessageAddress = recoverMessageAddress;
const hashMessage_js_1 = require("./hashMessage.js");
const recoverAddress_js_1 = require("./recoverAddress.js");
async function recoverMessageAddress({ message, signature, }) {
    return (0, recoverAddress_js_1.recoverAddress)({ hash: (0, hashMessage_js_1.hashMessage)(message), signature });
}
//# sourceMappingURL=recoverMessageAddress.js.map