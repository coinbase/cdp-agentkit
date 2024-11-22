import type { Account } from '../../accounts/types.js';
import type { SendTransactionErrorType, SendTransactionParameters, SendTransactionRequest, SendTransactionReturnType } from '../../actions/wallet/sendTransaction.js';
import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import type { ChainEIP712 } from '../types/chain.js';
export type SendEip712TransactionParameters<chain extends ChainEIP712 | undefined = ChainEIP712 | undefined, account extends Account | undefined = Account | undefined, chainOverride extends ChainEIP712 | undefined = ChainEIP712 | undefined, request extends SendTransactionRequest<chain, chainOverride> = SendTransactionRequest<chain, chainOverride>> = SendTransactionParameters<chain, account, chainOverride, request>;
export type SendEip712TransactionReturnType = SendTransactionReturnType;
export type SendEip712TransactionErrorType = SendTransactionErrorType;
/**
 * Creates, signs, and sends a new EIP712 transaction to the network.
 *
 * @param client - Client to use
 * @param parameters - {@link SendEip712TransactionParameters}
 * @returns The [Transaction](https://viem.sh/docs/glossary/terms#transaction) hash. {@link SendTransactionReturnType}
 *
 * @example
 * import { createWalletClient, custom } from 'viem'
 * import { zksync } from 'viem/chains'
 * import { sendEip712Transaction } from 'viem/zksync'
 *
 * const client = createWalletClient({
 *   chain: zksync,
 *   transport: custom(window.ethereum),
 * })
 * const hash = await sendEip712Transaction(client, {
 *   account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
 *   to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
 *   value: 1000000000000000000n,
 * })
 *
 * @example
 * // Account Hoisting
 * import { createWalletClient, http } from 'viem'
 * import { privateKeyToAccount } from 'viem/accounts'
 * import { zksync } from 'viem/chains'
 * import { sendEip712Transaction } from 'viem/zksync'
 *
 * const client = createWalletClient({
 *   account: privateKeyToAccount('0x…'),
 *   chain: zksync,
 *   transport: http(),
 * })
 *
 * const hash = await sendEip712Transaction(client, {
 *   to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
 *   value: 1000000000000000000n,
 * })
 */
export declare function sendEip712Transaction<chain extends ChainEIP712 | undefined, account extends Account | undefined, const request extends SendTransactionRequest<chain, chainOverride>, chainOverride extends ChainEIP712 | undefined = undefined>(client: Client<Transport, chain, account>, parameters: SendEip712TransactionParameters<chain, account, chainOverride, request>): Promise<SendEip712TransactionReturnType>;
//# sourceMappingURL=sendEip712Transaction.d.ts.map