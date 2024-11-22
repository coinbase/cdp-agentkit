/**
 * Scopes `request` to the filter ID. If the client is a fallback, it will
 * listen for responses and scope the child transport `request` function
 * to the successful filter ID.
 */
export function createFilterRequestScope(client, { method }) {
    const requestMap = {};
    if (client.transport.type === 'fallback')
        client.transport.onResponse?.(({ method: method_, response: id, status, transport, }) => {
            if (status === 'success' && method === method_)
                requestMap[id] = transport.request;
        });
    return ((id) => requestMap[id] || client.request);
}
//# sourceMappingURL=createFilterRequestScope.js.map