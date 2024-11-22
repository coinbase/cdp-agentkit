"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEventFilter = createEventFilter;
const encodeEventTopics_js_1 = require("../../utils/abi/encodeEventTopics.js");
const toHex_js_1 = require("../../utils/encoding/toHex.js");
const createFilterRequestScope_js_1 = require("../../utils/filters/createFilterRequestScope.js");
async function createEventFilter(client, { address, args, event, events: events_, fromBlock, strict, toBlock, } = {}) {
    const events = events_ ?? (event ? [event] : undefined);
    const getRequest = (0, createFilterRequestScope_js_1.createFilterRequestScope)(client, {
        method: 'eth_newFilter',
    });
    let topics = [];
    if (events) {
        const encoded = events.flatMap((event) => (0, encodeEventTopics_js_1.encodeEventTopics)({
            abi: [event],
            eventName: event.name,
            args,
        }));
        topics = [encoded];
        if (event)
            topics = topics[0];
    }
    const id = await client.request({
        method: 'eth_newFilter',
        params: [
            {
                address,
                fromBlock: typeof fromBlock === 'bigint' ? (0, toHex_js_1.numberToHex)(fromBlock) : fromBlock,
                toBlock: typeof toBlock === 'bigint' ? (0, toHex_js_1.numberToHex)(toBlock) : toBlock,
                ...(topics.length ? { topics } : {}),
            },
        ],
    });
    return {
        abi: events,
        args,
        eventName: event ? event.name : undefined,
        fromBlock,
        id,
        request: getRequest(id),
        strict: Boolean(strict),
        toBlock,
        type: 'event',
    };
}
//# sourceMappingURL=createEventFilter.js.map