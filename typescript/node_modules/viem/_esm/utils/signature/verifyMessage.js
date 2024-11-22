import { getAddress } from '../address/getAddress.js';
import { isAddressEqual, } from '../address/isAddressEqual.js';
import { recoverMessageAddress, } from './recoverMessageAddress.js';
/**
 * Verify that a message was signed by the provided address.
 *
 * Note:  Only supports Externally Owned Accounts. Does not support Contract Accounts.
 *        It is highly recommended to use `publicClient.verifyMessage` instead to ensure
 *        wallet interoperability.
 *
 * - Docs {@link https://viem.sh/docs/utilities/verifyMessage}
 *
 * @param parameters - {@link VerifyMessageParameters}
 * @returns Whether or not the signature is valid. {@link VerifyMessageReturnType}
 */
export async function verifyMessage({ address, message, signature, }) {
    return isAddressEqual(getAddress(address), await recoverMessageAddress({ message, signature }));
}
//# sourceMappingURL=verifyMessage.js.map