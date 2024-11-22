import type { Address } from 'abitype';
import { type ReadContractErrorType } from '../../actions/public/readContract.js';
import type { PrepareTransactionRequestErrorType } from '../../actions/wallet/prepareTransactionRequest.js';
import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import type { ErrorType } from '../../errors/utils.js';
import type { Chain, GetChainParameter } from '../../types/chain.js';
import type { RequestErrorType } from '../../utils/buildRequest.js';
import type { HexToNumberErrorType } from '../../utils/encoding/fromHex.js';
export type GetL1BaseFeeParameters<chain extends Chain | undefined = Chain | undefined, chainOverride extends Chain | undefined = undefined> = GetChainParameter<chain, chainOverride> & {
    /** Gas price oracle address. */
    gasPriceOracleAddress?: Address | undefined;
};
export type GetL1BaseFeeReturnType = bigint;
export type GetL1BaseFeeErrorType = RequestErrorType | PrepareTransactionRequestErrorType | HexToNumberErrorType | ReadContractErrorType | ErrorType;
/**
 * get the L1 base fee
 *
 * @param client - Client to use
 * @param parameters - {@link GetL1BaseFeeParameters}
 * @returns The basefee (in wei). {@link GetL1BaseFeeReturnType}
 *
 * @example
 * import { createPublicClient, http, parseEther } from 'viem'
 * import { optimism } from 'viem/chains'
 * import { getL1BaseFee } from 'viem/chains/optimism'
 *
 * const client = createPublicClient({
 *   chain: optimism,
 *   transport: http(),
 * })
 * const l1BaseFee = await getL1BaseFee(client)
 */
export declare function getL1BaseFee<chain extends Chain | undefined, chainOverride extends Chain | undefined = undefined>(client: Client<Transport, chain>, args?: GetL1BaseFeeParameters<chain, chainOverride> | undefined): Promise<GetL1BaseFeeReturnType>;
//# sourceMappingURL=getL1BaseFee.d.ts.map