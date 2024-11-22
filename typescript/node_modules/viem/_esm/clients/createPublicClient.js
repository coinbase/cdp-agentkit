import { createClient, } from './createClient.js';
import { publicActions } from './decorators/public.js';
/**
 * Creates a Public Client with a given [Transport](https://viem.sh/docs/clients/intro) configured for a [Chain](https://viem.sh/docs/clients/chains).
 *
 * - Docs: https://viem.sh/docs/clients/public
 *
 * A Public Client is an interface to "public" [JSON-RPC API](https://ethereum.org/en/developers/docs/apis/json-rpc/) methods such as retrieving block numbers, transactions, reading from smart contracts, etc through [Public Actions](/docs/actions/public/introduction).
 *
 * @param config - {@link PublicClientConfig}
 * @returns A Public Client. {@link PublicClient}
 *
 * @example
 * import { createPublicClient, http } from 'viem'
 * import { mainnet } from 'viem/chains'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 */
export function createPublicClient(parameters) {
    const { key = 'public', name = 'Public Client' } = parameters;
    const client = createClient({
        ...parameters,
        key,
        name,
        type: 'publicClient',
    });
    return client.extend(publicActions);
}
//# sourceMappingURL=createPublicClient.js.map