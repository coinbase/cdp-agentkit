import { readContract, } from '../../actions/public/readContract.js';
import { decodeAbiParameters } from '../../utils/abi/decodeAbiParameters.js';
import { disputeGameFactoryAbi, portal2Abi } from '../abis.js';
/**
 * Retrieves dispute games for an L2.
 *
 * - Docs: https://viem.sh/op-stack/actions/getGame
 *
 * @param client - Client to use
 * @param parameters - {@link GetGameParameters}
 * @returns Dispute games. {@link GetGameReturnType}
 *
 * @example
 * import { createPublicClient, http } from 'viem'
 * import { mainnet, optimism } from 'viem/chains'
 * import { getGames } from 'viem/op-stack'
 *
 * const publicClientL1 = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 *
 * const games = await getGames(publicClientL1, {
 *   targetChain: optimism
 * })
 */
export async function getGames(client, parameters) {
    const { chain = client.chain, l2BlockNumber, limit = 100, targetChain, } = parameters;
    const portalAddress = (() => {
        if (parameters.portalAddress)
            return parameters.portalAddress;
        if (chain)
            return targetChain.contracts.portal[chain.id].address;
        return Object.values(targetChain.contracts.portal)[0].address;
    })();
    const disputeGameFactoryAddress = (() => {
        if (parameters.disputeGameFactoryAddress)
            return parameters.disputeGameFactoryAddress;
        if (chain)
            return targetChain.contracts.disputeGameFactory[chain.id].address;
        return Object.values(targetChain.contracts.disputeGameFactory)[0].address;
    })();
    const [gameCount, gameType] = await Promise.all([
        readContract(client, {
            abi: disputeGameFactoryAbi,
            functionName: 'gameCount',
            args: [],
            address: disputeGameFactoryAddress,
        }),
        readContract(client, {
            abi: portal2Abi,
            functionName: 'respectedGameType',
            address: portalAddress,
        }),
    ]);
    const games = (await readContract(client, {
        abi: disputeGameFactoryAbi,
        functionName: 'findLatestGames',
        address: disputeGameFactoryAddress,
        args: [
            gameType,
            BigInt(Math.max(0, Number(gameCount - 1n))),
            BigInt(Math.min(limit, Number(gameCount))),
        ],
    }))
        .map((game) => {
        const [blockNumber] = decodeAbiParameters([{ type: 'uint256' }], game.extraData);
        return !l2BlockNumber || blockNumber > l2BlockNumber
            ? { ...game, l2BlockNumber: blockNumber }
            : null;
    })
        .filter(Boolean);
    return games;
}
//# sourceMappingURL=getGames.js.map