import { getPortalVersion, } from './getPortalVersion.js';
import { getTimeToNextGame, } from './getTimeToNextGame.js';
import { getTimeToNextL2Output, } from './getTimeToNextL2Output.js';
/**
 * Returns the time until the withdrawal transaction is ready to prove. Used for the [Withdrawal](/op-stack/guides/withdrawals) flow.
 *
 * - Docs: https://viem.sh/op-stack/actions/getTimeToProve
 *
 * @param client - Client to use
 * @param parameters - {@link GetTimeToNextL2OutputParameters}
 * @returns Time until prove step is ready. {@link GetTimeToNextL2OutputReturnType}
 *
 * @example
 * import { createPublicClient, http } from 'viem'
 * import { getBlockNumber } from 'viem/actions'
 * import { mainnet, optimism } from 'viem/chains'
 * import { getTimeToProve } from 'viem/op-stack'
 *
 * const publicClientL1 = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const publicClientL2 = createPublicClient({
 *   chain: optimism,
 *   transport: http(),
 * })
 *
 * const receipt = await publicClientL2.getTransactionReceipt({ hash: '0x...' })
 * const { period, seconds, timestamp } = await getTimeToProve(publicClientL1, {
 *   receipt,
 *   targetChain: optimism
 * })
 */
export async function getTimeToProve(client, parameters) {
    const { receipt } = parameters;
    const portalVersion = await getPortalVersion(client, parameters);
    // Legacy
    if (portalVersion.major < 3)
        return getTimeToNextL2Output(client, {
            ...parameters,
            l2BlockNumber: receipt.blockNumber,
        });
    return getTimeToNextGame(client, {
        ...parameters,
        l2BlockNumber: receipt.blockNumber,
    });
}
//# sourceMappingURL=getTimeToProve.js.map