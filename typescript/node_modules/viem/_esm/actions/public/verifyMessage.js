import { hashMessage } from '../../utils/signature/hashMessage.js';
import { verifyHash, } from './verifyHash.js';
/**
 * Verify that a message was signed by the provided address.
 *
 * Compatible with Smart Contract Accounts & Externally Owned Accounts via [ERC-6492](https://eips.ethereum.org/EIPS/eip-6492).
 *
 * - Docs {@link https://viem.sh/docs/actions/public/verifyMessage}
 *
 * @param client - Client to use.
 * @param parameters - {@link VerifyMessageParameters}
 * @returns Whether or not the signature is valid. {@link VerifyMessageReturnType}
 */
export async function verifyMessage(client, { address, message, factory, factoryData, signature, ...callRequest }) {
    const hash = hashMessage(message);
    return verifyHash(client, {
        address,
        factory: factory,
        factoryData: factoryData,
        hash,
        signature,
        ...callRequest,
    });
}
//# sourceMappingURL=verifyMessage.js.map