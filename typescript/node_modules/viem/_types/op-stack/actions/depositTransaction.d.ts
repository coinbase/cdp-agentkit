import type { Address } from 'abitype';
import { type WriteContractErrorType } from '../../actions/wallet/writeContract.js';
import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import type { ErrorType } from '../../errors/utils.js';
import type { Account, GetAccountParameter } from '../../types/account.js';
import type { Chain, DeriveChain, GetChainParameter } from '../../types/chain.js';
import type { Hash } from '../../types/misc.js';
import type { UnionEvaluate, UnionOmit } from '../../types/utils.js';
import type { FormattedTransactionRequest } from '../../utils/formatters/transactionRequest.js';
import type { GetContractAddressParameter } from '../types/contract.js';
import type { DepositRequest } from '../types/deposit.js';
import { type EstimateDepositTransactionGasErrorType } from './estimateDepositTransactionGas.js';
export type DepositTransactionParameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined, chainOverride extends Chain | undefined = Chain | undefined, _derivedChain extends Chain | undefined = DeriveChain<chain, chainOverride>> = UnionEvaluate<UnionOmit<FormattedTransactionRequest<_derivedChain>, 'accessList' | 'data' | 'from' | 'gas' | 'gasPrice' | 'to' | 'type' | 'value'>> & GetAccountParameter<account, Account | Address> & GetChainParameter<chain, chainOverride> & GetContractAddressParameter<_derivedChain, 'portal'> & {
    /** L2 transaction request. */
    request: DepositRequest;
    /**
     * Gas limit for transaction execution on the L1.
     * `null` to skip gas estimation & defer calculation to signer.
     */
    gas?: bigint | null | undefined;
};
export type DepositTransactionReturnType = Hash;
export type DepositTransactionErrorType = EstimateDepositTransactionGasErrorType | WriteContractErrorType | ErrorType;
/**
 * Initiates a [deposit transaction](https://github.com/ethereum-optimism/optimism/blob/develop/specs/deposits.md) on an L1, which executes a transaction on L2.
 *
 * Internally performs a contract write to the [`depositTransaction` function](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/L1/OptimismPortal.sol#L378)
 * on the [Optimism Portal contract](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/L1/OptimismPortal.sol).
 *
 * - Docs: https://viem.sh/op-stack/actions/depositTransaction
 *
 * @param client - Client to use
 * @param parameters - {@link DepositTransactionParameters}
 * @returns The L1 transaction hash. {@link DepositTransactionReturnType}
 *
 * @example
 * import { createWalletClient, custom, parseEther } from 'viem'
 * import { base, mainnet } from 'viem/chains'
 * import { depositTransaction } from 'viem/op-stack'
 *
 * const client = createWalletClient({
 *   chain: mainnet,
 *   transport: custom(window.ethereum),
 * })
 *
 * const hash = await depositTransaction(client, {
 *   account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
 *   request: {
 *     gas: 21_000n,
 *     to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
 *     value: parseEther('1'),
 *   },
 *   targetChain: base,
 * })
 *
 * @example
 * // Account Hoisting
 * import { createWalletClient, http } from 'viem'
 * import { privateKeyToAccount } from 'viem/accounts'
 * import { base, mainnet } from 'viem/chains'
 * import { depositTransaction } from 'viem/op-stack'
 *
 * const client = createWalletClient({
 *   account: privateKeyToAccount('0x…'),
 *   chain: mainnet,
 *   transport: http(),
 * })
 *
 * const hash = await depositTransaction(client, {
 *   request: {
 *     gas: 21_000n,
 *     to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
 *     value: parseEther('1'),
 *   },
 *   targetChain: base,
 * })
 */
export declare function depositTransaction<chain extends Chain | undefined, account extends Account | undefined, chainOverride extends Chain | undefined = undefined>(client: Client<Transport, chain, account>, parameters: DepositTransactionParameters<chain, account, chainOverride>): Promise<`0x${string}`>;
//# sourceMappingURL=depositTransaction.d.ts.map