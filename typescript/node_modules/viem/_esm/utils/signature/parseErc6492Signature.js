import { decodeAbiParameters, } from '../abi/decodeAbiParameters.js';
import { isErc6492Signature, } from './isErc6492Signature.js';
/**
 * @description Parses a hex-formatted ERC-6492 flavoured signature.
 * If the signature is not in ERC-6492 format, then the underlying (original) signature is returned.
 *
 * @param signature ERC-6492 signature in hex format.
 * @returns The parsed ERC-6492 signature.
 *
 * @example
 * parseSignature('0x000000000000000000000000cafebabecafebabecafebabecafebabecafebabe000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000004deadbeef000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000041a461f509887bd19e312c0c58467ce8ff8e300d3c1a90b608a760c5b80318eaf15fe57c96f9175d6cd4daad4663763baa7e78836e067d0163e9a2ccf2ff753f5b1b000000000000000000000000000000000000000000000000000000000000006492649264926492649264926492649264926492649264926492649264926492')
 * // { address: '0x...', data: '0x...', signature: '0x...' }
 */
export function parseErc6492Signature(signature) {
    if (!isErc6492Signature(signature))
        return { signature };
    const [address, data, signature_] = decodeAbiParameters([{ type: 'address' }, { type: 'bytes' }, { type: 'bytes' }], signature);
    return { address, data, signature: signature_ };
}
//# sourceMappingURL=parseErc6492Signature.js.map