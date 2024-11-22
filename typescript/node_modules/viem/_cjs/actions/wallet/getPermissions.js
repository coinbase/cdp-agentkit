"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPermissions = getPermissions;
async function getPermissions(client) {
    const permissions = await client.request({ method: 'wallet_getPermissions' }, { dedupe: true });
    return permissions;
}
//# sourceMappingURL=getPermissions.js.map