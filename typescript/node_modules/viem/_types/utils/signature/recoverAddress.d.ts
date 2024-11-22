import type { Address } from 'abitype';
import type { ByteArray, Hex, Signature } from '../../types/misc.js';
import type { ErrorType } from '../../errors/utils.js';
export type RecoverAddressParameters = {
    hash: Hex | ByteArray;
    signature: Hex | ByteArray | Signature;
};
export type RecoverAddressReturnType = Address;
export type RecoverAddressErrorType = ErrorType;
export declare function recoverAddress({ hash, signature, }: RecoverAddressParameters): Promise<RecoverAddressReturnType>;
//# sourceMappingURL=recoverAddress.d.ts.map