"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromBlobs = fromBlobs;
const cursor_js_1 = require("../cursor.js");
const toBytes_js_1 = require("../encoding/toBytes.js");
const toHex_js_1 = require("../encoding/toHex.js");
function fromBlobs(parameters) {
    const to = parameters.to ?? (typeof parameters.blobs[0] === 'string' ? 'hex' : 'bytes');
    const blobs = (typeof parameters.blobs[0] === 'string'
        ? parameters.blobs.map((x) => (0, toBytes_js_1.hexToBytes)(x))
        : parameters.blobs);
    const length = blobs.reduce((length, blob) => length + blob.length, 0);
    const data = (0, cursor_js_1.createCursor)(new Uint8Array(length));
    let active = true;
    for (const blob of blobs) {
        const cursor = (0, cursor_js_1.createCursor)(blob);
        while (active && cursor.position < blob.length) {
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
    return (to === 'hex' ? (0, toHex_js_1.bytesToHex)(trimmedData) : trimmedData);
}
//# sourceMappingURL=fromBlobs.js.map