import { Bytes } from '../../index.js';
import * as Ens from '../Ens.js';
import * as Hex from '../Hex.js';
/**
 * @internal
 * Encodes a [DNS packet](https://docs.ens.domains/resolution/names#dns) into a ByteArray containing a UDP payload.
 */
export function packetToBytes(packet) {
    // strip leading and trailing `.`
    const value = packet.replace(/^\.|\.$/gm, '');
    if (value.length === 0)
        return new Uint8Array(1);
    const bytes = new Uint8Array(Bytes.fromString(value).byteLength + 2);
    let offset = 0;
    const list = value.split('.');
    for (let i = 0; i < list.length; i++) {
        let encoded = Bytes.fromString(list[i]);
        // if the length is > 255, make the encoded label value a labelhash
        // this is compatible with the universal resolver
        if (encoded.byteLength > 255)
            encoded = Bytes.fromString(wrapLabelhash(Ens.labelhash(list[i])));
        bytes[offset] = encoded.length;
        bytes.set(encoded, offset + 1);
        offset += encoded.length + 1;
    }
    if (bytes.byteLength !== offset + 1)
        return bytes.slice(0, offset + 1);
    return bytes;
}
/** @internal */
export function wrapLabelhash(hash) {
    return `[${hash.slice(2)}]`;
}
/** @internal */
export function unwrapLabelhash(label) {
    if (label.length !== 66)
        return null;
    if (label.indexOf('[') !== 0)
        return null;
    if (label.indexOf(']') !== 65)
        return null;
    const hash = `0x${label.slice(1, 65)}`;
    if (!Hex.validate(hash, { strict: true }))
        return null;
    return hash;
}
//# sourceMappingURL=ens.js.map