import type { ErrorType } from '../../errors/utils.js';
import type { Chain } from '../../types/chain.js';
import { type CreateTransportErrorType, type Transport, type TransportConfig } from './createTransport.js';
export type OnResponseFn = (args: {
    method: string;
    params: unknown[];
    transport: ReturnType<Transport>;
} & ({
    error?: undefined;
    response: unknown;
    status: 'success';
} | {
    error: Error;
    response?: undefined;
    status: 'error';
})) => void;
type RankOptions = {
    /**
     * The polling interval (in ms) at which the ranker should ping the RPC URL.
     * @default client.pollingInterval
     */
    interval?: number | undefined;
    /**
     * The number of previous samples to perform ranking on.
     * @default 10
     */
    sampleCount?: number | undefined;
    /**
     * Timeout when sampling transports.
     * @default 1_000
     */
    timeout?: number | undefined;
    /**
     * Weights to apply to the scores. Weight values are proportional.
     */
    weights?: {
        /**
         * The weight to apply to the latency score.
         * @default 0.3
         */
        latency?: number | undefined;
        /**
         * The weight to apply to the stability score.
         * @default 0.7
         */
        stability?: number | undefined;
    } | undefined;
};
export type FallbackTransportConfig = {
    /** The key of the Fallback transport. */
    key?: TransportConfig['key'] | undefined;
    /** The name of the Fallback transport. */
    name?: TransportConfig['name'] | undefined;
    /** Toggle to enable ranking, or rank options. */
    rank?: boolean | RankOptions | undefined;
    /** The max number of times to retry. */
    retryCount?: TransportConfig['retryCount'] | undefined;
    /** The base delay (in ms) between retries. */
    retryDelay?: TransportConfig['retryDelay'] | undefined;
};
export type FallbackTransport<transports extends readonly Transport[] = readonly Transport[]> = Transport<'fallback', {
    onResponse: (fn: OnResponseFn) => void;
    transports: {
        [key in keyof transports]: ReturnType<transports[key]>;
    };
}>;
export type FallbackTransportErrorType = CreateTransportErrorType | ErrorType;
export declare function fallback<const transports extends readonly Transport[]>(transports_: transports, config?: FallbackTransportConfig): FallbackTransport<transports>;
/** @internal */
export declare function rankTransports({ chain, interval, onTransports, sampleCount, timeout, transports, weights, }: {
    chain?: Chain | undefined;
    interval: RankOptions['interval'];
    onTransports: (transports: readonly Transport[]) => void;
    sampleCount?: RankOptions['sampleCount'] | undefined;
    timeout?: RankOptions['timeout'] | undefined;
    transports: readonly Transport[];
    weights?: RankOptions['weights'] | undefined;
}): void;
export {};
//# sourceMappingURL=fallback.d.ts.map