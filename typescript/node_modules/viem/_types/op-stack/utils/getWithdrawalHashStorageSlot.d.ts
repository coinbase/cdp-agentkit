import type { ErrorType } from '../../errors/utils.js';
import type { Hash } from '../../types/misc.js';
import { type EncodeAbiParametersErrorType } from '../../utils/abi/encodeAbiParameters.js';
import { type Keccak256ErrorType } from '../../utils/hash/keccak256.js';
export type GetWithdrawalHashStorageSlotParameters = {
    withdrawalHash: Hash;
};
export type GetWithdrawalHashStorageSlotReturnType = Hash;
export type GetWithdrawalHashStorageSlotErrorType = EncodeAbiParametersErrorType | Keccak256ErrorType | ErrorType;
export declare function getWithdrawalHashStorageSlot({ withdrawalHash, }: GetWithdrawalHashStorageSlotParameters): `0x${string}`;
//# sourceMappingURL=getWithdrawalHashStorageSlot.d.ts.map