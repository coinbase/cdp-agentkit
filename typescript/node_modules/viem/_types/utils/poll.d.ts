import type { ErrorType } from '../errors/utils.js';
type PollOptions<data> = {
    emitOnBegin?: boolean | undefined;
    initialWaitTime?: ((data: data | void) => Promise<number>) | undefined;
    interval: number;
};
export type PollErrorType = ErrorType;
/**
 * @description Polls a function at a specified interval.
 */
export declare function poll<data>(fn: ({ unpoll }: {
    unpoll: () => void;
}) => Promise<data | void>, { emitOnBegin, initialWaitTime, interval }: PollOptions<data>): () => boolean;
export {};
//# sourceMappingURL=poll.d.ts.map