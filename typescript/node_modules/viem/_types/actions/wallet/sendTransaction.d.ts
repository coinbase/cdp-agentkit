import type { Address } from 'abitype';
import type { Account } from '../../accounts/types.js';
import { type ParseAccountErrorType } from '../../accounts/utils/parseAccount.js';
import type { SignTransactionErrorType } from '../../accounts/utils/signTransaction.js';
import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import { type AccountNotFoundErrorType, type AccountTypeNotSupportedErrorType } from '../../errors/account.js';
import type { ErrorType } from '../../errors/utils.js';
import { type RecoverAuthorizationAddressErrorType } from '../../experimental/eip7702/utils/recoverAuthorizationAddress.js';
import type { GetAccountParameter } from '../../types/account.js';
import type { Chain, DeriveChain } from '../../types/chain.js';
import type { GetChainParameter } from '../../types/chain.js';
import type { GetTransactionRequestKzgParameter } from '../../types/kzg.js';
import type { Hash } from '../../types/misc.js';
import type { UnionOmit } from '../../types/utils.js';
import type { RequestErrorType } from '../../utils/buildRequest.js';
import { type AssertCurrentChainErrorType } from '../../utils/chain/assertCurrentChain.js';
import { type GetTransactionErrorReturnType } from '../../utils/errors/getTransactionError.js';
import { type FormattedTransactionRequest } from '../../utils/formatters/transactionRequest.js';
import { type AssertRequestErrorType } from '../../utils/transaction/assertRequest.js';
import { type GetChainIdErrorType } from '../public/getChainId.js';
import { type PrepareTransactionRequestErrorType } from './prepareTransactionRequest.js';
import { type SendRawTransactionErrorType } from './sendRawTransaction.js';
export type SendTransactionRequest<chain extends Chain | undefined = Chain | undefined, chainOverride extends Chain | undefined = Chain | undefined, _derivedChain extends Chain | undefined = DeriveChain<chain, chainOverride>> = UnionOmit<FormattedTransactionRequest<_derivedChain>, 'from'> & GetTransactionRequestKzgParameter;
export type SendTransactionParameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined, chainOverride extends Chain | undefined = Chain | undefined, request extends SendTransactionRequest<chain, chainOverride> = SendTransactionRequest<chain, chainOverride>> = request & GetAccountParameter<account, Account | Address, true, true> & GetChainParameter<chain, chainOverride> & GetTransactionRequestKzgParameter<request>;
export type SendTransactionReturnType = Hash;
export type SendTransactionErrorType = ParseAccountErrorType | GetTransactionErrorReturnType<AccountNotFoundErrorType | AccountTypeNotSupportedErrorType | AssertCurrentChainErrorType | AssertRequestErrorType | GetChainIdErrorType | PrepareTransactionRequestErrorType | SendRawTransactionErrorType | RecoverAuthorizationAddressErrorType | SignTransactionErrorType | RequestErrorType> | ErrorType;
/**
 * Creates, signs, and sends a new transaction to the network.
 *
 * - Docs: https://viem.sh/docs/actions/wallet/sendTransaction
 * - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/transactions_sending-transactions
 * - JSON-RPC Methods:
 *   - JSON-RPC Accounts: [`eth_sendTransaction`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sendtransaction)
 *   - Local Accounts: [`eth_sendRawTransaction`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sendrawtransaction)
 *
 * @param client - Client to use
 * @param parameters - {@link SendTransactionParameters}
 * @returns The [Transaction](https://viem.sh/docs/glossary/terms#transaction) hash. {@link SendTransactionReturnType}
 *
 * @example
 * import { createWalletClient, custom } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { sendTransaction } from 'viem/wallet'
 *
 * const client = createWalletClient({
 *   chain: mainnet,
 *   transport: custom(window.ethereum),
 * })
 * const hash = await sendTransaction(client, {
 *   account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
 *   to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
 *   value: 1000000000000000000n,
 * })
 *
 * @example
 * // Account Hoisting
 * import { createWalletClient, http } from 'viem'
 * import { privateKeyToAccount } from 'viem/accounts'
 * import { mainnet } from 'viem/chains'
 * import { sendTransaction } from 'viem/wallet'
 *
 * const client = createWalletClient({
 *   account: privateKeyToAccount('0x…'),
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const hash = await sendTransaction(client, {
 *   to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
 *   value: 1000000000000000000n,
 * })
 */
export declare function sendTransaction<chain extends Chain | undefined, account extends Account | undefined, const request extends SendTransactionRequest<chain, chainOverride>, chainOverride extends Chain | undefined = undefined>(client: Client<Transport, chain, account>, parameters: SendTransactionParameters<chain, account, chainOverride, request>): Promise<SendTransactionReturnType>;
//# sourceMappingURL=sendTransaction.d.ts.map