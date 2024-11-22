import type { ErrorType } from '../../errors/utils.js';
import type { ByteArray, Hex } from '../../types/misc.js';
import { type CreateCursorErrorType } from '../cursor.js';
import { type HexToBytesErrorType } from './toBytes.js';
import { type BytesToHexErrorType } from './toHex.js';
export type RecursiveArray<T> = T | readonly RecursiveArray<T>[];
type To = 'hex' | 'bytes';
export type ToRlpReturnType<to extends To> = (to extends 'bytes' ? ByteArray : never) | (to extends 'hex' ? Hex : never);
export type ToRlpErrorType = CreateCursorErrorType | BytesToHexErrorType | HexToBytesErrorType | ErrorType;
export declare function toRlp<to extends To = 'hex'>(bytes: RecursiveArray<ByteArray> | RecursiveArray<Hex>, to?: to | To | undefined): ToRlpReturnType<to>;
export type BytesToRlpErrorType = ToRlpErrorType | ErrorType;
export declare function bytesToRlp<to extends To = 'bytes'>(bytes: RecursiveArray<ByteArray>, to?: to | To | undefined): ToRlpReturnType<to>;
export type HexToRlpErrorType = ToRlpErrorType | ErrorType;
export declare function hexToRlp<to extends To = 'hex'>(hex: RecursiveArray<Hex>, to?: to | To | undefined): ToRlpReturnType<to>;
export {};
//# sourceMappingURL=toRlp.d.ts.map