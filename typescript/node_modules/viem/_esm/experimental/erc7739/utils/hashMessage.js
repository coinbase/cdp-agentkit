import { hashTypedData } from '../../../utils/index.js';
import { toPrefixedMessage, } from '../../../utils/signature/toPrefixedMessage.js';
/**
 * Generates a signable hash for a ERC-7739 personal sign message.
 *
 * @example
 * ```ts
 * const hash = hashMessage({
 *   message: 'hello world',
 *   verifierDomain: {
 *     name: 'Smart Account',
 *     version: '1',
 *     verifyingContract: '0x1234567890abcdef1234567890abcdef12345678',
 *     chainId: 1,
 *   },
 * })
 * ```
 */
export function hashMessage(parameters) {
    const { message, verifierDomain: { salt, ...domain }, } = parameters;
    return hashTypedData({
        domain,
        types: {
            PersonalSign: [{ name: 'prefixed', type: 'bytes' }],
        },
        primaryType: 'PersonalSign',
        message: {
            prefixed: toPrefixedMessage(message),
        },
    });
}
//# sourceMappingURL=hashMessage.js.map