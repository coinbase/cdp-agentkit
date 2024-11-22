import { parseAccount, } from '../accounts/utils/parseAccount.js';
import { uid } from '../utils/uid.js';
export function createClient(parameters) {
    const { batch, cacheTime = parameters.pollingInterval ?? 4_000, ccipRead, key = 'base', name = 'Base Client', pollingInterval = 4_000, type = 'base', } = parameters;
    const chain = parameters.chain;
    const account = parameters.account
        ? parseAccount(parameters.account)
        : undefined;
    const { config, request, value } = parameters.transport({
        chain,
        pollingInterval,
    });
    const transport = { ...config, ...value };
    const client = {
        account,
        batch,
        cacheTime,
        ccipRead,
        chain,
        key,
        name,
        pollingInterval,
        request,
        transport,
        type,
        uid: uid(),
    };
    function extend(base) {
        return (extendFn) => {
            const extended = extendFn(base);
            for (const key in client)
                delete extended[key];
            const combined = { ...base, ...extended };
            return Object.assign(combined, { extend: extend(combined) });
        };
    }
    return Object.assign(client, { extend: extend(client) });
}
/**
 * Defines a typed JSON-RPC schema for the client.
 * Note: This is a runtime noop function.
 */
export function rpcSchema() {
    return null;
}
//# sourceMappingURL=createClient.js.map