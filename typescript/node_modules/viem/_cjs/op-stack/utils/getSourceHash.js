"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSourceHash = getSourceHash;
const concat_js_1 = require("../../utils/data/concat.js");
const pad_js_1 = require("../../utils/data/pad.js");
const toHex_js_1 = require("../../utils/encoding/toHex.js");
const keccak256_js_1 = require("../../utils/hash/keccak256.js");
const sourceHashDomainMap = {
    userDeposit: 0,
    l1InfoDeposit: 1,
};
function getSourceHash({ domain, l1LogIndex, l1BlockHash, sequenceNumber, }) {
    const marker = (0, toHex_js_1.toHex)(l1LogIndex ?? sequenceNumber);
    const input = (0, concat_js_1.concat)([l1BlockHash, (0, pad_js_1.pad)(marker, { size: 32 })]);
    const depositIdHash = (0, keccak256_js_1.keccak256)(input);
    const domainHex = (0, toHex_js_1.toHex)(sourceHashDomainMap[domain]);
    const domainInput = (0, concat_js_1.concat)([(0, pad_js_1.pad)(domainHex, { size: 32 }), depositIdHash]);
    return (0, keccak256_js_1.keccak256)(domainInput);
}
//# sourceMappingURL=getSourceHash.js.map