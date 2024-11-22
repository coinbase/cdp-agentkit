// Adapted from https://github.com/ethereum-optimism/optimism/blob/develop/packages/core-utils/src/optimism/deposit-transaction.ts#L117
import { concat } from '../../utils/data/concat.js';
import { pad } from '../../utils/data/pad.js';
import { toHex } from '../../utils/encoding/toHex.js';
import { keccak256, } from '../../utils/hash/keccak256.js';
const sourceHashDomainMap = {
    userDeposit: 0,
    l1InfoDeposit: 1,
};
export function getSourceHash({ domain, l1LogIndex, l1BlockHash, sequenceNumber, }) {
    const marker = toHex(l1LogIndex ?? sequenceNumber);
    const input = concat([l1BlockHash, pad(marker, { size: 32 })]);
    const depositIdHash = keccak256(input);
    const domainHex = toHex(sourceHashDomainMap[domain]);
    const domainInput = concat([pad(domainHex, { size: 32 }), depositIdHash]);
    return keccak256(domainInput);
}
//# sourceMappingURL=getSourceHash.js.map