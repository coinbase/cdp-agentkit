"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrl = getUrl;
exports.getVersion = getVersion;
exports.prettyPrint = prettyPrint;
const version_js_1 = require("../version.js");
function getUrl(url) {
    return url;
}
function getVersion() {
    return version_js_1.version;
}
function prettyPrint(args) {
    if (!args)
        return '';
    const entries = Object.entries(args)
        .map(([key, value]) => {
        if (value === undefined || value === false)
            return null;
        return [key, value];
    })
        .filter(Boolean);
    const maxLength = entries.reduce((acc, [key]) => Math.max(acc, key.length), 0);
    return entries
        .map(([key, value]) => `  ${`${key}:`.padEnd(maxLength + 1)}  ${value}`)
        .join('\n');
}
//# sourceMappingURL=errors.js.map