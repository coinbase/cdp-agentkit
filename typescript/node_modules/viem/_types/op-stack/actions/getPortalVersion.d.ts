import { type ReadContractErrorType } from '../../actions/public/readContract.js';
import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import type { ErrorType } from '../../errors/utils.js';
import type { Chain, DeriveChain, GetChainParameter } from '../../types/chain.js';
import type { GetContractAddressParameter } from '../types/contract.js';
export type GetPortalVersionParameters<chain extends Chain | undefined = Chain | undefined, chainOverride extends Chain | undefined = Chain | undefined, _derivedChain extends Chain | undefined = DeriveChain<chain, chainOverride>> = GetChainParameter<chain, chainOverride> & GetContractAddressParameter<_derivedChain, 'portal'>;
export type GetPortalVersionReturnType = {
    major: number;
    minor: number;
    patch: number;
};
export type GetPortalVersionErrorType = ReadContractErrorType | ErrorType;
/**
 * Retrieves the current version of the Portal contract.
 *
 * - Docs: https://viem.sh/op-stack/actions/getPortalVersion
 *
 * @param client - Client to use
 * @param parameters - {@link GetPortalVersionParameters}
 * @returns The version object.
 *
 * @example
 * import { createPublicClient, http } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { getPortalVersion } from 'viem/op-stack'
 *
 * const publicClientL1 = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 *
 * const version = await getPortalVersion(publicClientL1, {
 *   targetChain: optimism,
 * })
 *
 * if (version.major > 3)
 *   console.log('Fault proofs are enabled on this version of optimism')
 * console.log('Fault proofs are not enabled on this version of optimism')
 */
export declare function getPortalVersion<chain extends Chain | undefined, chainOverride extends Chain | undefined = undefined>(client: Client<Transport, chain>, parameters: GetPortalVersionParameters<chain, chainOverride>): Promise<{
    major: number;
    minor: number;
    patch: number;
}>;
//# sourceMappingURL=getPortalVersion.d.ts.map