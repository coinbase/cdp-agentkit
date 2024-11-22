import { commitmentToVersionedHash, } from './commitmentToVersionedHash.js';
/**
 * Transforms a list of sidecars to their versioned hashes.
 *
 * @example
 * ```ts
 * import { toBlobSidecars, sidecarsToVersionedHashes, stringToHex } from 'viem'
 *
 * const sidecars = toBlobSidecars({ data: stringToHex('hello world') })
 * const versionedHashes = sidecarsToVersionedHashes({ sidecars })
 * ```
 */
export function sidecarsToVersionedHashes(parameters) {
    const { sidecars, version } = parameters;
    const to = parameters.to ?? (typeof sidecars[0].blob === 'string' ? 'hex' : 'bytes');
    const hashes = [];
    for (const { commitment } of sidecars) {
        hashes.push(commitmentToVersionedHash({
            commitment,
            to,
            version,
        }));
    }
    return hashes;
}
//# sourceMappingURL=sidecarsToVersionedHashes.js.map