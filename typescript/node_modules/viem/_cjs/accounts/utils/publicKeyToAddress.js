"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicKeyToAddress = publicKeyToAddress;
const getAddress_js_1 = require("../../utils/address/getAddress.js");
const keccak256_js_1 = require("../../utils/hash/keccak256.js");
function publicKeyToAddress(publicKey) {
    const address = (0, keccak256_js_1.keccak256)(`0x${publicKey.substring(4)}`).substring(26);
    return (0, getAddress_js_1.checksumAddress)(`0x${address}`);
}
//# sourceMappingURL=publicKeyToAddress.js.map