"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogs = getLogs;
const encodeEventTopics_js_1 = require("../../utils/abi/encodeEventTopics.js");
const parseEventLogs_js_1 = require("../../utils/abi/parseEventLogs.js");
const toHex_js_1 = require("../../utils/encoding/toHex.js");
const log_js_1 = require("../../utils/formatters/log.js");
async function getLogs(client, { address, blockHash, fromBlock, toBlock, event, events: events_, args, strict: strict_, } = {}) {
    const strict = strict_ ?? false;
    const events = events_ ?? (event ? [event] : undefined);
    let topics = [];
    if (events) {
        const encoded = events.flatMap((event) => (0, encodeEventTopics_js_1.encodeEventTopics)({
            abi: [event],
            eventName: event.name,
            args: events_ ? undefined : args,
        }));
        topics = [encoded];
        if (event)
            topics = topics[0];
    }
    let logs;
    if (blockHash) {
        logs = await client.request({
            method: 'eth_getLogs',
            params: [{ address, topics, blockHash }],
        });
    }
    else {
        logs = await client.request({
            method: 'eth_getLogs',
            params: [
                {
                    address,
                    topics,
                    fromBlock: typeof fromBlock === 'bigint' ? (0, toHex_js_1.numberToHex)(fromBlock) : fromBlock,
                    toBlock: typeof toBlock === 'bigint' ? (0, toHex_js_1.numberToHex)(toBlock) : toBlock,
                },
            ],
        });
    }
    const formattedLogs = logs.map((log) => (0, log_js_1.formatLog)(log));
    if (!events)
        return formattedLogs;
    return (0, parseEventLogs_js_1.parseEventLogs)({
        abi: events,
        args: args,
        logs: formattedLogs,
        strict,
    });
}
//# sourceMappingURL=getLogs.js.map