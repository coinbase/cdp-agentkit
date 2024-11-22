"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fallback = fallback;
exports.rankTransports = rankTransports;
const rpc_js_1 = require("../../errors/rpc.js");
const wait_js_1 = require("../../utils/wait.js");
const createTransport_js_1 = require("./createTransport.js");
function fallback(transports_, config = {}) {
    const { key = 'fallback', name = 'Fallback', rank = false, retryCount, retryDelay, } = config;
    return (({ chain, pollingInterval = 4_000, timeout, ...rest }) => {
        let transports = transports_;
        let onResponse = () => { };
        const transport = (0, createTransport_js_1.createTransport)({
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
                        if (i === transports.length - 1)
                            throw err;
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
        if (error.code === rpc_js_1.TransactionRejectedRpcError.code ||
            error.code === rpc_js_1.UserRejectedRequestError.code ||
            error.code === 5000)
            return true;
    }
    return false;
}
function rankTransports({ chain, interval = 4_000, onTransports, sampleCount = 10, timeout = 1_000, transports, weights = {}, }) {
    const { stability: stabilityWeight = 0.7, latency: latencyWeight = 0.3 } = weights;
    const samples = [];
    const rankTransports_ = async () => {
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
        samples.push(sample);
        if (samples.length > sampleCount)
            samples.shift();
        const maxLatency = Math.max(...samples.map((sample) => Math.max(...sample.map(({ latency }) => latency))));
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
        onTransports(scores.map(([, i]) => transports[i]));
        await (0, wait_js_1.wait)(interval);
        rankTransports_();
    };
    rankTransports_();
}
//# sourceMappingURL=fallback.js.map