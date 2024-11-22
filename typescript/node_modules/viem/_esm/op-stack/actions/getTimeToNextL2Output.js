import { multicall, } from '../../actions/public/multicall.js';
import { readContract, } from '../../actions/public/readContract.js';
import { l2OutputOracleAbi } from '../abis.js';
/**
 * Returns the time until the next L2 output (after the provided block number) is submitted. Used for the [Withdrawal](/op-stack/guides/withdrawals) flow.
 *
 * - Docs: https://viem.sh/op-stack/actions/getTimeToNextL2Output
 *
 * @param client - Client to use
 * @param parameters - {@link GetTimeToNextL2OutputParameters}
 * @returns The L2 transaction hash. {@link GetTimeToNextL2OutputReturnType}
 *
 * @example
 * import { createPublicClient, http } from 'viem'
 * import { getBlockNumber } from 'viem/actions'
 * import { mainnet, optimism } from 'viem/chains'
 * import { getTimeToNextL2Output } from 'viem/op-stack'
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
 * const { seconds } = await getTimeToNextL2Output(publicClientL1, {
 *   targetChain: optimism
 * })
 */
export async function getTimeToNextL2Output(client, parameters) {
    const { intervalBuffer = 1.1, chain = client.chain, l2BlockNumber, targetChain, } = parameters;
    const l2OutputOracleAddress = (() => {
        if (parameters.l2OutputOracleAddress)
            return parameters.l2OutputOracleAddress;
        if (chain)
            return targetChain.contracts.l2OutputOracle[chain.id].address;
        return Object.values(targetChain.contracts.l2OutputOracle)[0].address;
    })();
    const [latestOutputIndex, blockTime, blockInterval] = await multicall(client, {
        allowFailure: false,
        contracts: [
            {
                abi: l2OutputOracleAbi,
                address: l2OutputOracleAddress,
                functionName: 'latestOutputIndex',
            },
            {
                abi: l2OutputOracleAbi,
                address: l2OutputOracleAddress,
                functionName: 'L2_BLOCK_TIME',
            },
            {
                abi: l2OutputOracleAbi,
                address: l2OutputOracleAddress,
                functionName: 'SUBMISSION_INTERVAL',
            },
        ],
    });
    const latestOutput = await readContract(client, {
        abi: l2OutputOracleAbi,
        address: l2OutputOracleAddress,
        functionName: 'getL2Output',
        args: [latestOutputIndex],
    });
    const latestOutputTimestamp = Number(latestOutput.timestamp) * 1000;
    const interval = Number(blockInterval * blockTime);
    const intervalWithBuffer = Math.ceil(interval * intervalBuffer);
    const now = Date.now();
    const seconds = (() => {
        // If the current timestamp is lesser than the latest L2 output timestamp,
        // then we assume that the L2 output has already been submitted.
        if (now < latestOutputTimestamp)
            return 0;
        // If the latest L2 output block is newer than the provided L2 block number,
        // then we assume that the L2 output has already been submitted.
        if (latestOutput.l2BlockNumber > l2BlockNumber)
            return 0;
        const elapsedBlocks = Number(l2BlockNumber - latestOutput.l2BlockNumber);
        const elapsed = Math.ceil((now - latestOutputTimestamp) / 1000);
        const secondsToNextOutput = intervalWithBuffer - (elapsed % intervalWithBuffer);
        return elapsedBlocks < blockInterval
            ? secondsToNextOutput
            : Math.floor(elapsedBlocks / Number(blockInterval)) * intervalWithBuffer +
                secondsToNextOutput;
    })();
    const timestamp = seconds > 0 ? now + seconds * 1000 : undefined;
    return { interval, seconds, timestamp };
}
//# sourceMappingURL=getTimeToNextL2Output.js.map