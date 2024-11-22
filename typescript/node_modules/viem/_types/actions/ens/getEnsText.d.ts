import type { Address } from 'abitype';
import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import type { Chain } from '../../types/chain.js';
import type { Prettify } from '../../types/utils.js';
import { type DecodeFunctionResultErrorType } from '../../utils/abi/decodeFunctionResult.js';
import { type EncodeFunctionDataErrorType } from '../../utils/abi/encodeFunctionData.js';
import { type GetChainContractAddressErrorType } from '../../utils/chain/getChainContractAddress.js';
import { type ToHexErrorType } from '../../utils/encoding/toHex.js';
import { type NamehashErrorType } from '../../utils/ens/namehash.js';
import { type PacketToBytesErrorType } from '../../utils/ens/packetToBytes.js';
import { type ReadContractErrorType, type ReadContractParameters } from '../public/readContract.js';
export type GetEnsTextParameters = Prettify<Pick<ReadContractParameters, 'blockNumber' | 'blockTag'> & {
    /** ENS name to get Text for. */
    name: string;
    /** Universal Resolver gateway URLs to use for resolving CCIP-read requests. */
    gatewayUrls?: string[] | undefined;
    /** Text record to retrieve. */
    key: string;
    /** Whether or not to throw errors propagated from the ENS Universal Resolver Contract. */
    strict?: boolean | undefined;
    /** Address of ENS Universal Resolver Contract. */
    universalResolverAddress?: Address | undefined;
}>;
export type GetEnsTextReturnType = string | null;
export type GetEnsTextErrorType = GetChainContractAddressErrorType | ReadContractErrorType | ToHexErrorType | PacketToBytesErrorType | EncodeFunctionDataErrorType | NamehashErrorType | DecodeFunctionResultErrorType;
/**
 * Gets a text record for specified ENS name.
 *
 * - Docs: https://viem.sh/docs/ens/actions/getEnsResolver
 * - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/ens
 *
 * Calls `resolve(bytes, bytes)` on ENS Universal Resolver Contract.
 *
 * Since ENS names prohibit certain forbidden characters (e.g. underscore) and have other validation rules, you likely want to [normalize ENS names](https://docs.ens.domains/contract-api-reference/name-processing#normalising-names) with [UTS-46 normalization](https://unicode.org/reports/tr46) before passing them to `getEnsAddress`. You can use the built-in [`normalize`](https://viem.sh/docs/ens/utilities/normalize) function for this.
 *
 * @param client - Client to use
 * @param parameters - {@link GetEnsTextParameters}
 * @returns Address for ENS resolver. {@link GetEnsTextReturnType}
 *
 * @example
 * import { createPublicClient, http } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { getEnsText, normalize } from 'viem/ens'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const twitterRecord = await getEnsText(client, {
 *   name: normalize('wevm.eth'),
 *   key: 'com.twitter',
 * })
 * // 'wevm_dev'
 */
export declare function getEnsText<chain extends Chain | undefined>(client: Client<Transport, chain>, { blockNumber, blockTag, name, key, gatewayUrls, strict, universalResolverAddress: universalResolverAddress_, }: GetEnsTextParameters): Promise<GetEnsTextReturnType>;
//# sourceMappingURL=getEnsText.d.ts.map