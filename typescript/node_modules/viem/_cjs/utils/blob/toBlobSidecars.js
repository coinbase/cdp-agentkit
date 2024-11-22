"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBlobSidecars = toBlobSidecars;
const blobsToCommitments_js_1 = require("./blobsToCommitments.js");
const blobsToProofs_js_1 = require("./blobsToProofs.js");
const toBlobs_js_1 = require("./toBlobs.js");
function toBlobSidecars(parameters) {
    const { data, kzg, to } = parameters;
    const blobs = parameters.blobs ?? (0, toBlobs_js_1.toBlobs)({ data: data, to });
    const commitments = parameters.commitments ?? (0, blobsToCommitments_js_1.blobsToCommitments)({ blobs, kzg: kzg, to });
    const proofs = parameters.proofs ?? (0, blobsToProofs_js_1.blobsToProofs)({ blobs, commitments, kzg: kzg, to });
    const sidecars = [];
    for (let i = 0; i < blobs.length; i++)
        sidecars.push({
            blob: blobs[i],
            commitment: commitments[i],
            proof: proofs[i],
        });
    return sidecars;
}
//# sourceMappingURL=toBlobSidecars.js.map