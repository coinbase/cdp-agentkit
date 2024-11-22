"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimeToNextL2Output = getTimeToNextL2Output;
const multicall_js_1 = require("../../actions/public/multicall.js");
const readContract_js_1 = require("../../actions/public/readContract.js");
const abis_js_1 = require("../abis.js");
async function getTimeToNextL2Output(client, parameters) {
    const { intervalBuffer = 1.1, chain = client.chain, l2BlockNumber, targetChain, } = parameters;
    const l2OutputOracleAddress = (() => {
        if (parameters.l2OutputOracleAddress)
            return parameters.l2OutputOracleAddress;
        if (chain)
            return targetChain.contracts.l2OutputOracle[chain.id].address;
        return Object.values(targetChain.contracts.l2OutputOracle)[0].address;
    })();
    const [latestOutputIndex, blockTime, blockInterval] = await (0, multicall_js_1.multicall)(client, {
        allowFailure: false,
        contracts: [
            {
                abi: abis_js_1.l2OutputOracleAbi,
                address: l2OutputOracleAddress,
                functionName: 'latestOutputIndex',
            },
            {
                abi: abis_js_1.l2OutputOracleAbi,
                address: l2OutputOracleAddress,
                functionName: 'L2_BLOCK_TIME',
            },
            {
                abi: abis_js_1.l2OutputOracleAbi,
                address: l2OutputOracleAddress,
                functionName: 'SUBMISSION_INTERVAL',
            },
        ],
    });
    const latestOutput = await (0, readContract_js_1.readContract)(client, {
        abi: abis_js_1.l2OutputOracleAbi,
        address: l2OutputOracleAddress,
        functionName: 'getL2Output',
        args: [latestOutputIndex],
    });
    const latestOutputTimestamp = Number(latestOutput.timestamp) * 1000;
    const interval = Number(blockInterval * blockTime);
    const intervalWithBuffer = Math.ceil(interval * intervalBuffer);
    const now = Date.now();
    const seconds = (() => {
        if (now < latestOutputTimestamp)
            return 0;
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