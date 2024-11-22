import type { ExactPartial, Prettify } from '../../types/utils.js';
import type { SiweMessage } from './types.js';
/**
 * @description Parses EIP-4361 formatted message into message fields object.
 *
 * @see https://eips.ethereum.org/EIPS/eip-4361
 *
 * @returns EIP-4361 fields object
 */
export declare function parseSiweMessage(message: string): Prettify<ExactPartial<SiweMessage>>;
//# sourceMappingURL=parseSiweMessage.d.ts.map