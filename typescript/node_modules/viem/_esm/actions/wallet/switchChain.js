import { numberToHex, } from '../../utils/encoding/toHex.js';
/**
 * Switch the target chain in a wallet.
 *
 * - Docs: https://viem.sh/docs/actions/wallet/switchChain
 * - JSON-RPC Methods: [`eth_switchEthereumChain`](https://eips.ethereum.org/EIPS/eip-3326)
 *
 * @param client - Client to use
 * @param parameters - {@link SwitchChainParameters}
 *
 * @example
 * import { createWalletClient, custom } from 'viem'
 * import { mainnet, optimism } from 'viem/chains'
 * import { switchChain } from 'viem/wallet'
 *
 * const client = createWalletClient({
 *   chain: mainnet,
 *   transport: custom(window.ethereum),
 * })
 * await switchChain(client, { id: optimism.id })
 */
export async function switchChain(client, { id }) {
    await client.request({
        method: 'wallet_switchEthereumChain',
        params: [
            {
                chainId: numberToHex(id),
            },
        ],
    }, { retryCount: 0 });
}
//# sourceMappingURL=switchChain.js.map