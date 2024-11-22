import { generateMnemonic as generateMnemonic_ } from '@scure/bip39';
/**
 * @description Generates a random mnemonic phrase with a given wordlist.
 *
 * @param wordlist The wordlist to use for generating the mnemonic phrase.
 * @param strength mnemonic strength 128-256 bits
 *
 * @returns A randomly generated mnemonic phrase.
 */
export function generateMnemonic(wordlist, strength) {
    return generateMnemonic_(wordlist, strength);
}
//# sourceMappingURL=generateMnemonic.js.map