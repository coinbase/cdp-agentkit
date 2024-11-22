"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.poll = poll;
const wait_js_1 = require("./wait.js");
function poll(fn, { emitOnBegin, initialWaitTime, interval }) {
    let active = true;
    const unwatch = () => (active = false);
    const watch = async () => {
        let data = undefined;
        if (emitOnBegin)
            data = await fn({ unpoll: unwatch });
        const initialWait = (await initialWaitTime?.(data)) ?? interval;
        await (0, wait_js_1.wait)(initialWait);
        const poll = async () => {
            if (!active)
                return;
            await fn({ unpoll: unwatch });
            await (0, wait_js_1.wait)(interval);
            poll();
        };
        poll();
    };
    watch();
    return unwatch;
}
//# sourceMappingURL=poll.js.map