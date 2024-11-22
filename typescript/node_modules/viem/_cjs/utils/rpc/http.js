"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHttpRpcClient = getHttpRpcClient;
const request_js_1 = require("../../errors/request.js");
const withTimeout_js_1 = require("../promise/withTimeout.js");
const stringify_js_1 = require("../stringify.js");
const id_js_1 = require("./id.js");
function getHttpRpcClient(url, options = {}) {
    return {
        async request(params) {
            const { body, onRequest = options.onRequest, onResponse = options.onResponse, timeout = options.timeout ?? 10_000, } = params;
            const fetchOptions = {
                ...(options.fetchOptions ?? {}),
                ...(params.fetchOptions ?? {}),
            };
            const { headers, method, signal: signal_ } = fetchOptions;
            try {
                const response = await (0, withTimeout_js_1.withTimeout)(async ({ signal }) => {
                    const init = {
                        ...fetchOptions,
                        body: Array.isArray(body)
                            ? (0, stringify_js_1.stringify)(body.map((body) => ({
                                jsonrpc: '2.0',
                                id: body.id ?? id_js_1.idCache.take(),
                                ...body,
                            })))
                            : (0, stringify_js_1.stringify)({
                                jsonrpc: '2.0',
                                id: body.id ?? id_js_1.idCache.take(),
                                ...body,
                            }),
                        headers: {
                            'Content-Type': 'application/json',
                            ...headers,
                        },
                        method: method || 'POST',
                        signal: signal_ || (timeout > 0 ? signal : null),
                    };
                    const request = new Request(url, init);
                    const args = (await onRequest?.(request, init)) ?? { ...init, url };
                    const response = await fetch(args.url ?? url, args);
                    return response;
                }, {
                    errorInstance: new request_js_1.TimeoutError({ body, url }),
                    timeout,
                    signal: true,
                });
                if (onResponse)
                    await onResponse(response);
                let data;
                if (response.headers.get('Content-Type')?.startsWith('application/json'))
                    data = await response.json();
                else {
                    data = await response.text();
                    try {
                        data = JSON.parse(data || '{}');
                    }
                    catch (err) {
                        if (response.ok)
                            throw err;
                        data = { error: data };
                    }
                }
                if (!response.ok) {
                    throw new request_js_1.HttpRequestError({
                        body,
                        details: (0, stringify_js_1.stringify)(data.error) || response.statusText,
                        headers: response.headers,
                        status: response.status,
                        url,
                    });
                }
                return data;
            }
            catch (err) {
                if (err instanceof request_js_1.HttpRequestError)
                    throw err;
                if (err instanceof request_js_1.TimeoutError)
                    throw err;
                throw new request_js_1.HttpRequestError({
                    body,
                    cause: err,
                    url,
                });
            }
        },
    };
}
//# sourceMappingURL=http.js.map