"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBlobs = toBlobs;
const blob_js_1 = require("../../constants/blob.js");
const blob_js_2 = require("../../errors/blob.js");
const cursor_js_1 = require("../cursor.js");
const size_js_1 = require("../data/size.js");
const toBytes_js_1 = require("../encoding/toBytes.js");
const toHex_js_1 = require("../encoding/toHex.js");
function toBlobs(parameters) {
    const to = parameters.to ?? (typeof parameters.data === 'string' ? 'hex' : 'bytes');
    const data = (typeof parameters.data === 'string'
        ? (0, toBytes_js_1.hexToBytes)(parameters.data)
        : parameters.data);
    const size_ = (0, size_js_1.size)(data);
    if (!size_)
        throw new blob_js_2.EmptyBlobError();
    if (size_ > blob_js_1.maxBytesPerTransaction)
        throw new blob_js_2.BlobSizeTooLargeError({
            maxSize: blob_js_1.maxBytesPerTransaction,
            size: size_,
        });
    const blobs = [];
    let active = true;
    let position = 0;
    while (active) {
        const blob = (0, cursor_js_1.createCursor)(new Uint8Array(blob_js_1.bytesPerBlob));
        let size = 0;
        while (size < blob_js_1.fieldElementsPerBlob) {
            const bytes = data.slice(position, position + (blob_js_1.bytesPerFieldElement - 1));
            blob.pushByte(0x00);
            blob.pushBytes(bytes);
            if (bytes.length < 31) {
                blob.pushByte(0x80);
                active = false;
                break;
            }
            size++;
            position += 31;
        }
        blobs.push(blob);
    }
    return (to === 'bytes'
        ? blobs.map((x) => x.bytes)
        : blobs.map((x) => (0, toHex_js_1.bytesToHex)(x.bytes)));
}
//# sourceMappingURL=toBlobs.js.map