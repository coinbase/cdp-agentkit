import type { ErrorType } from '../errors/utils.js';
export type GenerateMnemonicErrorType = ErrorType;
/**
 * @description Generates a random mnemonic phrase with a given wordlist.
 *
 * @param wordlist The wordlist to use for generating the mnemonic phrase.
 * @param strength mnemonic strength 128-256 bits
 *
 * @returns A randomly generated mnemonic phrase.
 */
export declare function generateMnemonic(wordlist: string[], strength?: number | undefined): string;
//# sourceMappingURL=generateMnemonic.d.ts.map