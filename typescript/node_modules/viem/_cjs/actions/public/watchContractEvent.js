"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.watchContractEvent = watchContractEvent;
const abi_js_1 = require("../../errors/abi.js");
const rpc_js_1 = require("../../errors/rpc.js");
const decodeEventLog_js_1 = require("../../utils/abi/decodeEventLog.js");
const encodeEventTopics_js_1 = require("../../utils/abi/encodeEventTopics.js");
const log_js_1 = require("../../utils/formatters/log.js");
const getAction_js_1 = require("../../utils/getAction.js");
const observe_js_1 = require("../../utils/observe.js");
const poll_js_1 = require("../../utils/poll.js");
const stringify_js_1 = require("../../utils/stringify.js");
const createContractEventFilter_js_1 = require("./createContractEventFilter.js");
const getBlockNumber_js_1 = require("./getBlockNumber.js");
const getContractEvents_js_1 = require("./getContractEvents.js");
const getFilterChanges_js_1 = require("./getFilterChanges.js");
const uninstallFilter_js_1 = require("./uninstallFilter.js");
function watchContractEvent(client, parameters) {
    const { abi, address, args, batch = true, eventName, fromBlock, onError, onLogs, poll: poll_, pollingInterval = client.pollingInterval, strict: strict_, } = parameters;
    const enablePolling = (() => {
        if (typeof poll_ !== 'undefined')
            return poll_;
        if (typeof fromBlock === 'bigint')
            return true;
        if (client.transport.type === 'webSocket')
            return false;
        if (client.transport.type === 'fallback' &&
            client.transport.transports[0].config.type === 'webSocket')
            return false;
        return true;
    })();
    const pollContractEvent = () => {
        const strict = strict_ ?? false;
        const observerId = (0, stringify_js_1.stringify)([
            'watchContractEvent',
            address,
            args,
            batch,
            client.uid,
            eventName,
            pollingInterval,
            strict,
            fromBlock,
        ]);
        return (0, observe_js_1.observe)(observerId, { onLogs, onError }, (emit) => {
            let previousBlockNumber;
            if (fromBlock !== undefined)
                previousBlockNumber = fromBlock - 1n;
            let filter;
            let initialized = false;
            const unwatch = (0, poll_js_1.poll)(async () => {
                if (!initialized) {
                    try {
                        filter = (await (0, getAction_js_1.getAction)(client, createContractEventFilter_js_1.createContractEventFilter, 'createContractEventFilter')({
                            abi,
                            address,
                            args: args,
                            eventName: eventName,
                            strict: strict,
                            fromBlock,
                        }));
                    }
                    catch { }
                    initialized = true;
                    return;
                }
                try {
                    let logs;
                    if (filter) {
                        logs = await (0, getAction_js_1.getAction)(client, getFilterChanges_js_1.getFilterChanges, 'getFilterChanges')({ filter });
                    }
                    else {
                        const blockNumber = await (0, getAction_js_1.getAction)(client, getBlockNumber_js_1.getBlockNumber, 'getBlockNumber')({});
                        if (previousBlockNumber && previousBlockNumber < blockNumber) {
                            logs = await (0, getAction_js_1.getAction)(client, getContractEvents_js_1.getContractEvents, 'getContractEvents')({
                                abi,
                                address,
                                args,
                                eventName,
                                fromBlock: previousBlockNumber + 1n,
                                toBlock: blockNumber,
                                strict,
                            });
                        }
                        else {
                            logs = [];
                        }
                        previousBlockNumber = blockNumber;
                    }
                    if (logs.length === 0)
                        return;
                    if (batch)
                        emit.onLogs(logs);
                    else
                        for (const log of logs)
                            emit.onLogs([log]);
                }
                catch (err) {
                    if (filter && err instanceof rpc_js_1.InvalidInputRpcError)
                        initialized = false;
                    emit.onError?.(err);
                }
            }, {
                emitOnBegin: true,
                interval: pollingInterval,
            });
            return async () => {
                if (filter)
                    await (0, getAction_js_1.getAction)(client, uninstallFilter_js_1.uninstallFilter, 'uninstallFilter')({ filter });
                unwatch();
            };
        });
    };
    const subscribeContractEvent = () => {
        const strict = strict_ ?? false;
        const observerId = (0, stringify_js_1.stringify)([
            'watchContractEvent',
            address,
            args,
            batch,
            client.uid,
            eventName,
            pollingInterval,
            strict,
        ]);
        let active = true;
        let unsubscribe = () => (active = false);
        return (0, observe_js_1.observe)(observerId, { onLogs, onError }, (emit) => {
            ;
            (async () => {
                try {
                    const transport = (() => {
                        if (client.transport.type === 'fallback') {
                            const transport = client.transport.transports.find((transport) => transport.config.type === 'webSocket');
                            if (!transport)
                                return client.transport;
                            return transport.value;
                        }
                        return client.transport;
                    })();
                    const topics = eventName
                        ? (0, encodeEventTopics_js_1.encodeEventTopics)({
                            abi: abi,
                            eventName: eventName,
                            args,
                        })
                        : [];
                    const { unsubscribe: unsubscribe_ } = await transport.subscribe({
                        params: ['logs', { address, topics }],
                        onData(data) {
                            if (!active)
                                return;
                            const log = data.result;
                            try {
                                const { eventName, args } = (0, decodeEventLog_js_1.decodeEventLog)({
                                    abi: abi,
                                    data: log.data,
                                    topics: log.topics,
                                    strict: strict_,
                                });
                                const formatted = (0, log_js_1.formatLog)(log, {
                                    args,
                                    eventName: eventName,
                                });
                                emit.onLogs([formatted]);
                            }
                            catch (err) {
                                let eventName;
                                let isUnnamed;
                                if (err instanceof abi_js_1.DecodeLogDataMismatch ||
                                    err instanceof abi_js_1.DecodeLogTopicsMismatch) {
                                    if (strict_)
                                        return;
                                    eventName = err.abiItem.name;
                                    isUnnamed = err.abiItem.inputs?.some((x) => !('name' in x && x.name));
                                }
                                const formatted = (0, log_js_1.formatLog)(log, {
                                    args: isUnnamed ? [] : {},
                                    eventName,
                                });
                                emit.onLogs([formatted]);
                            }
                        },
                        onError(error) {
                            emit.onError?.(error);
                        },
                    });
                    unsubscribe = unsubscribe_;
                    if (!active)
                        unsubscribe();
                }
                catch (err) {
                    onError?.(err);
                }
            })();
            return () => unsubscribe();
        });
    };
    return enablePolling ? pollContractEvent() : subscribeContractEvent();
}
//# sourceMappingURL=watchContractEvent.js.map