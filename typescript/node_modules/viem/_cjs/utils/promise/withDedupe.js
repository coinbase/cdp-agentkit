"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promiseCache = void 0;
exports.withDedupe = withDedupe;
const lru_js_1 = require("../lru.js");
exports.promiseCache = new lru_js_1.LruMap(8192);
function withDedupe(fn, { enabled = true, id }) {
    if (!enabled || !id)
        return fn();
    if (exports.promiseCache.get(id))
        return exports.promiseCache.get(id);
    const promise = fn().finally(() => exports.promiseCache.delete(id));
    exports.promiseCache.set(id, promise);
    return promise;
}
//# sourceMappingURL=withDedupe.js.map