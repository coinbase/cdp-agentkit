import type { ErrorType } from '../errors/utils.js';
import type { Hex } from '../types/misc.js';
import { type ToHexErrorType } from '../utils/encoding/toHex.js';
export type GeneratePrivateKeyErrorType = ToHexErrorType | ErrorType;
/**
 * @description Generates a random private key.
 *
 * @returns A randomly generated private key.
 */
export declare function generatePrivateKey(): Hex;
//# sourceMappingURL=generatePrivateKey.d.ts.map