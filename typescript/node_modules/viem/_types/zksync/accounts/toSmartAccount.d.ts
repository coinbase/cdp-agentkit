import type { Address } from 'abitype';
import type { ErrorType } from '../../errors/utils.js';
import type { Hash, Hex } from '../../types/misc.js';
import type { ZksyncSmartAccount } from '../types/account.js';
export type ToSmartAccountParameters = {
    /** Address of the deployed Account's Contract implementation. */
    address: Address;
    /** Function to sign a hash. */
    sign: (parameters: {
        hash: Hash;
    }) => Promise<Hex>;
};
export type ToSmartAccountErrorType = ErrorType;
/**
 * Creates a [ZKsync Smart Account](https://docs.zksync.io/build/developer-reference/account-abstraction/building-smart-accounts)
 * from a Contract Address and a custom sign function.
 */
export declare function toSmartAccount(parameters: ToSmartAccountParameters): ZksyncSmartAccount;
//# sourceMappingURL=toSmartAccount.d.ts.map