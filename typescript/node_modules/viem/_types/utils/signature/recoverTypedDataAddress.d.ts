import type { Address, TypedData } from 'abitype';
import type { ByteArray, Hex, Signature } from '../../types/misc.js';
import type { TypedDataDefinition } from '../../types/typedData.js';
import type { ErrorType } from '../../errors/utils.js';
import { type HashTypedDataErrorType } from './hashTypedData.js';
import { type RecoverAddressErrorType } from './recoverAddress.js';
export type RecoverTypedDataAddressParameters<typedData extends TypedData | Record<string, unknown> = TypedData, primaryType extends keyof typedData | 'EIP712Domain' = keyof typedData> = TypedDataDefinition<typedData, primaryType> & {
    signature: Hex | ByteArray | Signature;
};
export type RecoverTypedDataAddressReturnType = Address;
export type RecoverTypedDataAddressErrorType = RecoverAddressErrorType | HashTypedDataErrorType | ErrorType;
export declare function recoverTypedDataAddress<const typedData extends TypedData | Record<string, unknown>, primaryType extends keyof typedData | 'EIP712Domain'>(parameters: RecoverTypedDataAddressParameters<typedData, primaryType>): Promise<RecoverTypedDataAddressReturnType>;
//# sourceMappingURL=recoverTypedDataAddress.d.ts.map