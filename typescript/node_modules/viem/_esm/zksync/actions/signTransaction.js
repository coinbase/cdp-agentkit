import { signTransaction as signTransaction_ } from '../../actions/wallet/signTransaction.js';
import { isEIP712Transaction } from '../utils/isEip712Transaction.js';
import { signEip712Transaction } from './signEip712Transaction.js';
/**
 * Signs a transaction.
 *
 * - Docs: https://viem.sh/docs/zksync/actions/signTransaction
 *
 * @param args - {@link SignTransactionParameters}
 * @returns The signed serialized transaction. {@link SignTransactionReturnType}
 *
 * @example
 * import { createWalletClient, custom } from 'viem'
 * import { zksync } from 'viem/chains'
 * import { signTransaction } from 'viem/zksync'
 *
 * const client = createWalletClient({
 *   chain: zksync,
 *   transport: custom(window.ethereum),
 * })
 * const signature = await signTransaction(client, {
 *   account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
 *   to: '0x0000000000000000000000000000000000000000',
 *   value: 1n,
 * })
 *
 * @example
 * // Account Hoisting
 * import { createWalletClient, http } from 'viem'
 * import { privateKeyToAccount } from 'viem/accounts'
 * import { zksync } from 'viem/chains'
 * import { signTransaction } from 'viem/zksync'
 *
 * const client = createWalletClient({
 *   account: privateKeyToAccount('0x…'),
 *   chain: zksync,
 *   transport: custom(window.ethereum),
 * })
 * const signature = await signTransaction(client, {
 *   to: '0x0000000000000000000000000000000000000000',
 *   value: 1n,
 * })
 */
export async function signTransaction(client, args) {
    if (isEIP712Transaction(args))
        return signEip712Transaction(client, args);
    return await signTransaction_(client, args);
}
//# sourceMappingURL=signTransaction.js.map