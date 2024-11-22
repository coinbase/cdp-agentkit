import type { Address } from 'abitype';
import { type GetBlockErrorType } from '../../actions/public/getBlock.js';
import { type GetProofErrorType } from '../../actions/public/getProof.js';
import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import type { ErrorType } from '../../errors/utils.js';
import type { Account, DeriveAccount, GetAccountParameter } from '../../types/account.js';
import type { Chain, DeriveChain, GetChainParameter } from '../../types/chain.js';
import type { Hex } from '../../types/misc.js';
import type { OneOf, Prettify } from '../../types/utils.js';
import type { Withdrawal } from '../types/withdrawal.js';
import { type GetWithdrawalHashStorageSlotErrorType } from '../utils/getWithdrawalHashStorageSlot.js';
import type { GetGameReturnType } from './getGame.js';
import type { GetL2OutputReturnType } from './getL2Output.js';
import type { ProveWithdrawalParameters } from './proveWithdrawal.js';
export type BuildProveWithdrawalParameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined, chainOverride extends Chain | undefined = Chain | undefined, accountOverride extends Account | Address | undefined = Account | Address | undefined, _derivedChain extends Chain | undefined = DeriveChain<chain, chainOverride>> = GetAccountParameter<account, accountOverride, false> & GetChainParameter<chain, chainOverride> & {
    withdrawal: Withdrawal;
} & OneOf<{
    output: GetL2OutputReturnType;
} | {
    game: GetGameReturnType;
}>;
export type BuildProveWithdrawalReturnType<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined, chainOverride extends Chain | undefined = Chain | undefined, accountOverride extends Account | Address | undefined = Account | Address | undefined> = Prettify<Pick<ProveWithdrawalParameters, 'l2OutputIndex' | 'outputRootProof' | 'withdrawalProof' | 'withdrawal'> & {
    account: DeriveAccount<account, accountOverride>;
    targetChain: DeriveChain<chain, chainOverride>;
}>;
export type BuildProveWithdrawalErrorType = GetBlockErrorType | GetProofErrorType | GetWithdrawalHashStorageSlotErrorType | ErrorType;
/**
 * Builds the transaction that proves a withdrawal was initiated on an L2. Used in the Withdrawal flow.
 *
 * - Docs: https://viem.sh/op-stack/actions/buildProveWithdrawal
 *
 * @param client - Client to use
 * @param parameters - {@link BuildProveWithdrawalParameters}
 * @returns The prove withdraw transaction request. {@link BuildProveWithdrawalReturnType}
 *
 * @example
 * import { createPublicClient, http } from 'viem'
 * import { optimism } from 'viem/chains'
 * import { buildProveWithdrawal } from 'viem/op-stack'
 *
 * const publicClientL2 = createPublicClient({
 *   chain: optimism,
 *   transport: http(),
 * })
 *
 * const args = await buildProveWithdrawal(publicClientL2, {
 *   output: { ... },
 *   withdrawal: { ... },
 * })
 */
export declare function buildProveWithdrawal<chain extends Chain | undefined, account extends Account | undefined, chainOverride extends Chain | undefined = undefined, accountOverride extends Account | Address | undefined = undefined>(client: Client<Transport, chain, account>, args: BuildProveWithdrawalParameters<chain, account, chainOverride, accountOverride>): Promise<BuildProveWithdrawalReturnType<chain, account, chainOverride, accountOverride>>;
/** @internal */
export declare function maybeAddProofNode(key: string, proof: readonly Hex[]): readonly `0x${string}`[];
//# sourceMappingURL=buildProveWithdrawal.d.ts.map