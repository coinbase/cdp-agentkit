"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContractEventFilter = createContractEventFilter;
const encodeEventTopics_js_1 = require("../../utils/abi/encodeEventTopics.js");
const toHex_js_1 = require("../../utils/encoding/toHex.js");
const createFilterRequestScope_js_1 = require("../../utils/filters/createFilterRequestScope.js");
async function createContractEventFilter(client, parameters) {
    const { address, abi, args, eventName, fromBlock, strict, toBlock } = parameters;
    const getRequest = (0, createFilterRequestScope_js_1.createFilterRequestScope)(client, {
        method: 'eth_newFilter',
    });
    const topics = eventName
        ? (0, encodeEventTopics_js_1.encodeEventTopics)({
            abi,
            args,
            eventName,
        })
        : undefined;
    const id = await client.request({
        method: 'eth_newFilter',
        params: [
            {
                address,
                fromBlock: typeof fromBlock === 'bigint' ? (0, toHex_js_1.numberToHex)(fromBlock) : fromBlock,
                toBlock: typeof toBlock === 'bigint' ? (0, toHex_js_1.numberToHex)(toBlock) : toBlock,
                topics,
            },
        ],
    });
    return {
        abi,
        args,
        eventName,
        id,
        request: getRequest(id),
        strict: Boolean(strict),
        type: 'event',
    };
}
//# sourceMappingURL=createContractEventFilter.js.map