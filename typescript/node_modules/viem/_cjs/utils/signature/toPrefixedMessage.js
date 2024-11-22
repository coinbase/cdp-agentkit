"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPrefixedMessage = toPrefixedMessage;
const strings_js_1 = require("../../constants/strings.js");
const concat_js_1 = require("../data/concat.js");
const size_js_1 = require("../data/size.js");
const toHex_js_1 = require("../encoding/toHex.js");
function toPrefixedMessage(message_) {
    const message = (() => {
        if (typeof message_ === 'string')
            return (0, toHex_js_1.stringToHex)(message_);
        if (typeof message_.raw === 'string')
            return message_.raw;
        return (0, toHex_js_1.bytesToHex)(message_.raw);
    })();
    const prefix = (0, toHex_js_1.stringToHex)(`${strings_js_1.presignMessagePrefix}${(0, size_js_1.size)(message)}`);
    return (0, concat_js_1.concat)([prefix, message]);
}
//# sourceMappingURL=toPrefixedMessage.js.map