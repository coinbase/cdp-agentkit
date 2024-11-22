import type { Address } from 'abitype';
import { type ParseAccountErrorType } from '../../accounts/utils/parseAccount.js';
import { type PrepareTransactionRequestErrorType } from '../../actions/wallet/prepareTransactionRequest.js';
import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import type { ErrorType } from '../../errors/utils.js';
import type { Account, GetAccountParameter } from '../../types/account.js';
import type { Chain, GetChainParameter } from '../../types/chain.js';
import type { Hex } from '../../types/misc.js';
import type { Prettify, UnionOmit } from '../../types/utils.js';
import type { InitiateWithdrawalParameters } from './initiateWithdrawal.js';
export type BuildInitiateWithdrawalParameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined, chainOverride extends Chain | undefined = Chain | undefined, accountOverride extends Account | Address | undefined = Account | Address | undefined> = GetAccountParameter<account, accountOverride, false> & GetChainParameter<chain, chainOverride> & {
    /** Encoded contract method & arguments. */
    data?: Hex | undefined;
    /** Gas limit for transaction execution on the L1. */
    gas?: bigint | undefined;
    /** L1 Transaction recipient. */
    to: Address;
    /** Value in wei to withdrawal to the L1. Debited from the caller's L2 balance. */
    value?: bigint | undefined;
};
export type BuildInitiateWithdrawalReturnType<account extends Account | undefined = Account | undefined, accountOverride extends Account | Address | undefined = Account | Address | undefined> = Prettify<UnionOmit<InitiateWithdrawalParameters<Chain, account, Chain>, 'account'> & GetAccountParameter<account, accountOverride>>;
export type BuildInitiateWithdrawalErrorType = ParseAccountErrorType | PrepareTransactionRequestErrorType | ErrorType;
/**
 * Prepares parameters for a [withdrawal](https://community.optimism.io/docs/protocol/withdrawal-flow/#withdrawal-initiating-transaction) from an L2 to the L1.
 *
 * - Docs: https://viem.sh/op-stack/actions/buildInitiateWithdrawal
 *
 * @param client - Client to use
 * @param parameters - {@link BuildInitiateWithdrawalParameters}
 * @returns Parameters for `depositTransaction`. {@link DepositTransactionReturnType}
 *
 * @example
 * import { createPublicClient, http, parseEther } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { buildInitiateWithdrawal } from 'viem/wallet'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 *
 * const args = await buildInitiateWithdrawal(client, {
 *   account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
 *   to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
 *   value: parseEther('1'),
 * })
 */
export declare function buildInitiateWithdrawal<chain extends Chain | undefined, account extends Account | undefined, chainOverride extends Chain | undefined = undefined, accountOverride extends Account | Address | undefined = undefined>(client: Client<Transport, chain, account>, args: BuildInitiateWithdrawalParameters<chain, account, chainOverride, accountOverride>): Promise<BuildInitiateWithdrawalReturnType<account, accountOverride>>;
//# sourceMappingURL=buildInitiateWithdrawal.d.ts.map