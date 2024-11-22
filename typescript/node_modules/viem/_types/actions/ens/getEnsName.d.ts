import type { Address } from 'abitype';
import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import type { ErrorType } from '../../errors/utils.js';
import type { Chain } from '../../types/chain.js';
import type { Prettify } from '../../types/utils.js';
import { type GetChainContractAddressErrorType } from '../../utils/chain/getChainContractAddress.js';
import { type ToHexErrorType } from '../../utils/encoding/toHex.js';
import { type PacketToBytesErrorType } from '../../utils/ens/packetToBytes.js';
import { type ReadContractErrorType, type ReadContractParameters } from '../public/readContract.js';
export type GetEnsNameParameters = Prettify<Pick<ReadContractParameters, 'blockNumber' | 'blockTag'> & {
    /** Address to get ENS name for. */
    address: Address;
    /** Universal Resolver gateway URLs to use for resolving CCIP-read requests. */
    gatewayUrls?: string[] | undefined;
    /** Whether or not to throw errors propagated from the ENS Universal Resolver Contract. */
    strict?: boolean | undefined;
    /** Address of ENS Universal Resolver Contract. */
    universalResolverAddress?: Address | undefined;
}>;
export type GetEnsNameReturnType = string | null;
export type GetEnsNameErrorType = GetChainContractAddressErrorType | ReadContractErrorType | ToHexErrorType | PacketToBytesErrorType | ErrorType;
/**
 * Gets primary name for specified address.
 *
 * - Docs: https://viem.sh/docs/ens/actions/getEnsName
 * - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/ens
 *
 * Calls `reverse(bytes)` on ENS Universal Resolver Contract to "reverse resolve" the address to the primary ENS name.
 *
 * @param client - Client to use
 * @param parameters - {@link GetEnsNameParameters}
 * @returns Name or `null` if not found. {@link GetEnsNameReturnType}
 *
 * @example
 * import { createPublicClient, http } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { getEnsName } from 'viem/ens'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const ensName = await getEnsName(client, {
 *   address: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
 * })
 * // 'wevm.eth'
 */
export declare function getEnsName<chain extends Chain | undefined>(client: Client<Transport, chain>, { address, blockNumber, blockTag, gatewayUrls, strict, universalResolverAddress: universalResolverAddress_, }: GetEnsNameParameters): Promise<GetEnsNameReturnType>;
//# sourceMappingURL=getEnsName.d.ts.map