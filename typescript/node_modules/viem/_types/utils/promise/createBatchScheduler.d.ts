import type { ErrorType } from '../../errors/utils.js';
type Resolved<returnType extends readonly unknown[] = any> = [
    result: returnType[number],
    results: returnType
];
type BatchResultsCompareFn<result = unknown> = (a: result, b: result) => number;
type CreateBatchSchedulerArguments<parameters = unknown, returnType extends readonly unknown[] = readonly unknown[]> = {
    fn: (args: parameters[]) => Promise<returnType>;
    id: number | string;
    shouldSplitBatch?: ((args: parameters[]) => boolean) | undefined;
    wait?: number | undefined;
    sort?: BatchResultsCompareFn<returnType[number]> | undefined;
};
type CreateBatchSchedulerReturnType<parameters = unknown, returnType extends readonly unknown[] = readonly unknown[]> = {
    flush: () => void;
    schedule: parameters extends undefined ? (args?: parameters | undefined) => Promise<Resolved<returnType>> : (args: parameters) => Promise<Resolved<returnType>>;
};
export type CreateBatchSchedulerErrorType = ErrorType;
/** @internal */
export declare function createBatchScheduler<parameters, returnType extends readonly unknown[]>({ fn, id, shouldSplitBatch, wait, sort, }: CreateBatchSchedulerArguments<parameters, returnType>): CreateBatchSchedulerReturnType<parameters, returnType>;
export {};
//# sourceMappingURL=createBatchScheduler.d.ts.map