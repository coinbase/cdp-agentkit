import { type EstimateGasErrorType } from '../../actions/public/estimateGas.js';
import { type GetGasPriceErrorType } from '../../actions/public/getGasPrice.js';
import { type PrepareTransactionRequestErrorType } from '../../actions/wallet/prepareTransactionRequest.js';
import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import type { ErrorType } from '../../errors/utils.js';
import type { Account } from '../../types/account.js';
import type { Chain } from '../../types/chain.js';
import type { RequestErrorType } from '../../utils/buildRequest.js';
import { type EstimateL1FeeErrorType, type EstimateL1FeeParameters } from './estimateL1Fee.js';
export type EstimateTotalFeeParameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined, chainOverride extends Chain | undefined = Chain | undefined> = EstimateL1FeeParameters<chain, account, chainOverride>;
export type EstimateTotalFeeReturnType = bigint;
export type EstimateTotalFeeErrorType = RequestErrorType | PrepareTransactionRequestErrorType | EstimateL1FeeErrorType | EstimateGasErrorType | GetGasPriceErrorType | ErrorType;
/**
 * Estimates the L1 data fee + L2 fee to execute an L2 transaction.
 *
 * @param client - Client to use
 * @param parameters - {@link EstimateTotalFeeParameters}
 * @returns The fee (in wei). {@link EstimateTotalFeeReturnType}
 *
 * @example
 * import { createPublicClient, http, parseEther } from 'viem'
 * import { optimism } from 'viem/chains'
 * import { estimateTotalFee } from 'viem/chains/optimism'
 *
 * const client = createPublicClient({
 *   chain: optimism,
 *   transport: http(),
 * })
 * const totalGas = await estimateTotalFee(client, {
 *   account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
 *   to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
 *   value: parseEther('1'),
 * })
 */
export declare function estimateTotalFee<chain extends Chain | undefined, account extends Account | undefined, chainOverride extends Chain | undefined = undefined>(client: Client<Transport, chain, account>, args: EstimateTotalFeeParameters<chain, account, chainOverride>): Promise<EstimateTotalFeeReturnType>;
//# sourceMappingURL=estimateTotalFee.d.ts.map