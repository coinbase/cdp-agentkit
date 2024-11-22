import type { Address } from 'abitype';
import type { ErrorType } from '../../errors/utils.js';
import type { Hex } from '../../types/misc.js';
import { type ChecksumAddressErrorType } from '../../utils/address/getAddress.js';
import { type Keccak256ErrorType } from '../../utils/hash/keccak256.js';
export type PublicKeyToAddressErrorType = ChecksumAddressErrorType | Keccak256ErrorType | ErrorType;
/**
 * @description Converts an ECDSA public key to an address.
 *
 * @param publicKey The public key to convert.
 *
 * @returns The address.
 */
export declare function publicKeyToAddress(publicKey: Hex): Address;
//# sourceMappingURL=publicKeyToAddress.d.ts.map