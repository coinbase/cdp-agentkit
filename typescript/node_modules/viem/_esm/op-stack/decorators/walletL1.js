import { depositTransaction, } from '../actions/depositTransaction.js';
import { finalizeWithdrawal, } from '../actions/finalizeWithdrawal.js';
import { proveWithdrawal, } from '../actions/proveWithdrawal.js';
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
export function walletActionsL1() {
    return (client) => {
        return {
            depositTransaction: (args) => depositTransaction(client, args),
            finalizeWithdrawal: (args) => finalizeWithdrawal(client, args),
            proveWithdrawal: (args) => proveWithdrawal(client, args),
        };
    };
}
//# sourceMappingURL=walletL1.js.map