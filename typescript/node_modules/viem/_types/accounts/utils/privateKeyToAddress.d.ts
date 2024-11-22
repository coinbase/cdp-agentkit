import type { Address } from 'abitype';
import type { ErrorType } from '../../errors/utils.js';
import type { Hex } from '../../types/misc.js';
import { type BytesToHexErrorType } from '../../utils/encoding/toHex.js';
import { type PublicKeyToAddressErrorType } from './publicKeyToAddress.js';
export type PrivateKeyToAddressErrorType = BytesToHexErrorType | PublicKeyToAddressErrorType | ErrorType;
/**
 * @description Converts an ECDSA private key to an address.
 *
 * @param privateKey The private key to convert.
 *
 * @returns The address.
 */
export declare function privateKeyToAddress(privateKey: Hex): Address;
//# sourceMappingURL=privateKeyToAddress.d.ts.map