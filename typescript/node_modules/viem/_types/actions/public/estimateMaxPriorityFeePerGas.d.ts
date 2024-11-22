import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import { type Eip1559FeesNotSupportedErrorType } from '../../errors/fee.js';
import type { ErrorType } from '../../errors/utils.js';
import type { Account } from '../../types/account.js';
import type { Block } from '../../types/block.js';
import type { Chain } from '../../types/chain.js';
import type { GetChainParameter } from '../../types/chain.js';
import type { RequestErrorType } from '../../utils/buildRequest.js';
import { type HexToBigIntErrorType } from '../../utils/encoding/fromHex.js';
import type { PrepareTransactionRequestParameters } from '../wallet/prepareTransactionRequest.js';
import { type GetBlockErrorType } from './getBlock.js';
import { type GetGasPriceErrorType } from './getGasPrice.js';
export type EstimateMaxPriorityFeePerGasParameters<chain extends Chain | undefined = Chain | undefined, chainOverride extends Chain | undefined = Chain | undefined> = GetChainParameter<chain, chainOverride>;
export type EstimateMaxPriorityFeePerGasReturnType = bigint;
export type EstimateMaxPriorityFeePerGasErrorType = GetBlockErrorType | HexToBigIntErrorType | RequestErrorType | GetBlockErrorType | GetGasPriceErrorType | Eip1559FeesNotSupportedErrorType | ErrorType;
/**
 * Returns an estimate for the max priority fee per gas (in wei) for a
 * transaction to be likely included in the next block.
 * Defaults to [`chain.fees.defaultPriorityFee`](/docs/clients/chains#fees-defaultpriorityfee) if set.
 *
 * - Docs: https://viem.sh/docs/actions/public/estimateMaxPriorityFeePerGas
 *
 * @param client - Client to use
 * @returns An estimate (in wei) for the max priority fee per gas. {@link EstimateMaxPriorityFeePerGasReturnType}
 *
 * @example
 * import { createPublicClient, http } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { estimateMaxPriorityFeePerGas } from 'viem/actions'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const maxPriorityFeePerGas = await estimateMaxPriorityFeePerGas(client)
 * // 10000000n
 */
export declare function estimateMaxPriorityFeePerGas<chain extends Chain | undefined, chainOverride extends Chain | undefined>(client: Client<Transport, chain>, args?: EstimateMaxPriorityFeePerGasParameters<chain, chainOverride> | undefined): Promise<EstimateMaxPriorityFeePerGasReturnType>;
export declare function internal_estimateMaxPriorityFeePerGas<chain extends Chain | undefined, chainOverride extends Chain | undefined>(client: Client<Transport, chain>, args: EstimateMaxPriorityFeePerGasParameters<chain, chainOverride> & {
    block?: Block | undefined;
    request?: PrepareTransactionRequestParameters<chain, Account | undefined, chainOverride> | undefined;
}): Promise<EstimateMaxPriorityFeePerGasReturnType>;
//# sourceMappingURL=estimateMaxPriorityFeePerGas.d.ts.map