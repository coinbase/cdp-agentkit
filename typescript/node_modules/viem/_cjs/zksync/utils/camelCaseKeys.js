"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.camelCaseKeys = camelCaseKeys;
function camelCaseKeys(response) {
    if (!response)
        return response;
    if (typeof response !== 'object')
        return response;
    if (Array.isArray(response))
        return response.map(camelCaseKeys);
    return Object.fromEntries(Object.entries(response).map(([key, value]) => [
        key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase()),
        camelCaseKeys(value),
    ]));
}
//# sourceMappingURL=camelCaseKeys.js.map