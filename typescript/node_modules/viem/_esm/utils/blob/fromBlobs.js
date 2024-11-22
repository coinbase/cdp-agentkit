import { createCursor } from '../cursor.js';
import { hexToBytes } from '../encoding/toBytes.js';
import { bytesToHex } from '../encoding/toHex.js';
export function fromBlobs(parameters) {
    const to = parameters.to ?? (typeof parameters.blobs[0] === 'string' ? 'hex' : 'bytes');
    const blobs = (typeof parameters.blobs[0] === 'string'
        ? parameters.blobs.map((x) => hexToBytes(x))
        : parameters.blobs);
    const length = blobs.reduce((length, blob) => length + blob.length, 0);
    const data = createCursor(new Uint8Array(length));
    let active = true;
    for (const blob of blobs) {
        const cursor = createCursor(blob);
        while (active && cursor.position < blob.length) {
            // First byte will be a zero 0x00 byte – we can skip.
            cursor.incrementPosition(1);
            let consume = 31;
            if (blob.length - cursor.position < 31)
                consume = blob.length - cursor.position;
            for (const _ in Array.from({ length: consume })) {
                const byte = cursor.readByte();
                const isTerminator = byte === 0x80 && !cursor.inspectBytes(cursor.remaining).includes(0x80);
                if (isTerminator) {
                    active = false;
                    break;
                }
                data.pushByte(byte);
            }
        }
    }
    const trimmedData = data.bytes.slice(0, data.position);
    return (to === 'hex' ? bytesToHex(trimmedData) : trimmedData);
}
//# sourceMappingURL=fromBlobs.js.map