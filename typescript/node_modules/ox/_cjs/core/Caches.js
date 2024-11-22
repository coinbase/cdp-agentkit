"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checksum = void 0;
exports.clear = clear;
const lru_js_1 = require("./internal/lru.js");
const caches = {
    checksum: new lru_js_1.LruMap(8192),
};
exports.checksum = caches.checksum;
function clear() {
    for (const cache of Object.values(caches))
        cache.clear();
}
//# sourceMappingURL=Caches.js.map