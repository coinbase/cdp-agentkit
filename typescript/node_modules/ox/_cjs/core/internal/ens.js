"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.packetToBytes = packetToBytes;
exports.wrapLabelhash = wrapLabelhash;
exports.unwrapLabelhash = unwrapLabelhash;
const index_js_1 = require("../../index.js");
const Ens = require("../Ens.js");
const Hex = require("../Hex.js");
function packetToBytes(packet) {
    const value = packet.replace(/^\.|\.$/gm, '');
    if (value.length === 0)
        return new Uint8Array(1);
    const bytes = new Uint8Array(index_js_1.Bytes.fromString(value).byteLength + 2);
    let offset = 0;
    const list = value.split('.');
    for (let i = 0; i < list.length; i++) {
        let encoded = index_js_1.Bytes.fromString(list[i]);
        if (encoded.byteLength > 255)
            encoded = index_js_1.Bytes.fromString(wrapLabelhash(Ens.labelhash(list[i])));
        bytes[offset] = encoded.length;
        bytes.set(encoded, offset + 1);
        offset += encoded.length + 1;
    }
    if (bytes.byteLength !== offset + 1)
        return bytes.slice(0, offset + 1);
    return bytes;
}
function wrapLabelhash(hash) {
    return `[${hash.slice(2)}]`;
}
function unwrapLabelhash(label) {
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