import type { Address } from 'abitype';
import { type InvalidAddressErrorType } from '../errors/address.js';
import { type IsAddressErrorType } from '../utils/address/isAddress.js';
import type { ErrorType } from '../errors/utils.js';
import type { AccountSource, CustomSource, JsonRpcAccount, LocalAccount } from './types.js';
type GetAccountReturnType<accountSource extends AccountSource> = (accountSource extends Address ? JsonRpcAccount : never) | (accountSource extends CustomSource ? LocalAccount : never);
export type ToAccountErrorType = InvalidAddressErrorType | IsAddressErrorType | ErrorType;
/**
 * @description Creates an Account from a custom signing implementation.
 *
 * @returns A Local Account.
 */
export declare function toAccount<accountSource extends AccountSource>(source: accountSource): GetAccountReturnType<accountSource>;
export {};
//# sourceMappingURL=toAccount.d.ts.map