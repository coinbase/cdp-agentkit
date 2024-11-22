import { getAddress, } from '../../../utils/address/getAddress.js';
import { isAddressEqual, } from '../../../utils/address/isAddressEqual.js';
import { recoverAuthorizationAddress, } from './recoverAuthorizationAddress.js';
/**
 * Verify that an Authorization object was signed by the provided address.
 *
 * - Docs {@link https://viem.sh/docs/utilities/verifyAuthorization}
 *
 * @param parameters - {@link VerifyAuthorizationParameters}
 * @returns Whether or not the signature is valid. {@link VerifyAuthorizationReturnType}
 */
export async function verifyAuthorization({ address, authorization, signature, }) {
    return isAddressEqual(getAddress(address), await recoverAuthorizationAddress({
        authorization,
        signature,
    }));
}
//# sourceMappingURL=verifyAuthorization.js.map