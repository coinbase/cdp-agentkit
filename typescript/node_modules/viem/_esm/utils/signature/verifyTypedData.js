import { getAddress } from '../address/getAddress.js';
import { isAddressEqual, } from '../address/isAddressEqual.js';
import { recoverTypedDataAddress, } from './recoverTypedDataAddress.js';
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
export async function verifyTypedData(parameters) {
    const { address, domain, message, primaryType, signature, types } = parameters;
    return isAddressEqual(getAddress(address), await recoverTypedDataAddress({
        domain,
        message,
        primaryType,
        signature,
        types,
    }));
}
//# sourceMappingURL=verifyTypedData.js.map