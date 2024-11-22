import { ContractFunctionRevertedError } from '../../errors/contract.js';
import { poll } from '../../utils/poll.js';
import { getL2Output, } from './getL2Output.js';
import { getTimeToNextL2Output, } from './getTimeToNextL2Output.js';
/**
 * Waits for the next L2 output (after the provided block number) to be submitted.
 *
 * - Docs: https://viem.sh/op-stack/actions/waitForNextL2Output
 *
 * @param client - Client to use
 * @param parameters - {@link WaitForNextL2OutputParameters}
 * @returns The L2 transaction hash. {@link WaitForNextL2OutputReturnType}
 *
 * @example
 * import { createPublicClient, http } from 'viem'
 * import { getBlockNumber } from 'viem/actions'
 * import { mainnet, optimism } from 'viem/chains'
 * import { waitForNextL2Output } from 'viem/op-stack'
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
 * const l2BlockNumber = await getBlockNumber(publicClientL2)
 * await waitForNextL2Output(publicClientL1, {
 *   l2BlockNumber,
 *   targetChain: optimism
 * })
 */
export async function waitForNextL2Output(client, parameters) {
    const { pollingInterval = client.pollingInterval } = parameters;
    const { seconds } = await getTimeToNextL2Output(client, parameters);
    return new Promise((resolve, reject) => {
        poll(async ({ unpoll }) => {
            try {
                const output = await getL2Output(client, parameters);
                unpoll();
                resolve(output);
            }
            catch (e) {
                const error = e;
                if (!(error.cause instanceof ContractFunctionRevertedError)) {
                    unpoll();
                    reject(e);
                }
            }
        }, {
            interval: pollingInterval,
            initialWaitTime: async () => seconds * 1000,
        });
    });
}
//# sourceMappingURL=waitForNextL2Output.js.map