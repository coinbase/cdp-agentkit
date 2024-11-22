import { createClient, } from './createClient.js';
import { walletActions } from './decorators/wallet.js';
export function createWalletClient(parameters) {
    const { key = 'wallet', name = 'Wallet Client', transport } = parameters;
    const client = createClient({
        ...parameters,
        key,
        name,
        transport,
        type: 'walletClient',
    });
    return client.extend(walletActions);
}
//# sourceMappingURL=createWalletClient.js.map