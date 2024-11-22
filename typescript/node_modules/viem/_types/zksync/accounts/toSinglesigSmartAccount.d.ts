import type { Address } from 'abitype';
import type { Hex } from '../../types/misc.js';
import type { ZksyncSmartAccount } from '../types/account.js';
export type ToSinglesigSmartAccountParameters = {
    /** Address of the deployed Account's Contract implementation. */
    address: Address;
    /** Private Key of the owner. */
    privateKey: Hex;
};
/**
 * Creates a [ZKsync Smart Account](https://docs.zksync.io/build/developer-reference/account-abstraction/building-smart-accounts)
 * from a Contract Address and a Private Key belonging to the owner.
 */
export declare function toSinglesigSmartAccount(parameters: ToSinglesigSmartAccountParameters): ZksyncSmartAccount;
//# sourceMappingURL=toSinglesigSmartAccount.d.ts.map