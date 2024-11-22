import { TransactionRejectedRpcError, UserRejectedRequestError, } from '../../errors/rpc.js';
import { wait } from '../../utils/wait.js';
import { createTransport, } from './createTransport.js';
export function fallback(transports_, config = {}) {
    const { key = 'fallback', name = 'Fallback', rank = false, retryCount, retryDelay, } = config;
    return (({ chain, pollingInterval = 4_000, timeout, ...rest }) => {
        let transports = transports_;
        let onResponse = () => { };
        const transport = createTransport({
            key,
            name,
            async request({ method, params }) {
                const fetch = async (i = 0) => {
                    const transport = transports[i]({
                        ...rest,
                        chain,
                        retryCount: 0,
                        timeout,
                    });
                    try {
                        const response = await transport.request({
                            method,
                            params,
                        });
                        onResponse({
                            method,
                            params: params,
                            response,
                            transport,
                            status: 'success',
                        });
                        return response;
                    }
                    catch (err) {
                        onResponse({
                            error: err,
                            method,
                            params: params,
                            transport,
                            status: 'error',
                        });
                        if (shouldThrow(err))
                            throw err;
                        // If we've reached the end of the fallbacks, throw the error.
                        if (i === transports.length - 1)
                            throw err;
                        // Otherwise, try the next fallback.
                        return fetch(i + 1);
                    }
                };
                return fetch();
            },
            retryCount,
            retryDelay,
            type: 'fallback',
        }, {
            onResponse: (fn) => (onResponse = fn),
            transports: transports.map((fn) => fn({ chain, retryCount: 0 })),
        });
        if (rank) {
            const rankOptions = (typeof rank === 'object' ? rank : {});
            rankTransports({
                chain,
                interval: rankOptions.interval ?? pollingInterval,
                onTransports: (transports_) => (transports = transports_),
                sampleCount: rankOptions.sampleCount,
                timeout: rankOptions.timeout,
                transports,
                weights: rankOptions.weights,
            });
        }
        return transport;
    });
}
function shouldThrow(error) {
    if ('code' in error && typeof error.code === 'number') {
        if (error.code === TransactionRejectedRpcError.code ||
            error.code === UserRejectedRequestError.code ||
            error.code === 5000 // CAIP UserRejectedRequestError
        )
            return true;
    }
    return false;
}
/** @internal */
export function rankTransports({ chain, interval = 4_000, onTransports, sampleCount = 10, timeout = 1_000, transports, weights = {}, }) {
    const { stability: stabilityWeight = 0.7, latency: latencyWeight = 0.3 } = weights;
    const samples = [];
    const rankTransports_ = async () => {
        // 1. Take a sample from each Transport.
        const sample = await Promise.all(transports.map(async (transport) => {
            const transport_ = transport({ chain, retryCount: 0, timeout });
            const start = Date.now();
            let end;
            let success;
            try {
                await transport_.request({ method: 'net_listening' });
                success = 1;
            }
            catch {
                success = 0;
            }
            finally {
                end = Date.now();
            }
            const latency = end - start;
            return { latency, success };
        }));
        // 2. Store the sample. If we have more than `sampleCount` samples, remove
        // the oldest sample.
        samples.push(sample);
        if (samples.length > sampleCount)
            samples.shift();
        // 3. Calculate the max latency from samples.
        const maxLatency = Math.max(...samples.map((sample) => Math.max(...sample.map(({ latency }) => latency))));
        // 4. Calculate the score for each Transport.
        const scores = transports
            .map((_, i) => {
            const latencies = samples.map((sample) => sample[i].latency);
            const meanLatency = latencies.reduce((acc, latency) => acc + latency, 0) /
                latencies.length;
            const latencyScore = 1 - meanLatency / maxLatency;
            const successes = samples.map((sample) => sample[i].success);
            const stabilityScore = successes.reduce((acc, success) => acc + success, 0) /
                successes.length;
            if (stabilityScore === 0)
                return [0, i];
            return [
                latencyWeight * latencyScore + stabilityWeight * stabilityScore,
                i,
            ];
        })
            .sort((a, b) => b[0] - a[0]);
        // 5. Sort the Transports by score.
        onTransports(scores.map(([, i]) => transports[i]));
        // 6. Wait, and then rank again.
        await wait(interval);
        rankTransports_();
    };
    rankTransports_();
}
//# sourceMappingURL=fallback.js.map