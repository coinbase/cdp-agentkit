"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.privateKeyToAddress = privateKeyToAddress;
const secp256k1_1 = require("@noble/curves/secp256k1");
const toHex_js_1 = require("../../utils/encoding/toHex.js");
const publicKeyToAddress_js_1 = require("./publicKeyToAddress.js");
function privateKeyToAddress(privateKey) {
    const publicKey = (0, toHex_js_1.bytesToHex)(secp256k1_1.secp256k1.getPublicKey(privateKey.slice(2), false));
    return (0, publicKeyToAddress_js_1.publicKeyToAddress)(publicKey);
}
//# sourceMappingURL=privateKeyToAddress.js.map