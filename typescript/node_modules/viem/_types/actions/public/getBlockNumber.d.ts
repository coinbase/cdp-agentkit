import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import type { ErrorType } from '../../errors/utils.js';
import type { Chain } from '../../types/chain.js';
import type { RequestErrorType } from '../../utils/buildRequest.js';
import { type GetCacheErrorType } from '../../utils/promise/withCache.js';
export type GetBlockNumberParameters = {
    /** Time (in ms) that cached block number will remain in memory. */
    cacheTime?: number | undefined;
};
export type GetBlockNumberReturnType = bigint;
export type GetBlockNumberErrorType = RequestErrorType | ErrorType;
/** @internal */
export type GetBlockNumberCacheErrorType = GetCacheErrorType | ErrorType;
/** @internal */
export declare function getBlockNumberCache(id: string): {
    clear: () => void;
    promise: {
        clear: () => boolean;
        get: () => Promise<unknown> | undefined;
        set: (data: Promise<unknown>) => Map<string, Promise<unknown>>;
    };
    response: {
        clear: () => boolean;
        get: () => {
            created: Date;
            data: unknown;
        } | undefined;
        set: (data: {
            created: Date;
            data: unknown;
        }) => Map<string, {
            created: Date;
            data: unknown;
        }>;
    };
};
/**
 * Returns the number of the most recent block seen.
 *
 * - Docs: https://viem.sh/docs/actions/public/getBlockNumber
 * - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/blocks_fetching-blocks
 * - JSON-RPC Methods: [`eth_blockNumber`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_blocknumber)
 *
 * @param client - Client to use
 * @param parameters - {@link GetBlockNumberParameters}
 * @returns The number of the block. {@link GetBlockNumberReturnType}
 *
 * @example
 * import { createPublicClient, http } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { getBlockNumber } from 'viem/public'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const blockNumber = await getBlockNumber(client)
 * // 69420n
 */
export declare function getBlockNumber<chain extends Chain | undefined>(client: Client<Transport, chain>, { cacheTime }?: GetBlockNumberParameters): Promise<GetBlockNumberReturnType>;
//# sourceMappingURL=getBlockNumber.d.ts.map