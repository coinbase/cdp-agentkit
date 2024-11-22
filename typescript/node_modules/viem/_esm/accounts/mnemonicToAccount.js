import { HDKey } from '@scure/bip32';
import { mnemonicToSeedSync } from '@scure/bip39';
import { hdKeyToAccount, } from './hdKeyToAccount.js';
/**
 * @description Creates an Account from a mnemonic phrase.
 *
 * @returns A HD Account.
 */
export function mnemonicToAccount(mnemonic, opts = {}) {
    const seed = mnemonicToSeedSync(mnemonic);
    return hdKeyToAccount(HDKey.fromMasterSeed(seed), opts);
}
//# sourceMappingURL=mnemonicToAccount.js.map