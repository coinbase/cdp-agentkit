"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSupportedEntryPoints = getSupportedEntryPoints;
function getSupportedEntryPoints(client) {
    return client.request({ method: 'eth_supportedEntryPoints' });
}
//# sourceMappingURL=getSupportedEntryPoints.js.map