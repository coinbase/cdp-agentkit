import { wait } from './wait.js';
/**
 * @description Polls a function at a specified interval.
 */
export function poll(fn, { emitOnBegin, initialWaitTime, interval }) {
    let active = true;
    const unwatch = () => (active = false);
    const watch = async () => {
        let data = undefined;
        if (emitOnBegin)
            data = await fn({ unpoll: unwatch });
        const initialWait = (await initialWaitTime?.(data)) ?? interval;
        await wait(initialWait);
        const poll = async () => {
            if (!active)
                return;
            await fn({ unpoll: unwatch });
            await wait(interval);
            poll();
        };
        poll();
    };
    watch();
    return unwatch;
}
//# sourceMappingURL=poll.js.map