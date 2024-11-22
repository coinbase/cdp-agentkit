// TODO(v3): Convert to sync.
import { secp256k1 } from '@noble/curves/secp256k1';
import { numberToHex, } from '../../utils/encoding/toHex.js';
import { serializeSignature } from '../../utils/signature/serializeSignature.js';
let extraEntropy = false;
/**
 * Sets extra entropy for signing functions.
 */
export function setSignEntropy(entropy) {
    if (!entropy)
        throw new Error('must be a `true` or a hex value.');
    extraEntropy = entropy;
}
/**
 * @description Signs a hash with a given private key.
 *
 * @param hash The hash to sign.
 * @param privateKey The private key to sign with.
 *
 * @returns The signature.
 */
export async function sign({ hash, privateKey, to = 'object', }) {
    const { r, s, recovery } = secp256k1.sign(hash.slice(2), privateKey.slice(2), { lowS: true, extraEntropy });
    const signature = {
        r: numberToHex(r, { size: 32 }),
        s: numberToHex(s, { size: 32 }),
        v: recovery ? 28n : 27n,
        yParity: recovery,
    };
    return (() => {
        if (to === 'bytes' || to === 'hex')
            return serializeSignature({ ...signature, to });
        return signature;
    })();
}
//# sourceMappingURL=sign.js.map