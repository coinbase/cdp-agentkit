import { createClient, } from '../../clients/createClient.js';
import { bundlerActions } from './decorators/bundler.js';
export function createBundlerClient(parameters) {
    const { client: client_, key = 'bundler', name = 'Bundler Client', paymaster, paymasterContext, transport, userOperation, } = parameters;
    const client = Object.assign(createClient({
        ...parameters,
        chain: parameters.chain ?? client_?.chain,
        key,
        name,
        transport,
        type: 'bundlerClient',
    }), { client: client_, paymaster, paymasterContext, userOperation });
    return client.extend(bundlerActions);
}
//# sourceMappingURL=createBundlerClient.js.map