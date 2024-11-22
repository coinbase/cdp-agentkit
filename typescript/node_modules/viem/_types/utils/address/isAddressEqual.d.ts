import type { Address } from 'abitype';
import { type InvalidAddressErrorType } from '../../errors/address.js';
import type { ErrorType } from '../../errors/utils.js';
export type IsAddressEqualReturnType = boolean;
export type IsAddressEqualErrorType = InvalidAddressErrorType | ErrorType;
export declare function isAddressEqual(a: Address, b: Address): boolean;
//# sourceMappingURL=isAddressEqual.d.ts.map