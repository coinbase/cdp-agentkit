import type { ErrorType } from '../../errors/utils.js';
import { type ConcatErrorType } from '../data/concat.js';
import { type StringToBytesErrorType, type ToBytesErrorType } from '../encoding/toBytes.js';
import { type BytesToHexErrorType } from '../encoding/toHex.js';
import { type Keccak256ErrorType } from '../hash/keccak256.js';
import { type EncodedLabelToLabelhashErrorType } from './encodedLabelToLabelhash.js';
export type NamehashErrorType = BytesToHexErrorType | EncodedLabelToLabelhashErrorType | ToBytesErrorType | Keccak256ErrorType | StringToBytesErrorType | ConcatErrorType | ErrorType;
/**
 * @description Hashes ENS name
 *
 * - Since ENS names prohibit certain forbidden characters (e.g. underscore) and have other validation rules, you likely want to [normalize ENS names](https://docs.ens.domains/contract-api-reference/name-processing#normalising-names) with [UTS-46 normalization](https://unicode.org/reports/tr46) before passing them to `namehash`. You can use the built-in [`normalize`](https://viem.sh/docs/ens/utilities/normalize) function for this.
 *
 * @example
 * namehash('wevm.eth')
 * '0xf246651c1b9a6b141d19c2604e9a58f567973833990f830d882534a747801359'
 *
 * @link https://eips.ethereum.org/EIPS/eip-137
 */
export declare function namehash(name: string): `0x${string}`;
//# sourceMappingURL=namehash.d.ts.map