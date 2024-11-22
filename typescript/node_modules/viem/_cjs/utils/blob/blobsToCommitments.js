"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blobsToCommitments = blobsToCommitments;
const toBytes_js_1 = require("../encoding/toBytes.js");
const toHex_js_1 = require("../encoding/toHex.js");
function blobsToCommitments(parameters) {
    const { kzg } = parameters;
    const to = parameters.to ?? (typeof parameters.blobs[0] === 'string' ? 'hex' : 'bytes');
    const blobs = (typeof parameters.blobs[0] === 'string'
        ? parameters.blobs.map((x) => (0, toBytes_js_1.hexToBytes)(x))
        : parameters.blobs);
    const commitments = [];
    for (const blob of blobs)
        commitments.push(Uint8Array.from(kzg.blobToKzgCommitment(blob)));
    return (to === 'bytes'
        ? commitments
        : commitments.map((x) => (0, toHex_js_1.bytesToHex)(x)));
}
//# sourceMappingURL=blobsToCommitments.js.map