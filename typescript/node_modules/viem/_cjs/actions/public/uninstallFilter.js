"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uninstallFilter = uninstallFilter;
async function uninstallFilter(_client, { filter }) {
    return filter.request({
        method: 'eth_uninstallFilter',
        params: [filter.id],
    });
}
//# sourceMappingURL=uninstallFilter.js.map