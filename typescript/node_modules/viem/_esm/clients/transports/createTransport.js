import { buildRequest } from '../../utils/buildRequest.js';
import { uid as uid_ } from '../../utils/uid.js';
/**
 * @description Creates an transport intended to be used with a client.
 */
export function createTransport({ key, name, request, retryCount = 3, retryDelay = 150, timeout, type, }, value) {
    const uid = uid_();
    return {
        config: {
            key,
            name,
            request,
            retryCount,
            retryDelay,
            timeout,
            type,
        },
        request: buildRequest(request, { retryCount, retryDelay, uid }),
        value,
    };
}
//# sourceMappingURL=createTransport.js.map