"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSiweNonce = generateSiweNonce;
const uid_js_1 = require("../../utils/uid.js");
function generateSiweNonce() {
    return (0, uid_js_1.uid)(96);
}
//# sourceMappingURL=generateSiweNonce.js.map