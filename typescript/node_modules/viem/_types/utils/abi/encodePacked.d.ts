import type { AbiParameterToPrimitiveType, AbiType, SolidityAddress, SolidityArrayWithoutTuple, SolidityBool, SolidityBytes, SolidityInt, SolidityString } from 'abitype';
import { type AbiEncodingLengthMismatchErrorType, type BytesSizeMismatchErrorType, UnsupportedPackedAbiType } from '../../errors/abi.js';
import { type InvalidAddressErrorType } from '../../errors/address.js';
import type { ErrorType } from '../../errors/utils.js';
import type { Hex } from '../../types/misc.js';
import { type IsAddressErrorType } from '../address/isAddress.js';
import { type ConcatHexErrorType } from '../data/concat.js';
import { type PadErrorType } from '../data/pad.js';
import { type BoolToHexErrorType, type NumberToHexErrorType, type StringToHexErrorType } from '../encoding/toHex.js';
type PackedAbiType = SolidityAddress | SolidityBool | SolidityBytes | SolidityInt | SolidityString | SolidityArrayWithoutTuple;
type EncodePackedValues<packedAbiTypes extends readonly PackedAbiType[] | readonly unknown[]> = {
    [K in keyof packedAbiTypes]: packedAbiTypes[K] extends AbiType ? AbiParameterToPrimitiveType<{
        type: packedAbiTypes[K];
    }> : unknown;
};
export type EncodePackedErrorType = AbiEncodingLengthMismatchErrorType | ConcatHexErrorType | EncodeErrorType | ErrorType;
export declare function encodePacked<const packedAbiTypes extends readonly PackedAbiType[] | readonly unknown[]>(types: packedAbiTypes, values: EncodePackedValues<packedAbiTypes>): Hex;
type EncodeErrorType = BoolToHexErrorType | BytesSizeMismatchErrorType | InvalidAddressErrorType | IsAddressErrorType | NumberToHexErrorType | PadErrorType | StringToHexErrorType | UnsupportedPackedAbiType | ErrorType;
export {};
//# sourceMappingURL=encodePacked.d.ts.map