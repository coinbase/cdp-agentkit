"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withResolvers = withResolvers;
function withResolvers() {
    let resolve = () => undefined;
    let reject = () => undefined;
    const promise = new Promise((resolve_, reject_) => {
        resolve = resolve_;
        reject = reject_;
    });
    return { promise, resolve, reject };
}
//# sourceMappingURL=withResolvers.js.map