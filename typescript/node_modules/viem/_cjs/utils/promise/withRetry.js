"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withRetry = withRetry;
const wait_js_1 = require("../wait.js");
function withRetry(fn, { delay: delay_ = 100, retryCount = 2, shouldRetry = () => true, } = {}) {
    return new Promise((resolve, reject) => {
        const attemptRetry = async ({ count = 0 } = {}) => {
            const retry = async ({ error }) => {
                const delay = typeof delay_ === 'function' ? delay_({ count, error }) : delay_;
                if (delay)
                    await (0, wait_js_1.wait)(delay);
                attemptRetry({ count: count + 1 });
            };
            try {
                const data = await fn();
                resolve(data);
            }
            catch (err) {
                if (count < retryCount &&
                    (await shouldRetry({ count, error: err })))
                    return retry({ error: err });
                reject(err);
            }
        };
        attemptRetry();
    });
}
//# sourceMappingURL=withRetry.js.map