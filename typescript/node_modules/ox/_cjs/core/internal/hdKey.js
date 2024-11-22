"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromScure = fromScure;
const Hex = require("../Hex.js");
const Secp256k1 = require("../Secp256k1.js");
function fromScure(key) {
    return {
        derive: (path) => fromScure(key.derive(path)),
        depth: key.depth,
        identifier: Hex.fromBytes(key.identifier),
        index: key.index,
        privateKey: Hex.fromBytes(key.privateKey),
        privateExtendedKey: key.privateExtendedKey,
        publicKey: Secp256k1.getPublicKey({ privateKey: key.privateKey }),
        publicExtendedKey: key.publicExtendedKey,
        versions: key.versions,
    };
}
//# sourceMappingURL=hdKey.js.map