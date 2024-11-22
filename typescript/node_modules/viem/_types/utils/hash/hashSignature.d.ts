import { type ToBytesErrorType } from '../encoding/toBytes.js';
import type { ErrorType } from '../../errors/utils.js';
import { type Keccak256ErrorType } from './keccak256.js';
export type HashSignatureErrorType = Keccak256ErrorType | ToBytesErrorType | ErrorType;
export declare function hashSignature(sig: string): `0x${string}`;
//# sourceMappingURL=hashSignature.d.ts.map