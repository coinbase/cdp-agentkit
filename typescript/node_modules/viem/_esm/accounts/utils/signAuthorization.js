import { hashAuthorization, } from '../../experimental/eip7702/utils/hashAuthorization.js';
import { sign, } from './sign.js';
/**
 * Signs an Authorization hash in [EIP-7702 format](https://eips.ethereum.org/EIPS/eip-7702): `keccak256('0x05' || rlp([chain_id, address, nonce]))`.
 */
export async function experimental_signAuthorization(parameters) {
    const { contractAddress, chainId, nonce, privateKey, to = 'object', } = parameters;
    const signature = await sign({
        hash: hashAuthorization({ contractAddress, chainId, nonce }),
        privateKey,
        to,
    });
    if (to === 'object')
        return {
            contractAddress,
            chainId,
            nonce,
            ...signature,
        };
    return signature;
}
//# sourceMappingURL=signAuthorization.js.map