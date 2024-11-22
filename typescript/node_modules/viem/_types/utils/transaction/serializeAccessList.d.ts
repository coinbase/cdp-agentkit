import { type InvalidAddressErrorType } from '../../errors/address.js';
import { type InvalidStorageKeySizeErrorType } from '../../errors/transaction.js';
import type { ErrorType } from '../../errors/utils.js';
import type { Hex } from '../../types/misc.js';
import type { AccessList } from '../../types/transaction.js';
import { type IsAddressErrorType } from '../address/isAddress.js';
import type { RecursiveArray } from '../encoding/toRlp.js';
export type SerializeAccessListErrorType = InvalidStorageKeySizeErrorType | InvalidAddressErrorType | IsAddressErrorType | ErrorType;
export declare function serializeAccessList(accessList?: AccessList | undefined): RecursiveArray<Hex>;
//# sourceMappingURL=serializeAccessList.d.ts.map