"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.packetToBytes = packetToBytes;
const toBytes_js_1 = require("../encoding/toBytes.js");
const encodeLabelhash_js_1 = require("./encodeLabelhash.js");
const labelhash_js_1 = require("./labelhash.js");
function packetToBytes(packet) {
    const value = packet.replace(/^\.|\.$/gm, '');
    if (value.length === 0)
        return new Uint8Array(1);
    const bytes = new Uint8Array((0, toBytes_js_1.stringToBytes)(value).byteLength + 2);
    let offset = 0;
    const list = value.split('.');
    for (let i = 0; i < list.length; i++) {
        let encoded = (0, toBytes_js_1.stringToBytes)(list[i]);
        if (encoded.byteLength > 255)
            encoded = (0, toBytes_js_1.stringToBytes)((0, encodeLabelhash_js_1.encodeLabelhash)((0, labelhash_js_1.labelhash)(list[i])));
        bytes[offset] = encoded.length;
        bytes.set(encoded, offset + 1);
        offset += encoded.length + 1;
    }
    if (bytes.byteLength !== offset + 1)
        return bytes.slice(0, offset + 1);
    return bytes;
}
//# sourceMappingURL=packetToBytes.js.map