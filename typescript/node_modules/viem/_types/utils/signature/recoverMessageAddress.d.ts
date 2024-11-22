import type { Address } from 'abitype';
import type { ByteArray, Hex, SignableMessage, Signature } from '../../types/misc.js';
import type { ErrorType } from '../../errors/utils.js';
import { type HashMessageErrorType } from './hashMessage.js';
import { type RecoverAddressErrorType } from './recoverAddress.js';
export type RecoverMessageAddressParameters = {
    message: SignableMessage;
    signature: Hex | ByteArray | Signature;
};
export type RecoverMessageAddressReturnType = Address;
export type RecoverMessageAddressErrorType = HashMessageErrorType | RecoverAddressErrorType | ErrorType;
export declare function recoverMessageAddress({ message, signature, }: RecoverMessageAddressParameters): Promise<RecoverMessageAddressReturnType>;
//# sourceMappingURL=recoverMessageAddress.d.ts.map