import { createClient, } from '../../clients/createClient.js';
import { paymasterActions, } from './decorators/paymaster.js';
export function createPaymasterClient(parameters) {
    const { key = 'bundler', name = 'Bundler Client', transport } = parameters;
    const client = createClient({
        ...parameters,
        key,
        name,
        transport,
        type: 'PaymasterClient',
    });
    return client.extend(paymasterActions);
}
//# sourceMappingURL=createPaymasterClient.js.map