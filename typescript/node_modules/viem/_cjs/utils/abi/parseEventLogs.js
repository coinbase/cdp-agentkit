"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseEventLogs = parseEventLogs;
const abi_js_1 = require("../../errors/abi.js");
const isAddressEqual_js_1 = require("../address/isAddressEqual.js");
const toBytes_js_1 = require("../encoding/toBytes.js");
const keccak256_js_1 = require("../hash/keccak256.js");
const toEventSelector_js_1 = require("../hash/toEventSelector.js");
const decodeEventLog_js_1 = require("./decodeEventLog.js");
function parseEventLogs(parameters) {
    const { abi, args, logs, strict = true } = parameters;
    const eventName = (() => {
        if (!parameters.eventName)
            return undefined;
        if (Array.isArray(parameters.eventName))
            return parameters.eventName;
        return [parameters.eventName];
    })();
    return logs
        .map((log) => {
        try {
            const abiItem = abi.find((abiItem) => abiItem.type === 'event' &&
                log.topics[0] === (0, toEventSelector_js_1.toEventSelector)(abiItem));
            if (!abiItem)
                return null;
            const event = (0, decodeEventLog_js_1.decodeEventLog)({
                ...log,
                abi: [abiItem],
                strict,
            });
            if (eventName && !eventName.includes(event.eventName))
                return null;
            if (!includesArgs({
                args: event.args,
                inputs: abiItem.inputs,
                matchArgs: args,
            }))
                return null;
            return { ...event, ...log };
        }
        catch (err) {
            let eventName;
            let isUnnamed;
            if (err instanceof abi_js_1.AbiEventSignatureNotFoundError)
                return null;
            if (err instanceof abi_js_1.DecodeLogDataMismatch ||
                err instanceof abi_js_1.DecodeLogTopicsMismatch) {
                if (strict)
                    return null;
                eventName = err.abiItem.name;
                isUnnamed = err.abiItem.inputs?.some((x) => !('name' in x && x.name));
            }
            return { ...log, args: isUnnamed ? [] : {}, eventName };
        }
    })
        .filter(Boolean);
}
function includesArgs(parameters) {
    const { args, inputs, matchArgs } = parameters;
    if (!matchArgs)
        return true;
    if (!args)
        return false;
    function isEqual(input, value, arg) {
        try {
            if (input.type === 'address')
                return (0, isAddressEqual_js_1.isAddressEqual)(value, arg);
            if (input.type === 'string' || input.type === 'bytes')
                return (0, keccak256_js_1.keccak256)((0, toBytes_js_1.toBytes)(value)) === arg;
            return value === arg;
        }
        catch {
            return false;
        }
    }
    if (Array.isArray(args) && Array.isArray(matchArgs)) {
        return matchArgs.every((value, index) => {
            if (value === null || value === undefined)
                return true;
            const input = inputs[index];
            if (!input)
                return false;
            const value_ = Array.isArray(value) ? value : [value];
            return value_.some((value) => isEqual(input, value, args[index]));
        });
    }
    if (typeof args === 'object' &&
        !Array.isArray(args) &&
        typeof matchArgs === 'object' &&
        !Array.isArray(matchArgs))
        return Object.entries(matchArgs).every(([key, value]) => {
            if (value === null || value === undefined)
                return true;
            const input = inputs.find((input) => input.name === key);
            if (!input)
                return false;
            const value_ = Array.isArray(value) ? value : [value];
            return value_.some((value) => isEqual(input, value, args[key]));
        });
    return false;
}
//# sourceMappingURL=parseEventLogs.js.map