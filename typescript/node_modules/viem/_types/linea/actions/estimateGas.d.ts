import type { Account } from '../../accounts/types.js';
import type { EstimateGasParameters as EstimateGasParameters_base } from '../../actions/public/estimateGas.js';
import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import type { GetAccountParameter } from '../../types/account.js';
import type { Chain } from '../../types/chain.js';
export type EstimateGasParameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = EstimateGasParameters_base<chain> & GetAccountParameter<account>;
export type EstimateGasReturnType = {
    gasLimit: bigint;
    baseFeePerGas: bigint;
    priorityFeePerGas: bigint;
};
/**
 * Estimates the gas and fees per gas necessary to complete a transaction without submitting it to the network.
 *
 * @param client - Client to use
 * @param parameters - {@link EstimateGasParameters}
 * @returns A gas estimate and fees per gas (in wei). {@link EstimateGasReturnType}
 *
 * @example
 * import { createPublicClient, http, parseEther } from 'viem'
 * import { linea } from 'viem/chains'
 * import { estimateGas } from 'viem/linea'
 *
 * const client = createPublicClient({
 *   chain: linea,
 *   transport: http(),
 * })
 * const gasEstimate = await estimateGas(client, {
 *   account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
 *   to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
 *   value: 0n,
 * })
 */
export declare function estimateGas<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, args: EstimateGasParameters<chain>): Promise<EstimateGasReturnType>;
//# sourceMappingURL=estimateGas.d.ts.map