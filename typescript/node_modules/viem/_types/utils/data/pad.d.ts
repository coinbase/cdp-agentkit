import { type SizeExceedsPaddingSizeErrorType } from '../../errors/data.js';
import type { ErrorType } from '../../errors/utils.js';
import type { ByteArray, Hex } from '../../types/misc.js';
type PadOptions = {
    dir?: 'left' | 'right' | undefined;
    size?: number | null | undefined;
};
export type PadReturnType<value extends ByteArray | Hex> = value extends Hex ? Hex : ByteArray;
export type PadErrorType = PadHexErrorType | PadBytesErrorType | ErrorType;
export declare function pad<value extends ByteArray | Hex>(hexOrBytes: value, { dir, size }?: PadOptions): PadReturnType<value>;
export type PadHexErrorType = SizeExceedsPaddingSizeErrorType | ErrorType;
export declare function padHex(hex_: Hex, { dir, size }?: PadOptions): `0x${string}`;
export type PadBytesErrorType = SizeExceedsPaddingSizeErrorType | ErrorType;
export declare function padBytes(bytes: ByteArray, { dir, size }?: PadOptions): Uint8Array;
export {};
//# sourceMappingURL=pad.d.ts.map