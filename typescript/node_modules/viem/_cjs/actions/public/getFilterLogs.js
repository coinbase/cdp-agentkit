"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilterLogs = getFilterLogs;
const parseEventLogs_js_1 = require("../../utils/abi/parseEventLogs.js");
const log_js_1 = require("../../utils/formatters/log.js");
async function getFilterLogs(_client, { filter, }) {
    const strict = filter.strict ?? false;
    const logs = await filter.request({
        method: 'eth_getFilterLogs',
        params: [filter.id],
    });
    const formattedLogs = logs.map((log) => (0, log_js_1.formatLog)(log));
    if (!filter.abi)
        return formattedLogs;
    return (0, parseEventLogs_js_1.parseEventLogs)({
        abi: filter.abi,
        logs: formattedLogs,
        strict,
    });
}
//# sourceMappingURL=getFilterLogs.js.map