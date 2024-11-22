"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commitmentsToVersionedHashes = commitmentsToVersionedHashes;
const commitmentToVersionedHash_js_1 = require("./commitmentToVersionedHash.js");
function commitmentsToVersionedHashes(parameters) {
    const { commitments, version } = parameters;
    const to = parameters.to ?? (typeof commitments[0] === 'string' ? 'hex' : 'bytes');
    const hashes = [];
    for (const commitment of commitments) {
        hashes.push((0, commitmentToVersionedHash_js_1.commitmentToVersionedHash)({
            commitment,
            to,
            version,
        }));
    }
    return hashes;
}
//# sourceMappingURL=commitmentsToVersionedHashes.js.map