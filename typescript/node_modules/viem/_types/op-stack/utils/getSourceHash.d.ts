import type { ErrorType } from '../../errors/utils.js';
import type { Hex } from '../../types/misc.js';
import { type ConcatErrorType } from '../../utils/data/concat.js';
import { type PadErrorType } from '../../utils/data/pad.js';
import { type ToHexErrorType } from '../../utils/encoding/toHex.js';
import { type Keccak256ErrorType } from '../../utils/hash/keccak256.js';
export type GetSourceHashParameters = {
    /** The L1 block hash. */
    l1BlockHash: Hex;
} & ({
    /** Domain of source hash. */
    domain: 'userDeposit';
    /** The index of the log on the L1. */
    l1LogIndex: number;
    /** The sequence number. */
    sequenceNumber?: undefined;
} | {
    /** Domain of source hash. */
    domain: 'l1InfoDeposit';
    /** The index of the log on the L1. */
    l1LogIndex?: undefined;
    /** The sequence number. */
    sequenceNumber: number;
});
export type GetSourceHashReturnType = Hex;
export type GetSourceHashErrorType = ConcatErrorType | Keccak256ErrorType | PadErrorType | ToHexErrorType | ErrorType;
export declare function getSourceHash({ domain, l1LogIndex, l1BlockHash, sequenceNumber, }: GetSourceHashParameters): `0x${string}`;
//# sourceMappingURL=getSourceHash.d.ts.map