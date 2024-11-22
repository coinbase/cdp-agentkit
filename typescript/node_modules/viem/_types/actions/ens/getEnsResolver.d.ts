import type { Address } from 'abitype';
import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import type { ErrorType } from '../../errors/utils.js';
import type { Chain } from '../../types/chain.js';
import type { Prettify } from '../../types/utils.js';
import { type GetChainContractAddressErrorType } from '../../utils/chain/getChainContractAddress.js';
import { type ToHexErrorType } from '../../utils/encoding/toHex.js';
import { type PacketToBytesErrorType } from '../../utils/ens/packetToBytes.js';
import { type ReadContractParameters } from '../public/readContract.js';
export type GetEnsResolverParameters = Prettify<Pick<ReadContractParameters, 'blockNumber' | 'blockTag'> & {
    /** Name to get the address for. */
    name: string;
    /** Address of ENS Universal Resolver Contract. */
    universalResolverAddress?: Address | undefined;
}>;
export type GetEnsResolverReturnType = Address;
export type GetEnsResolverErrorType = GetChainContractAddressErrorType | ToHexErrorType | PacketToBytesErrorType | ErrorType;
/**
 * Gets resolver for ENS name.
 *
 * - Docs: https://viem.sh/docs/ens/actions/getEnsResolver
 * - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/ens
 *
 * Calls `findResolver(bytes)` on ENS Universal Resolver Contract to retrieve the resolver of an ENS name.
 *
 * Since ENS names prohibit certain forbidden characters (e.g. underscore) and have other validation rules, you likely want to [normalize ENS names](https://docs.ens.domains/contract-api-reference/name-processing#normalising-names) with [UTS-46 normalization](https://unicode.org/reports/tr46) before passing them to `getEnsAddress`. You can use the built-in [`normalize`](https://viem.sh/docs/ens/utilities/normalize) function for this.
 *
 * @param client - Client to use
 * @param parameters - {@link GetEnsResolverParameters}
 * @returns Address for ENS resolver. {@link GetEnsResolverReturnType}
 *
 * @example
 * import { createPublicClient, http } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { getEnsResolver, normalize } from 'viem/ens'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const resolverAddress = await getEnsResolver(client, {
 *   name: normalize('wevm.eth'),
 * })
 * // '0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41'
 */
export declare function getEnsResolver<chain extends Chain | undefined>(client: Client<Transport, chain>, { blockNumber, blockTag, name, universalResolverAddress: universalResolverAddress_, }: GetEnsResolverParameters): Promise<`0x${string}`>;
//# sourceMappingURL=getEnsResolver.d.ts.map