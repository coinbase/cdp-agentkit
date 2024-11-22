import type { Address } from 'abitype';
import { type ReadContractErrorType } from '../../actions/public/readContract.js';
import { type PrepareTransactionRequestErrorType } from '../../actions/wallet/prepareTransactionRequest.js';
import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import type { ErrorType } from '../../errors/utils.js';
import type { Account, GetAccountParameter } from '../../types/account.js';
import type { Chain, GetChainParameter } from '../../types/chain.js';
import type { TransactionRequestEIP1559 } from '../../types/transaction.js';
import type { RequestErrorType } from '../../utils/buildRequest.js';
import type { HexToNumberErrorType } from '../../utils/encoding/fromHex.js';
import { type AssertRequestErrorType } from '../../utils/transaction/assertRequest.js';
import { type SerializeTransactionErrorType } from '../../utils/transaction/serializeTransaction.js';
export type EstimateL1FeeParameters<TChain extends Chain | undefined = Chain | undefined, TAccount extends Account | undefined = Account | undefined, TChainOverride extends Chain | undefined = undefined> = Omit<TransactionRequestEIP1559, 'from'> & GetAccountParameter<TAccount> & GetChainParameter<TChain, TChainOverride> & {
    /** Gas price oracle address. */
    gasPriceOracleAddress?: Address | undefined;
};
export type EstimateL1FeeReturnType = bigint;
export type EstimateL1FeeErrorType = RequestErrorType | PrepareTransactionRequestErrorType | AssertRequestErrorType | SerializeTransactionErrorType | HexToNumberErrorType | ReadContractErrorType | ErrorType;
/**
 * Estimates the L1 data fee required to execute an L2 transaction.
 *
 * @param client - Client to use
 * @param parameters - {@link EstimateL1FeeParameters}
 * @returns The fee (in wei). {@link EstimateL1FeeReturnType}
 *
 * @example
 * import { createPublicClient, http, parseEther } from 'viem'
 * import { optimism } from 'viem/chains'
 * import { estimateL1Fee } from 'viem/chains/optimism'
 *
 * const client = createPublicClient({
 *   chain: optimism,
 *   transport: http(),
 * })
 * const l1Fee = await estimateL1Fee(client, {
 *   account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
 *   to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
 *   value: parseEther('1'),
 * })
 */
export declare function estimateL1Fee<TChain extends Chain | undefined, TAccount extends Account | undefined, TChainOverride extends Chain | undefined = undefined>(client: Client<Transport, TChain, TAccount>, args: EstimateL1FeeParameters<TChain, TAccount, TChainOverride>): Promise<EstimateL1FeeReturnType>;
//# sourceMappingURL=estimateL1Fee.d.ts.map