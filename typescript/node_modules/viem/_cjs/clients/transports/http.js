"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.http = http;
const request_js_1 = require("../../errors/request.js");
const transport_js_1 = require("../../errors/transport.js");
const createBatchScheduler_js_1 = require("../../utils/promise/createBatchScheduler.js");
const http_js_1 = require("../../utils/rpc/http.js");
const createTransport_js_1 = require("./createTransport.js");
function http(url, config = {}) {
    const { batch, fetchOptions, key = 'http', name = 'HTTP JSON-RPC', onFetchRequest, onFetchResponse, retryDelay, } = config;
    return ({ chain, retryCount: retryCount_, timeout: timeout_ }) => {
        const { batchSize = 1000, wait = 0 } = typeof batch === 'object' ? batch : {};
        const retryCount = config.retryCount ?? retryCount_;
        const timeout = timeout_ ?? config.timeout ?? 10_000;
        const url_ = url || chain?.rpcUrls.default.http[0];
        if (!url_)
            throw new transport_js_1.UrlRequiredError();
        const rpcClient = (0, http_js_1.getHttpRpcClient)(url_, {
            fetchOptions,
            onRequest: onFetchRequest,
            onResponse: onFetchResponse,
            timeout,
        });
        return (0, createTransport_js_1.createTransport)({
            key,
            name,
            async request({ method, params }) {
                const body = { method, params };
                const { schedule } = (0, createBatchScheduler_js_1.createBatchScheduler)({
                    id: url_,
                    wait,
                    shouldSplitBatch(requests) {
                        return requests.length > batchSize;
                    },
                    fn: (body) => rpcClient.request({
                        body,
                    }),
                    sort: (a, b) => a.id - b.id,
                });
                const fn = async (body) => batch
                    ? schedule(body)
                    : [
                        await rpcClient.request({
                            body,
                        }),
                    ];
                const [{ error, result }] = await fn(body);
                if (error)
                    throw new request_js_1.RpcRequestError({
                        body,
                        error,
                        url: url_,
                    });
                return result;
            },
            retryCount,
            retryDelay,
            timeout,
            type: 'http',
        }, {
            fetchOptions,
            url: url_,
        });
    };
}
//# sourceMappingURL=http.js.map