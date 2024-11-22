import { type SiweInvalidMessageFieldErrorType } from '../../errors/siwe.js';
import type { ErrorType } from '../../errors/utils.js';
import { type GetAddressErrorType } from '../address/getAddress.js';
import type { SiweMessage } from './types.js';
export type CreateSiweMessageParameters = SiweMessage;
export type CreateSiweMessageReturnType = string;
export type CreateSiweMessageErrorType = GetAddressErrorType | SiweInvalidMessageFieldErrorType | ErrorType;
/**
 * @description Creates EIP-4361 formatted message.
 *
 * @example
 * const message = createMessage({
 *   address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
 *   chainId: 1,
 *   domain: 'example.com',
 *   nonce: 'foobarbaz',
 *   uri: 'https://example.com/path',
 *   version: '1',
 * })
 *
 * @see https://eips.ethereum.org/EIPS/eip-4361
 */
export declare function createSiweMessage(parameters: CreateSiweMessageParameters): CreateSiweMessageReturnType;
//# sourceMappingURL=createSiweMessage.d.ts.map