"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMnemonic = generateMnemonic;
const bip39_1 = require("@scure/bip39");
function generateMnemonic(wordlist, strength) {
    return (0, bip39_1.generateMnemonic)(wordlist, strength);
}
//# sourceMappingURL=generateMnemonic.js.map