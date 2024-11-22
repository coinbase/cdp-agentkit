"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mnemonicToAccount = mnemonicToAccount;
const bip32_1 = require("@scure/bip32");
const bip39_1 = require("@scure/bip39");
const hdKeyToAccount_js_1 = require("./hdKeyToAccount.js");
function mnemonicToAccount(mnemonic, opts = {}) {
    const seed = (0, bip39_1.mnemonicToSeedSync)(mnemonic);
    return (0, hdKeyToAccount_js_1.hdKeyToAccount)(bip32_1.HDKey.fromMasterSeed(seed), opts);
}
//# sourceMappingURL=mnemonicToAccount.js.map