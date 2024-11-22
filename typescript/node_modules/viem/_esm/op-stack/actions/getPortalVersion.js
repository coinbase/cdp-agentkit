import { readContract, } from '../../actions/public/readContract.js';
import { withCache } from '../../utils/promise/withCache.js';
import { portal2Abi } from '../abis.js';
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
export async function getPortalVersion(client, parameters) {
    const { chain = client.chain, targetChain } = parameters;
    const portalAddress = (() => {
        if (parameters.portalAddress)
            return parameters.portalAddress;
        if (chain)
            return targetChain.contracts.portal[chain.id].address;
        return Object.values(targetChain.contracts.portal)[0].address;
    })();
    const version = await withCache(() => readContract(client, {
        abi: portal2Abi,
        address: portalAddress,
        functionName: 'version',
    }), { cacheKey: ['portalVersion', portalAddress].join('.'), cacheTime: 300 });
    const [major, minor, patch] = version.split('.').map(Number);
    return { major, minor, patch };
}
//# sourceMappingURL=getPortalVersion.js.map