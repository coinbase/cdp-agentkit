import { ReceiptContainsNoWithdrawalsError } from '../errors/withdrawal.js';
import { getWithdrawals, } from '../utils/getWithdrawals.js';
import { getPortalVersion, } from './getPortalVersion.js';
import { waitForNextGame, } from './waitForNextGame.js';
import { waitForNextL2Output, } from './waitForNextL2Output.js';
/**
 * Waits until the L2 withdrawal transaction is ready to be proved. Used for the [Withdrawal](/op-stack/guides/withdrawals) flow.
 *
 * - Docs: https://viem.sh/op-stack/actions/waitToProve
 *
 * @param client - Client to use
 * @param parameters - {@link WaitToProveParameters}
 * @returns The L2 output and withdrawal message. {@link WaitToProveReturnType}
 *
 * @example
 * import { createPublicClient, http } from 'viem'
 * import { getBlockNumber } from 'viem/actions'
 * import { mainnet, optimism } from 'viem/chains'
 * import { waitToProve } from 'viem/op-stack'
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
 * await waitToProve(publicClientL1, {
 *   receipt,
 *   targetChain: optimism
 * })
 */
export async function waitToProve(client, parameters) {
    const { gameLimit, receipt } = parameters;
    const [withdrawal] = getWithdrawals(receipt);
    if (!withdrawal)
        throw new ReceiptContainsNoWithdrawalsError({
            hash: receipt.transactionHash,
        });
    const portalVersion = await getPortalVersion(client, parameters);
    // Legacy (Portal < v3)
    if (portalVersion.major < 3) {
        const output = await waitForNextL2Output(client, {
            ...parameters,
            l2BlockNumber: receipt.blockNumber,
        });
        return {
            game: {
                extraData: '0x',
                index: output.outputIndex,
                l2BlockNumber: output.l2BlockNumber,
                metadata: '0x',
                rootClaim: output.outputRoot,
                timestamp: output.timestamp,
            },
            output,
            withdrawal,
        };
    }
    const game = await waitForNextGame(client, {
        ...parameters,
        limit: gameLimit,
        l2BlockNumber: receipt.blockNumber,
    });
    return {
        game,
        output: {
            l2BlockNumber: game.l2BlockNumber,
            outputIndex: game.index,
            outputRoot: game.rootClaim,
            timestamp: game.timestamp,
        },
        withdrawal,
    };
}
//# sourceMappingURL=waitToProve.js.map