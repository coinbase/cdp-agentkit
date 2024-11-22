"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContract = getContract;
exports.getFunctionParameters = getFunctionParameters;
exports.getEventParameters = getEventParameters;
const getAction_js_1 = require("../utils/getAction.js");
const createContractEventFilter_js_1 = require("./public/createContractEventFilter.js");
const estimateContractGas_js_1 = require("./public/estimateContractGas.js");
const getContractEvents_js_1 = require("./public/getContractEvents.js");
const readContract_js_1 = require("./public/readContract.js");
const simulateContract_js_1 = require("./public/simulateContract.js");
const watchContractEvent_js_1 = require("./public/watchContractEvent.js");
const writeContract_js_1 = require("./wallet/writeContract.js");
function getContract({ abi, address, client: client_, }) {
    const client = client_;
    const [publicClient, walletClient] = (() => {
        if (!client)
            return [undefined, undefined];
        if ('public' in client && 'wallet' in client)
            return [client.public, client.wallet];
        if ('public' in client)
            return [client.public, undefined];
        if ('wallet' in client)
            return [undefined, client.wallet];
        return [client, client];
    })();
    const hasPublicClient = publicClient !== undefined && publicClient !== null;
    const hasWalletClient = walletClient !== undefined && walletClient !== null;
    const contract = {};
    let hasReadFunction = false;
    let hasWriteFunction = false;
    let hasEvent = false;
    for (const item of abi) {
        if (item.type === 'function')
            if (item.stateMutability === 'view' || item.stateMutability === 'pure')
                hasReadFunction = true;
            else
                hasWriteFunction = true;
        else if (item.type === 'event')
            hasEvent = true;
        if (hasReadFunction && hasWriteFunction && hasEvent)
            break;
    }
    if (hasPublicClient) {
        if (hasReadFunction)
            contract.read = new Proxy({}, {
                get(_, functionName) {
                    return (...parameters) => {
                        const { args, options } = getFunctionParameters(parameters);
                        return (0, getAction_js_1.getAction)(publicClient, readContract_js_1.readContract, 'readContract')({
                            abi,
                            address,
                            functionName,
                            args,
                            ...options,
                        });
                    };
                },
            });
        if (hasWriteFunction)
            contract.simulate = new Proxy({}, {
                get(_, functionName) {
                    return (...parameters) => {
                        const { args, options } = getFunctionParameters(parameters);
                        return (0, getAction_js_1.getAction)(publicClient, simulateContract_js_1.simulateContract, 'simulateContract')({
                            abi,
                            address,
                            functionName,
                            args,
                            ...options,
                        });
                    };
                },
            });
        if (hasEvent) {
            contract.createEventFilter = new Proxy({}, {
                get(_, eventName) {
                    return (...parameters) => {
                        const abiEvent = abi.find((x) => x.type === 'event' && x.name === eventName);
                        const { args, options } = getEventParameters(parameters, abiEvent);
                        return (0, getAction_js_1.getAction)(publicClient, createContractEventFilter_js_1.createContractEventFilter, 'createContractEventFilter')({
                            abi,
                            address,
                            eventName,
                            args,
                            ...options,
                        });
                    };
                },
            });
            contract.getEvents = new Proxy({}, {
                get(_, eventName) {
                    return (...parameters) => {
                        const abiEvent = abi.find((x) => x.type === 'event' && x.name === eventName);
                        const { args, options } = getEventParameters(parameters, abiEvent);
                        return (0, getAction_js_1.getAction)(publicClient, getContractEvents_js_1.getContractEvents, 'getContractEvents')({
                            abi,
                            address,
                            eventName,
                            args,
                            ...options,
                        });
                    };
                },
            });
            contract.watchEvent = new Proxy({}, {
                get(_, eventName) {
                    return (...parameters) => {
                        const abiEvent = abi.find((x) => x.type === 'event' && x.name === eventName);
                        const { args, options } = getEventParameters(parameters, abiEvent);
                        return (0, getAction_js_1.getAction)(publicClient, watchContractEvent_js_1.watchContractEvent, 'watchContractEvent')({
                            abi,
                            address,
                            eventName,
                            args,
                            ...options,
                        });
                    };
                },
            });
        }
    }
    if (hasWalletClient) {
        if (hasWriteFunction)
            contract.write = new Proxy({}, {
                get(_, functionName) {
                    return (...parameters) => {
                        const { args, options } = getFunctionParameters(parameters);
                        return (0, getAction_js_1.getAction)(walletClient, writeContract_js_1.writeContract, 'writeContract')({
                            abi,
                            address,
                            functionName,
                            args,
                            ...options,
                        });
                    };
                },
            });
    }
    if (hasPublicClient || hasWalletClient)
        if (hasWriteFunction)
            contract.estimateGas = new Proxy({}, {
                get(_, functionName) {
                    return (...parameters) => {
                        const { args, options } = getFunctionParameters(parameters);
                        const client = (publicClient ?? walletClient);
                        return (0, getAction_js_1.getAction)(client, estimateContractGas_js_1.estimateContractGas, 'estimateContractGas')({
                            abi,
                            address,
                            functionName,
                            args,
                            ...options,
                            account: options.account ??
                                walletClient.account,
                        });
                    };
                },
            });
    contract.address = address;
    contract.abi = abi;
    return contract;
}
function getFunctionParameters(values) {
    const hasArgs = values.length && Array.isArray(values[0]);
    const args = hasArgs ? values[0] : [];
    const options = (hasArgs ? values[1] : values[0]) ?? {};
    return { args, options };
}
function getEventParameters(values, abiEvent) {
    let hasArgs = false;
    if (Array.isArray(values[0]))
        hasArgs = true;
    else if (values.length === 1) {
        hasArgs = abiEvent.inputs.some((x) => x.indexed);
    }
    else if (values.length === 2) {
        hasArgs = true;
    }
    const args = hasArgs ? values[0] : undefined;
    const options = (hasArgs ? values[1] : values[0]) ?? {};
    return { args, options };
}
//# sourceMappingURL=getContract.js.map