import type { Hex } from '../types/misc.js';
import { type ToHexErrorType } from '../utils/encoding/toHex.js';
import type { ErrorType } from '../errors/utils.js';
import type { NonceManager } from '../utils/nonceManager.js';
import { type ToAccountErrorType } from './toAccount.js';
import type { PrivateKeyAccount } from './types.js';
import { type PublicKeyToAddressErrorType } from './utils/publicKeyToAddress.js';
import { type SignErrorType } from './utils/sign.js';
import { type SignMessageErrorType } from './utils/signMessage.js';
import { type SignTransactionErrorType } from './utils/signTransaction.js';
import { type SignTypedDataErrorType } from './utils/signTypedData.js';
export type PrivateKeyToAccountOptions = {
    nonceManager?: NonceManager | undefined;
};
export type PrivateKeyToAccountErrorType = ToAccountErrorType | ToHexErrorType | PublicKeyToAddressErrorType | SignErrorType | SignMessageErrorType | SignTransactionErrorType | SignTypedDataErrorType | ErrorType;
/**
 * @description Creates an Account from a private key.
 *
 * @returns A Private Key Account.
 */
export declare function privateKeyToAccount(privateKey: Hex, options?: PrivateKeyToAccountOptions): PrivateKeyAccount;
//# sourceMappingURL=privateKeyToAccount.d.ts.map