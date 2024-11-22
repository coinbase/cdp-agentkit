"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multicall = multicall;
const abis_js_1 = require("../../constants/abis.js");
const abi_js_1 = require("../../errors/abi.js");
const base_js_1 = require("../../errors/base.js");
const contract_js_1 = require("../../errors/contract.js");
const decodeFunctionResult_js_1 = require("../../utils/abi/decodeFunctionResult.js");
const encodeFunctionData_js_1 = require("../../utils/abi/encodeFunctionData.js");
const getChainContractAddress_js_1 = require("../../utils/chain/getChainContractAddress.js");
const getContractError_js_1 = require("../../utils/errors/getContractError.js");
const getAction_js_1 = require("../../utils/getAction.js");
const readContract_js_1 = require("./readContract.js");
async function multicall(client, parameters) {
    const { allowFailure = true, batchSize: batchSize_, blockNumber, blockTag, multicallAddress: multicallAddress_, stateOverride, } = parameters;
    const contracts = parameters.contracts;
    const batchSize = batchSize_ ??
        ((typeof client.batch?.multicall === 'object' &&
            client.batch.multicall.batchSize) ||
            1_024);
    let multicallAddress = multicallAddress_;
    if (!multicallAddress) {
        if (!client.chain)
            throw new Error('client chain not configured. multicallAddress is required.');
        multicallAddress = (0, getChainContractAddress_js_1.getChainContractAddress)({
            blockNumber,
            chain: client.chain,
            contract: 'multicall3',
        });
    }
    const chunkedCalls = [[]];
    let currentChunk = 0;
    let currentChunkSize = 0;
    for (let i = 0; i < contracts.length; i++) {
        const { abi, address, args, functionName } = contracts[i];
        try {
            const callData = (0, encodeFunctionData_js_1.encodeFunctionData)({ abi, args, functionName });
            currentChunkSize += (callData.length - 2) / 2;
            if (batchSize > 0 &&
                currentChunkSize > batchSize &&
                chunkedCalls[currentChunk].length > 0) {
                currentChunk++;
                currentChunkSize = (callData.length - 2) / 2;
                chunkedCalls[currentChunk] = [];
            }
            chunkedCalls[currentChunk] = [
                ...chunkedCalls[currentChunk],
                {
                    allowFailure: true,
                    callData,
                    target: address,
                },
            ];
        }
        catch (err) {
            const error = (0, getContractError_js_1.getContractError)(err, {
                abi,
                address,
                args,
                docsPath: '/docs/contract/multicall',
                functionName,
            });
            if (!allowFailure)
                throw error;
            chunkedCalls[currentChunk] = [
                ...chunkedCalls[currentChunk],
                {
                    allowFailure: true,
                    callData: '0x',
                    target: address,
                },
            ];
        }
    }
    const aggregate3Results = await Promise.allSettled(chunkedCalls.map((calls) => (0, getAction_js_1.getAction)(client, readContract_js_1.readContract, 'readContract')({
        abi: abis_js_1.multicall3Abi,
        address: multicallAddress,
        args: [calls],
        blockNumber,
        blockTag,
        functionName: 'aggregate3',
        stateOverride,
    })));
    const results = [];
    for (let i = 0; i < aggregate3Results.length; i++) {
        const result = aggregate3Results[i];
        if (result.status === 'rejected') {
            if (!allowFailure)
                throw result.reason;
            for (let j = 0; j < chunkedCalls[i].length; j++) {
                results.push({
                    status: 'failure',
                    error: result.reason,
                    result: undefined,
                });
            }
            continue;
        }
        const aggregate3Result = result.value;
        for (let j = 0; j < aggregate3Result.length; j++) {
            const { returnData, success } = aggregate3Result[j];
            const { callData } = chunkedCalls[i][j];
            const { abi, address, functionName, args } = contracts[results.length];
            try {
                if (callData === '0x')
                    throw new abi_js_1.AbiDecodingZeroDataError();
                if (!success)
                    throw new contract_js_1.RawContractError({ data: returnData });
                const result = (0, decodeFunctionResult_js_1.decodeFunctionResult)({
                    abi,
                    args,
                    data: returnData,
                    functionName,
                });
                results.push(allowFailure ? { result, status: 'success' } : result);
            }
            catch (err) {
                const error = (0, getContractError_js_1.getContractError)(err, {
                    abi,
                    address,
                    args,
                    docsPath: '/docs/contract/multicall',
                    functionName,
                });
                if (!allowFailure)
                    throw error;
                results.push({ error, result: undefined, status: 'failure' });
            }
        }
    }
    if (results.length !== contracts.length)
        throw new base_js_1.BaseError('multicall results mismatch');
    return results;
}
//# sourceMappingURL=multicall.js.map