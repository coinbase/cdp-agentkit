import type { Address, TypedData } from 'abitype';
import type { ByteArray, Hex, Signature } from '../../types/misc.js';
import type { TypedDataDefinition } from '../../types/typedData.js';
import { type GetAddressErrorType } from '../address/getAddress.js';
import { type IsAddressEqualErrorType } from '../address/isAddressEqual.js';
import type { ErrorType } from '../../errors/utils.js';
import { type RecoverTypedDataAddressParameters } from './recoverTypedDataAddress.js';
export type VerifyTypedDataParameters<typedData extends TypedData | Record<string, unknown> = TypedData, primaryType extends keyof typedData | 'EIP712Domain' = keyof typedData> = TypedDataDefinition<typedData, primaryType> & {
    /** The address to verify the typed data for. */
    address: Address;
    /** The signature to verify */
    signature: Hex | ByteArray | Signature;
};
export type VerifyTypedDataReturnType = boolean;
export type VerifyTypedDataErrorType = IsAddressEqualErrorType | GetAddressErrorType | RecoverTypedDataAddressParameters | ErrorType;
/**
 * Verify that typed data was signed by the provided address.
 *
 * Note:  Only supports Externally Owned Accounts. Does not support Contract Accounts.
 *        It is highly recommended to use `publicClient.verifyTypedData` instead to ensure
 *        wallet interoperability.
 *
 * - Docs {@link https://viem.sh/docs/utilities/verifyTypedData}
 *
 * @param parameters - {@link VerifyTypedDataParameters}
 * @returns Whether or not the signature is valid. {@link VerifyTypedDataReturnType}
 */
export declare function verifyTypedData<const typedData extends TypedData | Record<string, unknown>, primaryType extends keyof typedData | 'EIP712Domain'>(parameters: VerifyTypedDataParameters<typedData, primaryType>): Promise<VerifyTypedDataReturnType>;
//# sourceMappingURL=verifyTypedData.d.ts.map