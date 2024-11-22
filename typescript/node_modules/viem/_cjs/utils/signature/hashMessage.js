"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashMessage = hashMessage;
const keccak256_js_1 = require("../hash/keccak256.js");
const toPrefixedMessage_js_1 = require("./toPrefixedMessage.js");
function hashMessage(message, to_) {
    return (0, keccak256_js_1.keccak256)((0, toPrefixedMessage_js_1.toPrefixedMessage)(message), to_);
}
//# sourceMappingURL=hashMessage.js.map