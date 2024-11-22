import type { Address } from 'abitype';
import type { ErrorType } from '../../errors/utils.js';
import { LruMap } from '../lru.js';
/** @internal */
export declare const isAddressCache: LruMap<boolean>;
export type IsAddressOptions = {
    /**
     * Enables strict mode. Whether or not to compare the address against its checksum.
     *
     * @default true
     */
    strict?: boolean | undefined;
};
export type IsAddressErrorType = ErrorType;
export declare function isAddress(address: string, options?: IsAddressOptions | undefined): address is Address;
//# sourceMappingURL=isAddress.d.ts.map