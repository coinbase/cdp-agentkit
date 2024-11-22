import type { Address } from 'abitype';
import type { Hash } from '../../../types/misc.js';
import type { EntryPointVersion } from '../../types/entryPointVersion.js';
import type { UserOperation } from '../../types/userOperation.js';
export type GetUserOperationHashParameters<entryPointVersion extends EntryPointVersion = EntryPointVersion> = {
    chainId: number;
    entryPointAddress: Address;
    entryPointVersion: entryPointVersion | EntryPointVersion;
    userOperation: UserOperation<entryPointVersion>;
};
export type GetUserOperationHashReturnType = Hash;
export declare function getUserOperationHash<entryPointVersion extends EntryPointVersion>(parameters: GetUserOperationHashParameters<entryPointVersion>): GetUserOperationHashReturnType;
//# sourceMappingURL=getUserOperationHash.d.ts.map