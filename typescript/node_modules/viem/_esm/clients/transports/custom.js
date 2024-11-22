import { createTransport, } from './createTransport.js';
/**
 * @description Creates a custom transport given an EIP-1193 compliant `request` attribute.
 */
export function custom(provider, config = {}) {
    const { key = 'custom', name = 'Custom Provider', retryDelay } = config;
    return ({ retryCount: defaultRetryCount }) => createTransport({
        key,
        name,
        request: provider.request.bind(provider),
        retryCount: config.retryCount ?? defaultRetryCount,
        retryDelay,
        type: 'custom',
    });
}
//# sourceMappingURL=custom.js.map