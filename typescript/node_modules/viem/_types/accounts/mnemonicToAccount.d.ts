import type { ErrorType } from '../errors/utils.js';
import { type HDKeyToAccountErrorType, type HDKeyToAccountOptions } from './hdKeyToAccount.js';
import type { HDAccount } from './types.js';
export type MnemonicToAccountOptions = HDKeyToAccountOptions;
export type MnemonicToAccountErrorType = HDKeyToAccountErrorType | ErrorType;
/**
 * @description Creates an Account from a mnemonic phrase.
 *
 * @returns A HD Account.
 */
export declare function mnemonicToAccount(mnemonic: string, opts?: MnemonicToAccountOptions): HDAccount;
//# sourceMappingURL=mnemonicToAccount.d.ts.map