"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recoverAddress = recoverAddress;
const publicKeyToAddress_js_1 = require("../../accounts/utils/publicKeyToAddress.js");
const recoverPublicKey_js_1 = require("./recoverPublicKey.js");
async function recoverAddress({ hash, signature, }) {
    return (0, publicKeyToAddress_js_1.publicKeyToAddress)(await (0, recoverPublicKey_js_1.recoverPublicKey)({ hash: hash, signature }));
}
//# sourceMappingURL=recoverAddress.js.map