import type { Address } from 'abitype';
import type { Account } from '../../accounts/types.js';
import { type ParseAccountErrorType } from '../../accounts/utils/parseAccount.js';
import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import { type RecoverAuthorizationAddressErrorType } from '../../experimental/eip7702/utils/recoverAuthorizationAddress.js';
import type { BlockTag } from '../../types/block.js';
import type { Chain } from '../../types/chain.js';
import type { StateOverride } from '../../types/stateOverride.js';
import type { UnionOmit } from '../../types/utils.js';
import type { RequestErrorType } from '../../utils/buildRequest.js';
import { type NumberToHexErrorType } from '../../utils/encoding/toHex.js';
import { type GetEstimateGasErrorReturnType } from '../../utils/errors/getEstimateGasError.js';
import { type FormattedTransactionRequest } from '../../utils/formatters/transactionRequest.js';
import { type AssertRequestErrorType } from '../../utils/transaction/assertRequest.js';
export type EstimateGasParameters<chain extends Chain | undefined = Chain | undefined> = UnionOmit<FormattedEstimateGas<chain>, 'from'> & {
    account?: Account | Address | undefined;
    stateOverride?: StateOverride | undefined;
} & ({
    /** The balance of the account at a block number. */
    blockNumber?: bigint | undefined;
    blockTag?: undefined;
} | {
    blockNumber?: undefined;
    /**
     * The balance of the account at a block tag.
     * @default 'latest'
     */
    blockTag?: BlockTag | undefined;
});
type FormattedEstimateGas<chain extends Chain | undefined = Chain | undefined> = FormattedTransactionRequest<chain>;
export type EstimateGasReturnType = bigint;
export type EstimateGasErrorType = GetEstimateGasErrorReturnType<ParseAccountErrorType | NumberToHexErrorType | RequestErrorType | RecoverAuthorizationAddressErrorType | AssertRequestErrorType>;
/**
 * Estimates the gas necessary to complete a transaction without submitting it to the network.
 *
 * - Docs: https://viem.sh/docs/actions/public/estimateGas
 * - JSON-RPC Methods: [`eth_estimateGas`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_estimategas)
 *
 * @param client - Client to use
 * @param parameters - {@link EstimateGasParameters}
 * @returns The gas estimate (in wei). {@link EstimateGasReturnType}
 *
 * @example
 * import { createPublicClient, http, parseEther } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { estimateGas } from 'viem/public'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const gasEstimate = await estimateGas(client, {
 *   account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
 *   to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
 *   value: parseEther('1'),
 * })
 */
export declare function estimateGas<chain extends Chain | undefined, account extends Account | undefined = undefined>(client: Client<Transport, chain, account>, args: EstimateGasParameters<chain>): Promise<EstimateGasReturnType>;
export {};
//# sourceMappingURL=estimateGas.d.ts.map