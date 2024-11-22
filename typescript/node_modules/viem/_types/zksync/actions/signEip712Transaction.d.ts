import type { Account } from '../../accounts/types.js';
import type { SignTransactionErrorType, SignTransactionReturnType } from '../../actions/wallet/signTransaction.js';
import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import type { GetAccountParameter } from '../../types/account.js';
import type { ExtractChainFormatterParameters, GetChainParameter } from '../../types/chain.js';
import type { UnionOmit } from '../../types/utils.js';
import type { ChainEIP712 } from '../types/chain.js';
import type { TransactionRequestEIP712 } from '../types/transaction.js';
type FormattedTransactionRequest<chain extends ChainEIP712 | undefined = ChainEIP712 | undefined> = ExtractChainFormatterParameters<chain, 'transactionRequest', TransactionRequestEIP712>;
export type SignEip712TransactionParameters<chain extends ChainEIP712 | undefined = ChainEIP712 | undefined, account extends Account | undefined = Account | undefined, chainOverride extends ChainEIP712 | undefined = ChainEIP712 | undefined> = UnionOmit<FormattedTransactionRequest<chainOverride extends ChainEIP712 ? chainOverride : chain>, 'from'> & GetAccountParameter<account> & GetChainParameter<chain, chainOverride>;
export type SignEip712TransactionReturnType = SignTransactionReturnType;
export type SignEip712TransactionErrorType = SignTransactionErrorType;
/**
 * Signs an EIP712 transaction.
 *
 * @param args - {@link SignTransactionParameters}
 * @returns The signed serialized transaction. {@link SignTransactionReturnType}
 *
 * @example
 * import { createWalletClient, custom } from 'viem'
 * import { zksync } from 'viem/chains'
 * import { signEip712Transaction } from 'viem/zksync'
 *
 * const client = createWalletClient({
 *   chain: zksync,
 *   transport: custom(window.ethereum),
 * })
 * const signature = await signEip712Transaction(client, {
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
 * import { signEip712Transaction } from 'viem/zksync'
 *
 * const client = createWalletClient({
 *   account: privateKeyToAccount('0x…'),
 *   chain: zksync,
 *   transport: custom(window.ethereum),
 * })
 * const signature = await signEip712Transaction(client, {
 *   to: '0x0000000000000000000000000000000000000000',
 *   value: 1n,
 * })
 */
export declare function signEip712Transaction<chain extends ChainEIP712 | undefined, account extends Account | undefined, chainOverride extends ChainEIP712 | undefined>(client: Client<Transport, chain, account>, args: SignEip712TransactionParameters<chain, account, chainOverride>): Promise<SignEip712TransactionReturnType>;
export {};
//# sourceMappingURL=signEip712Transaction.d.ts.map