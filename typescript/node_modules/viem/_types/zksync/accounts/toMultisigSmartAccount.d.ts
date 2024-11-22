import type { Address } from 'abitype';
import type { Hex } from '../../types/misc.js';
import type { ZksyncSmartAccount } from '../types/account.js';
export type ToMultisigSmartAccountParameters = {
    /** Address of the deployed Account's Contract implementation. */
    address: Address;
    /** Array of Private Keys belonging to the owners. */
    privateKeys: readonly Hex[];
};
/**
 * Creates a [ZKsync Smart Account](https://docs.zksync.io/build/developer-reference/account-abstraction/building-smart-accounts)
 * from a Contract Address and an array of Private Keys belonging to the owners.
 */
export declare function toMultisigSmartAccount(parameters: ToMultisigSmartAccountParameters): ZksyncSmartAccount;
//# sourceMappingURL=toMultisigSmartAccount.d.ts.map