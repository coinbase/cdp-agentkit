/**
 * Requests for the wallet to show information about a call batch
 * that was sent via `sendCalls`.
 *
 * - Docs: https://viem.sh/experimental/eip5792/showCallsStatus
 * - JSON-RPC Methods: [`wallet_showCallsStatus`](https://eips.ethereum.org/EIPS/eip-5792)
 *
 * @param client - Client to use
 * @returns Status of the calls. {@link ShowCallsStatusReturnType}
 *
 * @example
 * import { createWalletClient, custom } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { showCallsStatus } from 'viem/wallet'
 *
 * const client = createWalletClient({
 *   chain: mainnet,
 *   transport: custom(window.ethereum),
 * })
 * await showCallsStatus(client, { id: '0xdeadbeef' })
 */
export async function showCallsStatus(client, parameters) {
    const { id } = parameters;
    await client.request({
        method: 'wallet_showCallsStatus',
        params: [id],
    });
    return;
}
//# sourceMappingURL=showCallsStatus.js.map