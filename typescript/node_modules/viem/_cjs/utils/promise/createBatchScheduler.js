"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBatchScheduler = createBatchScheduler;
const withResolvers_js_1 = require("./withResolvers.js");
const schedulerCache = new Map();
function createBatchScheduler({ fn, id, shouldSplitBatch, wait = 0, sort, }) {
    const exec = async () => {
        const scheduler = getScheduler();
        flush();
        const args = scheduler.map(({ args }) => args);
        if (args.length === 0)
            return;
        fn(args)
            .then((data) => {
            if (sort && Array.isArray(data))
                data.sort(sort);
            for (let i = 0; i < scheduler.length; i++) {
                const { resolve } = scheduler[i];
                resolve?.([data[i], data]);
            }
        })
            .catch((err) => {
            for (let i = 0; i < scheduler.length; i++) {
                const { reject } = scheduler[i];
                reject?.(err);
            }
        });
    };
    const flush = () => schedulerCache.delete(id);
    const getBatchedArgs = () => getScheduler().map(({ args }) => args);
    const getScheduler = () => schedulerCache.get(id) || [];
    const setScheduler = (item) => schedulerCache.set(id, [...getScheduler(), item]);
    return {
        flush,
        async schedule(args) {
            const { promise, resolve, reject } = (0, withResolvers_js_1.withResolvers)();
            const split = shouldSplitBatch?.([...getBatchedArgs(), args]);
            if (split)
                exec();
            const hasActiveScheduler = getScheduler().length > 0;
            if (hasActiveScheduler) {
                setScheduler({ args, resolve, reject });
                return promise;
            }
            setScheduler({ args, resolve, reject });
            setTimeout(exec, wait);
            return promise;
        },
    };
}
//# sourceMappingURL=createBatchScheduler.js.map