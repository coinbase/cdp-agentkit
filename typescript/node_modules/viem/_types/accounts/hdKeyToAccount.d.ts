import { type ToHexErrorType } from '../utils/encoding/toHex.js';
import type { ErrorType } from '../errors/utils.js';
import type { HDKey } from '../types/account.js';
import { type PrivateKeyToAccountErrorType, type PrivateKeyToAccountOptions } from './privateKeyToAccount.js';
import type { HDAccount, HDOptions } from './types.js';
export type HDKeyToAccountOptions = HDOptions & PrivateKeyToAccountOptions;
export type HDKeyToAccountErrorType = PrivateKeyToAccountErrorType | ToHexErrorType | ErrorType;
/**
 * @description Creates an Account from a HD Key.
 *
 * @returns A HD Account.
 */
export declare function hdKeyToAccount(hdKey_: HDKey, { accountIndex, addressIndex, changeIndex, path, ...options }?: HDKeyToAccountOptions): HDAccount;
//# sourceMappingURL=hdKeyToAccount.d.ts.map