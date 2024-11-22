import { getAddress } from '../address/getAddress.js';
import { isAddressEqual, } from '../address/isAddressEqual.js';
import { recoverAddress, } from './recoverAddress.js';
/**
 * Verify that a message was signed by the provided address.
 *
 * Note:  Only supports Externally Owned Accounts. Does not support Contract Accounts.
 *        It is highly recommended to use `publicClient.verifyHash` instead to ensure
 *        wallet interoperability.
 *
 * - Docs {@link https://viem.sh/docs/utilities/verifyHash}
 *
 * @param parameters - {@link VerifyHashParameters}
 * @returns Whether or not the signature is valid. {@link VerifyHashReturnType}
 */
export async function verifyHash({ address, hash, signature, }) {
    return isAddressEqual(getAddress(address), await recoverAddress({ hash, signature }));
}
//# sourceMappingURL=verifyHash.js.map