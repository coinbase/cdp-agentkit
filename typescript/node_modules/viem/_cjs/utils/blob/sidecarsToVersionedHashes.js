"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sidecarsToVersionedHashes = sidecarsToVersionedHashes;
const commitmentToVersionedHash_js_1 = require("./commitmentToVersionedHash.js");
function sidecarsToVersionedHashes(parameters) {
    const { sidecars, version } = parameters;
    const to = parameters.to ?? (typeof sidecars[0].blob === 'string' ? 'hex' : 'bytes');
    const hashes = [];
    for (const { commitment } of sidecars) {
        hashes.push((0, commitmentToVersionedHash_js_1.commitmentToVersionedHash)({
            commitment,
            to,
            version,
        }));
    }
    return hashes;
}
//# sourceMappingURL=sidecarsToVersionedHashes.js.map