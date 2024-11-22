import type { ErrorType } from '../errors/utils.js';
import type { MaybePromise } from '../types/utils.js';
type Callback = ((...args: any[]) => any) | undefined;
type Callbacks = Record<string, Callback>;
export type ObserveErrorType = ErrorType;
/** @internal */
export declare const listenersCache: Map<string, {
    id: number;
    fns: Callbacks;
}[]>;
/** @internal */
export declare const cleanupCache: Map<string, () => void>;
type EmitFunction<callbacks extends Callbacks> = (emit: callbacks) => MaybePromise<void | (() => void)>;
/**
 * @description Sets up an observer for a given function. If another function
 * is set up under the same observer id, the function will only be called once
 * for both instances of the observer.
 */
export declare function observe<callbacks extends Callbacks>(observerId: string, callbacks: callbacks, fn: EmitFunction<callbacks>): () => void;
export {};
//# sourceMappingURL=observe.d.ts.map