import { checksumAddress, } from '../../utils/address/getAddress.js';
/**
 * Returns a list of account addresses owned by the wallet or client.
 *
 * - Docs: https://viem.sh/docs/actions/wallet/getAddresses
 * - JSON-RPC Methods: [`eth_accounts`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_accounts)
 *
 * @param client - Client to use
 * @returns List of account addresses owned by the wallet or client. {@link GetAddressesReturnType}
 *
 * @example
 * import { createWalletClient, custom } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { getAddresses } from 'viem/wallet'
 *
 * const client = createWalletClient({
 *   chain: mainnet,
 *   transport: custom(window.ethereum),
 * })
 * const accounts = await getAddresses(client)
 */
export async function getAddresses(client) {
    if (client.account?.type === 'local')
        return [client.account.address];
    const addresses = await client.request({ method: 'eth_accounts' }, { dedupe: true });
    return addresses.map((address) => checksumAddress(address));
}
//# sourceMappingURL=getAddresses.js.map