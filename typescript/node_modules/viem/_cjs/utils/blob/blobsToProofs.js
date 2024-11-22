"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blobsToProofs = blobsToProofs;
const toBytes_js_1 = require("../encoding/toBytes.js");
const toHex_js_1 = require("../encoding/toHex.js");
function blobsToProofs(parameters) {
    const { kzg } = parameters;
    const to = parameters.to ?? (typeof parameters.blobs[0] === 'string' ? 'hex' : 'bytes');
    const blobs = (typeof parameters.blobs[0] === 'string'
        ? parameters.blobs.map((x) => (0, toBytes_js_1.hexToBytes)(x))
        : parameters.blobs);
    const commitments = (typeof parameters.commitments[0] === 'string'
        ? parameters.commitments.map((x) => (0, toBytes_js_1.hexToBytes)(x))
        : parameters.commitments);
    const proofs = [];
    for (let i = 0; i < blobs.length; i++) {
        const blob = blobs[i];
        const commitment = commitments[i];
        proofs.push(Uint8Array.from(kzg.computeBlobKzgProof(blob, commitment)));
    }
    return (to === 'bytes'
        ? proofs
        : proofs.map((x) => (0, toHex_js_1.bytesToHex)(x)));
}
//# sourceMappingURL=blobsToProofs.js.map