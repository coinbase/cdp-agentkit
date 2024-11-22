"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.call = call;
exports.getRevertErrorData = getRevertErrorData;
const abitype_1 = require("abitype");
const parseAccount_js_1 = require("../../accounts/utils/parseAccount.js");
const abis_js_1 = require("../../constants/abis.js");
const contract_js_1 = require("../../constants/contract.js");
const contracts_js_1 = require("../../constants/contracts.js");
const base_js_1 = require("../../errors/base.js");
const chain_js_1 = require("../../errors/chain.js");
const contract_js_2 = require("../../errors/contract.js");
const decodeFunctionResult_js_1 = require("../../utils/abi/decodeFunctionResult.js");
const encodeDeployData_js_1 = require("../../utils/abi/encodeDeployData.js");
const encodeFunctionData_js_1 = require("../../utils/abi/encodeFunctionData.js");
const getChainContractAddress_js_1 = require("../../utils/chain/getChainContractAddress.js");
const toHex_js_1 = require("../../utils/encoding/toHex.js");
const getCallError_js_1 = require("../../utils/errors/getCallError.js");
const extract_js_1 = require("../../utils/formatters/extract.js");
const transactionRequest_js_1 = require("../../utils/formatters/transactionRequest.js");
const createBatchScheduler_js_1 = require("../../utils/promise/createBatchScheduler.js");
const stateOverride_js_1 = require("../../utils/stateOverride.js");
const assertRequest_js_1 = require("../../utils/transaction/assertRequest.js");
async function call(client, args) {
    const { account: account_ = client.account, batch = Boolean(client.batch?.multicall), blockNumber, blockTag = 'latest', accessList, blobs, code, data: data_, factory, factoryData, gas, gasPrice, maxFeePerBlobGas, maxFeePerGas, maxPriorityFeePerGas, nonce, to, value, stateOverride, ...rest } = args;
    const account = account_ ? (0, parseAccount_js_1.parseAccount)(account_) : undefined;
    if (code && (factory || factoryData))
        throw new base_js_1.BaseError('Cannot provide both `code` & `factory`/`factoryData` as parameters.');
    if (code && to)
        throw new base_js_1.BaseError('Cannot provide both `code` & `to` as parameters.');
    const deploylessCallViaBytecode = code && data_;
    const deploylessCallViaFactory = factory && factoryData && to && data_;
    const deploylessCall = deploylessCallViaBytecode || deploylessCallViaFactory;
    const data = (() => {
        if (deploylessCallViaBytecode)
            return toDeploylessCallViaBytecodeData({
                code,
                data: data_,
            });
        if (deploylessCallViaFactory)
            return toDeploylessCallViaFactoryData({
                data: data_,
                factory,
                factoryData,
                to,
            });
        return data_;
    })();
    try {
        (0, assertRequest_js_1.assertRequest)(args);
        const blockNumberHex = blockNumber ? (0, toHex_js_1.numberToHex)(blockNumber) : undefined;
        const block = blockNumberHex || blockTag;
        const rpcStateOverride = (0, stateOverride_js_1.serializeStateOverride)(stateOverride);
        const chainFormat = client.chain?.formatters?.transactionRequest?.format;
        const format = chainFormat || transactionRequest_js_1.formatTransactionRequest;
        const request = format({
            ...(0, extract_js_1.extract)(rest, { format: chainFormat }),
            from: account?.address,
            accessList,
            blobs,
            data,
            gas,
            gasPrice,
            maxFeePerBlobGas,
            maxFeePerGas,
            maxPriorityFeePerGas,
            nonce,
            to: deploylessCall ? undefined : to,
            value,
        });
        if (batch && shouldPerformMulticall({ request }) && !rpcStateOverride) {
            try {
                return await scheduleMulticall(client, {
                    ...request,
                    blockNumber,
                    blockTag,
                });
            }
            catch (err) {
                if (!(err instanceof chain_js_1.ClientChainNotConfiguredError) &&
                    !(err instanceof chain_js_1.ChainDoesNotSupportContract))
                    throw err;
            }
        }
        const response = await client.request({
            method: 'eth_call',
            params: rpcStateOverride
                ? [
                    request,
                    block,
                    rpcStateOverride,
                ]
                : [request, block],
        });
        if (response === '0x')
            return { data: undefined };
        return { data: response };
    }
    catch (err) {
        const data = getRevertErrorData(err);
        const { offchainLookup, offchainLookupSignature } = await Promise.resolve().then(() => require('../../utils/ccip.js'));
        if (client.ccipRead !== false &&
            data?.slice(0, 10) === offchainLookupSignature &&
            to)
            return { data: await offchainLookup(client, { data, to }) };
        if (deploylessCall && data?.slice(0, 10) === '0x101bb98d')
            throw new contract_js_2.CounterfactualDeploymentFailedError({ factory });
        throw (0, getCallError_js_1.getCallError)(err, {
            ...args,
            account,
            chain: client.chain,
        });
    }
}
function shouldPerformMulticall({ request }) {
    const { data, to, ...request_ } = request;
    if (!data)
        return false;
    if (data.startsWith(contract_js_1.aggregate3Signature))
        return false;
    if (!to)
        return false;
    if (Object.values(request_).filter((x) => typeof x !== 'undefined').length > 0)
        return false;
    return true;
}
async function scheduleMulticall(client, args) {
    const { batchSize = 1024, wait = 0 } = typeof client.batch?.multicall === 'object' ? client.batch.multicall : {};
    const { blockNumber, blockTag = 'latest', data, multicallAddress: multicallAddress_, to, } = args;
    let multicallAddress = multicallAddress_;
    if (!multicallAddress) {
        if (!client.chain)
            throw new chain_js_1.ClientChainNotConfiguredError();
        multicallAddress = (0, getChainContractAddress_js_1.getChainContractAddress)({
            blockNumber,
            chain: client.chain,
            contract: 'multicall3',
        });
    }
    const blockNumberHex = blockNumber ? (0, toHex_js_1.numberToHex)(blockNumber) : undefined;
    const block = blockNumberHex || blockTag;
    const { schedule } = (0, createBatchScheduler_js_1.createBatchScheduler)({
        id: `${client.uid}.${block}`,
        wait,
        shouldSplitBatch(args) {
            const size = args.reduce((size, { data }) => size + (data.length - 2), 0);
            return size > batchSize * 2;
        },
        fn: async (requests) => {
            const calls = requests.map((request) => ({
                allowFailure: true,
                callData: request.data,
                target: request.to,
            }));
            const calldata = (0, encodeFunctionData_js_1.encodeFunctionData)({
                abi: abis_js_1.multicall3Abi,
                args: [calls],
                functionName: 'aggregate3',
            });
            const data = await client.request({
                method: 'eth_call',
                params: [
                    {
                        data: calldata,
                        to: multicallAddress,
                    },
                    block,
                ],
            });
            return (0, decodeFunctionResult_js_1.decodeFunctionResult)({
                abi: abis_js_1.multicall3Abi,
                args: [calls],
                functionName: 'aggregate3',
                data: data || '0x',
            });
        },
    });
    const [{ returnData, success }] = await schedule({ data, to });
    if (!success)
        throw new contract_js_2.RawContractError({ data: returnData });
    if (returnData === '0x')
        return { data: undefined };
    return { data: returnData };
}
function toDeploylessCallViaBytecodeData(parameters) {
    const { code, data } = parameters;
    return (0, encodeDeployData_js_1.encodeDeployData)({
        abi: (0, abitype_1.parseAbi)(['constructor(bytes, bytes)']),
        bytecode: contracts_js_1.deploylessCallViaBytecodeBytecode,
        args: [code, data],
    });
}
function toDeploylessCallViaFactoryData(parameters) {
    const { data, factory, factoryData, to } = parameters;
    return (0, encodeDeployData_js_1.encodeDeployData)({
        abi: (0, abitype_1.parseAbi)(['constructor(address, bytes, address, bytes)']),
        bytecode: contracts_js_1.deploylessCallViaFactoryBytecode,
        args: [to, data, factory, factoryData],
    });
}
function getRevertErrorData(err) {
    if (!(err instanceof base_js_1.BaseError))
        return undefined;
    const error = err.walk();
    return typeof error?.data === 'object' ? error.data?.data : error.data;
}
//# sourceMappingURL=call.js.map