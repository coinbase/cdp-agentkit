import { concatHex, } from '../../../utils/data/concat.js';
import { hexToBytes, } from '../../../utils/encoding/toBytes.js';
import { numberToHex, } from '../../../utils/encoding/toHex.js';
import { toRlp } from '../../../utils/encoding/toRlp.js';
import { keccak256, } from '../../../utils/hash/keccak256.js';
/**
 * Computes an Authorization hash in [EIP-7702 format](https://eips.ethereum.org/EIPS/eip-7702): `keccak256('0x05' || rlp([chain_id, address, nonce]))`.
 */
export function hashAuthorization(parameters) {
    const { chainId, contractAddress, nonce, to } = parameters;
    const hash = keccak256(concatHex([
        '0x05',
        toRlp([
            chainId ? numberToHex(chainId) : '0x',
            contractAddress,
            nonce ? numberToHex(nonce) : '0x',
        ]),
    ]));
    if (to === 'bytes')
        return hexToBytes(hash);
    return hash;
}
//# sourceMappingURL=hashAuthorization.js.map