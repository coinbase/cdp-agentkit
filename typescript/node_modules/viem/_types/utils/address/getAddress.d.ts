import type { Address } from 'abitype';
import type { ErrorType } from '../../errors/utils.js';
import { type StringToBytesErrorType } from '../encoding/toBytes.js';
import { type Keccak256ErrorType } from '../hash/keccak256.js';
import { type IsAddressErrorType } from './isAddress.js';
export type ChecksumAddressErrorType = Keccak256ErrorType | StringToBytesErrorType | ErrorType;
export declare function checksumAddress(address_: Address, 
/**
 * Warning: EIP-1191 checksum addresses are generally not backwards compatible with the
 * wider Ethereum ecosystem, meaning it will break when validated against an application/tool
 * that relies on EIP-55 checksum encoding (checksum without chainId).
 *
 * It is highly recommended to not use this feature unless you
 * know what you are doing.
 *
 * See more: https://github.com/ethereum/EIPs/issues/1121
 */
chainId?: number | undefined): Address;
export type GetAddressErrorType = ChecksumAddressErrorType | IsAddressErrorType | ErrorType;
export declare function getAddress(address: string, 
/**
 * Warning: EIP-1191 checksum addresses are generally not backwards compatible with the
 * wider Ethereum ecosystem, meaning it will break when validated against an application/tool
 * that relies on EIP-55 checksum encoding (checksum without chainId).
 *
 * It is highly recommended to not use this feature unless you
 * know what you are doing.
 *
 * See more: https://github.com/ethereum/EIPs/issues/1121
 */
chainId?: number): Address;
//# sourceMappingURL=getAddress.d.ts.map