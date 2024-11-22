import type { Address } from 'abitype';
import type { ByteArray, Hex } from '../../types/misc.js';
import { type ConcatErrorType } from '../data/concat.js';
import { type IsBytesErrorType } from '../data/isBytes.js';
import { type PadErrorType } from '../data/pad.js';
import { type SliceErrorType } from '../data/slice.js';
import { type ToBytesErrorType } from '../encoding/toBytes.js';
import { type ToRlpErrorType } from '../encoding/toRlp.js';
import { type Keccak256ErrorType } from '../hash/keccak256.js';
import type { ErrorType } from '../../errors/utils.js';
import { type GetAddressErrorType } from './getAddress.js';
export type GetCreateAddressOptions = {
    from: Address;
    nonce: bigint;
};
export type GetCreate2AddressOptions = {
    bytecode: ByteArray | Hex;
    from: Address;
    salt: ByteArray | Hex;
} | {
    bytecodeHash: ByteArray | Hex;
    from: Address;
    salt: ByteArray | Hex;
};
export type GetContractAddressOptions = ({
    opcode?: 'CREATE' | undefined;
} & GetCreateAddressOptions) | ({
    opcode: 'CREATE2';
} & GetCreate2AddressOptions);
export declare function getContractAddress(opts: GetContractAddressOptions): `0x${string}`;
export type GetCreateAddressErrorType = Keccak256ErrorType | GetAddressErrorType | ToBytesErrorType | ToRlpErrorType | ErrorType;
export declare function getCreateAddress(opts: GetCreateAddressOptions): `0x${string}`;
export type GetCreate2AddressErrorType = ConcatErrorType | Keccak256ErrorType | GetAddressErrorType | IsBytesErrorType | PadErrorType | SliceErrorType | ToBytesErrorType | ToRlpErrorType | ErrorType;
export declare function getCreate2Address(opts: GetCreate2AddressOptions): `0x${string}`;
//# sourceMappingURL=getContractAddress.d.ts.map