import { getAddress } from '../../utils/address/getAddress.js';
/**
 * Requests a list of accounts managed by a wallet.
 *
 * - Docs: https://viem.sh/docs/actions/wallet/requestAddresses
 * - JSON-RPC Methods: [`eth_requestAccounts`](https://eips.ethereum.org/EIPS/eip-1102)
 *
 * Sends a request to the wallet, asking for permission to access the user's accounts. After the user accepts the request, it will return a list of accounts (addresses).
 *
 * This API can be useful for dapps that need to access the user's accounts in order to execute transactions or interact with smart contracts.
 *
 * @param client - Client to use
 * @returns List of accounts managed by a wallet {@link RequestAddressesReturnType}
 *
 * @example
 * import { createWalletClient, custom } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { requestAddresses } from 'viem/wallet'
 *
 * const client = createWalletClient({
 *   chain: mainnet,
 *   transport: custom(window.ethereum),
 * })
 * const accounts = await requestAddresses(client)
 */
export async function requestAddresses(client) {
    const addresses = await client.request({ method: 'eth_requestAccounts' }, { dedupe: true, retryCount: 0 });
    return addresses.map((address) => getAddress(address));
}
//# sourceMappingURL=requestAddresses.js.map