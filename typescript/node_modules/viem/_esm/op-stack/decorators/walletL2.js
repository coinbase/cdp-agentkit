import { initiateWithdrawal, } from '../actions/initiateWithdrawal.js';
/**
 * A suite of Wallet Actions for suited for development with Layer 2 (OP Stack) chains.
 *
 * - Docs: https://viem.sh/op-stack/client
 *
 * @example
 * import { createPublicClient, createWalletClient, http } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { walletActionsL1 } from 'viem/op-stack'
 *
 * const walletClient = createWalletClient({
 *   chain: mainnet,
 *   transport: http(),
 * }).extend(walletActionsL1())
 *
 * const hash = await walletClient.depositTransaction({...})
 */
export function walletActionsL2() {
    return (client) => {
        return {
            initiateWithdrawal: (args) => initiateWithdrawal(client, args),
        };
    };
}
//# sourceMappingURL=walletL2.js.map