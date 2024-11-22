import { type BaseErrorType } from '../../errors/base.js';
import { type InvalidHexValueErrorType } from '../../errors/encoding.js';
import type { ErrorType } from '../../errors/utils.js';
import type { ByteArray, Hex } from '../../types/misc.js';
import { type CreateCursorErrorType } from '../cursor.js';
import { type HexToBytesErrorType } from './toBytes.js';
import { type BytesToHexErrorType } from './toHex.js';
import type { RecursiveArray } from './toRlp.js';
type To = 'hex' | 'bytes';
export type FromRlpReturnType<to extends To> = (to extends 'bytes' ? RecursiveArray<ByteArray> : never) | (to extends 'hex' ? RecursiveArray<Hex> : never);
export type FromRlpErrorType = CreateCursorErrorType | FromRlpCursorErrorType | HexToBytesErrorType | InvalidHexValueErrorType | ErrorType;
export declare function fromRlp<to extends To = 'hex'>(value: ByteArray | Hex, to?: to | To | undefined): FromRlpReturnType<to>;
type FromRlpCursorErrorType = BytesToHexErrorType | ReadLengthErrorType | ReadListErrorType | ErrorType;
type ReadLengthErrorType = BaseErrorType | ErrorType;
type ReadListErrorType = ErrorType;
export {};
//# sourceMappingURL=fromRlp.d.ts.map