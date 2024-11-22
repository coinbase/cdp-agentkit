import { checksumAddress, } from '../../utils/address/getAddress.js';
import { keccak256, } from '../../utils/hash/keccak256.js';
/**
 * @description Converts an ECDSA public key to an address.
 *
 * @param publicKey The public key to convert.
 *
 * @returns The address.
 */
export function publicKeyToAddress(publicKey) {
    const address = keccak256(`0x${publicKey.substring(4)}`).substring(26);
    return checksumAddress(`0x${address}`);
}
//# sourceMappingURL=publicKeyToAddress.js.map