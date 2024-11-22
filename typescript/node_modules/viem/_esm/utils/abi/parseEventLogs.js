// TODO(v3): checksum address.
import { AbiEventSignatureNotFoundError, DecodeLogDataMismatch, DecodeLogTopicsMismatch, } from '../../errors/abi.js';
import { isAddressEqual } from '../address/isAddressEqual.js';
import { toBytes } from '../encoding/toBytes.js';
import { keccak256 } from '../hash/keccak256.js';
import { toEventSelector } from '../hash/toEventSelector.js';
import { decodeEventLog, } from './decodeEventLog.js';
/**
 * Extracts & decodes logs matching the provided signature(s) (`abi` + optional `eventName`)
 * from a set of opaque logs.
 *
 * @param parameters - {@link ParseEventLogsParameters}
 * @returns The logs. {@link ParseEventLogsReturnType}
 *
 * @example
 * import { createClient, http } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { parseEventLogs } from 'viem/op-stack'
 *
 * const client = createClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 *
 * const receipt = await getTransactionReceipt(client, {
 *   hash: '0xec23b2ba4bc59ba61554507c1b1bc91649e6586eb2dd00c728e8ed0db8bb37ea',
 * })
 *
 * const logs = parseEventLogs({ logs: receipt.logs })
 * // [{ args: { ... }, eventName: 'TransactionDeposited', ... }, ...]
 */
export function parseEventLogs(parameters) {
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
                log.topics[0] === toEventSelector(abiItem));
            if (!abiItem)
                return null;
            const event = decodeEventLog({
                ...log,
                abi: [abiItem],
                strict,
            });
            // Check that the decoded event name matches the provided event name.
            if (eventName && !eventName.includes(event.eventName))
                return null;
            // Check that the decoded event args match the provided args.
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
            if (err instanceof AbiEventSignatureNotFoundError)
                return null;
            if (err instanceof DecodeLogDataMismatch ||
                err instanceof DecodeLogTopicsMismatch) {
                // If strict mode is on, and log data/topics do not match event definition, skip.
                if (strict)
                    return null;
                eventName = err.abiItem.name;
                isUnnamed = err.abiItem.inputs?.some((x) => !('name' in x && x.name));
            }
            // Set args to empty if there is an error decoding (e.g. indexed/non-indexed params mismatch).
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
                return isAddressEqual(value, arg);
            if (input.type === 'string' || input.type === 'bytes')
                return keccak256(toBytes(value)) === arg;
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