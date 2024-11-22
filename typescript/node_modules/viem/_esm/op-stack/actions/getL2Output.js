import { readContract, } from '../../actions/public/readContract.js';
import { l2OutputOracleAbi } from '../abis.js';
import { getGame } from './getGame.js';
import { getPortalVersion, } from './getPortalVersion.js';
/**
 * Retrieves the first L2 output proposal that occurred after a provided block number.
 *
 * - Docs: https://viem.sh/op-stack/actions/getL2Output
 *
 * @param client - Client to use
 * @param parameters - {@link GetL2OutputParameters}
 * @returns The L2 output. {@link GetL2OutputReturnType}
 *
 * @example
 * import { createPublicClient, http } from 'viem'
 * import { mainnet, optimism } from 'viem/chains'
 * import { getL2Output } from 'viem/op-stack'
 *
 * const publicClientL1 = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 *
 * const output = await getL2Output(publicClientL1, {
 *   l2BlockNumber: 69420n,
 *   targetChain: optimism
 * })
 */
export async function getL2Output(client, parameters) {
    const { chain = client.chain, l2BlockNumber, targetChain } = parameters;
    const version = await getPortalVersion(client, parameters);
    if (version.major >= 3) {
        const game = await getGame(client, parameters);
        return {
            l2BlockNumber: game.l2BlockNumber,
            outputIndex: game.index,
            outputRoot: game.rootClaim,
            timestamp: game.timestamp,
        };
    }
    const l2OutputOracleAddress = (() => {
        if (parameters.l2OutputOracleAddress)
            return parameters.l2OutputOracleAddress;
        if (chain)
            return targetChain.contracts.l2OutputOracle[chain.id].address;
        return Object.values(targetChain.contracts.l2OutputOracle)[0].address;
    })();
    const outputIndex = await readContract(client, {
        address: l2OutputOracleAddress,
        abi: l2OutputOracleAbi,
        functionName: 'getL2OutputIndexAfter',
        args: [l2BlockNumber],
    });
    const output = await readContract(client, {
        address: l2OutputOracleAddress,
        abi: l2OutputOracleAbi,
        functionName: 'getL2Output',
        args: [outputIndex],
    });
    return { outputIndex, ...output };
}
//# sourceMappingURL=getL2Output.js.map