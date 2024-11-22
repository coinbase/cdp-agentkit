"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maxBytesPerTransaction = exports.bytesPerBlob = exports.fieldElementsPerBlob = exports.bytesPerFieldElement = void 0;
const blobsPerTransaction = 6;
exports.bytesPerFieldElement = 32;
exports.fieldElementsPerBlob = 4096;
exports.bytesPerBlob = exports.bytesPerFieldElement * exports.fieldElementsPerBlob;
exports.maxBytesPerTransaction = exports.bytesPerBlob * blobsPerTransaction -
    1 -
    1 * exports.fieldElementsPerBlob * blobsPerTransaction;
//# sourceMappingURL=blob.js.map