"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crypto = void 0;
// We prefer WebCrypto aka globalThis.crypto, which exists in node.js 16+.
// Falls back to Node.js built-in crypto for Node.js <=v14
// See utils.ts for details.
// @ts-ignore
const nc = require("node:crypto");
exports.crypto = nc && typeof nc === 'object' && 'webcrypto' in nc
    ? nc.webcrypto
    : nc && typeof nc === 'object' && 'randomBytes' in nc
        ? nc
        : undefined;
//# sourceMappingURL=cryptoNode.js.map