import type { Address } from 'abitype';
import type { ExactPartial } from '../../types/utils.js';
import type { SiweMessage } from './types.js';
export type ValidateSiweMessageParameters = {
    /**
     * Ethereum address to check against.
     */
    address?: Address | undefined;
    /**
     * [RFC 3986](https://www.rfc-editor.org/rfc/rfc3986) authority to check against.
     */
    domain?: string | undefined;
    /**
     * EIP-4361 message fields.
     */
    message: ExactPartial<SiweMessage>;
    /**
     * Random string to check against.
     */
    nonce?: string | undefined;
    /**
     * [RFC 3986](https://www.rfc-editor.org/rfc/rfc3986#section-3.1) URI scheme to check against.
     */
    scheme?: string | undefined;
    /**
     * Current time to check optional `expirationTime` and `notBefore` fields.
     *
     * @default new Date()
     */
    time?: Date | undefined;
};
export type ValidateSiweMessageReturnType = boolean;
/**
 * @description Validates EIP-4361 message.
 *
 * @see https://eips.ethereum.org/EIPS/eip-4361
 */
export declare function validateSiweMessage(parameters: ValidateSiweMessageParameters): ValidateSiweMessageReturnType;
//# sourceMappingURL=validateSiweMessage.d.ts.map