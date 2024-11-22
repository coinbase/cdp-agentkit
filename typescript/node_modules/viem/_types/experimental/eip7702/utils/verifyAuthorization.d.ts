import type { Address } from 'abitype';
import type { ErrorType } from '../../../errors/utils.js';
import { type GetAddressErrorType } from '../../../utils/address/getAddress.js';
import { type IsAddressEqualErrorType } from '../../../utils/address/isAddressEqual.js';
import { type RecoverAuthorizationAddressErrorType, type RecoverAuthorizationAddressParameters } from './recoverAuthorizationAddress.js';
export type VerifyAuthorizationParameters = RecoverAuthorizationAddressParameters & {
    /** The address that signed the Authorization object. */
    address: Address;
};
export type VerifyAuthorizationReturnType = boolean;
export type VerifyAuthorizationErrorType = IsAddressEqualErrorType | GetAddressErrorType | RecoverAuthorizationAddressErrorType | ErrorType;
/**
 * Verify that an Authorization object was signed by the provided address.
 *
 * - Docs {@link https://viem.sh/docs/utilities/verifyAuthorization}
 *
 * @param parameters - {@link VerifyAuthorizationParameters}
 * @returns Whether or not the signature is valid. {@link VerifyAuthorizationReturnType}
 */
export declare function verifyAuthorization({ address, authorization, signature, }: VerifyAuthorizationParameters): Promise<VerifyAuthorizationReturnType>;
//# sourceMappingURL=verifyAuthorization.d.ts.map