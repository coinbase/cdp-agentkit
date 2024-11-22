import type { Account } from '../../accounts/types.js';
import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import { type BlockNotFoundErrorType } from '../../errors/block.js';
import type { ErrorType } from '../../errors/utils.js';
import type { BlockTag } from '../../types/block.js';
import type { Chain } from '../../types/chain.js';
import type { Hash } from '../../types/misc.js';
import type { Prettify } from '../../types/utils.js';
import type { RequestErrorType } from '../../utils/buildRequest.js';
import { type NumberToHexErrorType } from '../../utils/encoding/toHex.js';
import { type FormattedBlock } from '../../utils/formatters/block.js';
export type GetBlockParameters<includeTransactions extends boolean = false, blockTag extends BlockTag = 'latest'> = {
    /** Whether or not to include transaction data in the response. */
    includeTransactions?: includeTransactions | undefined;
} & ({
    /** Hash of the block. */
    blockHash?: Hash | undefined;
    blockNumber?: undefined;
    blockTag?: undefined;
} | {
    blockHash?: undefined;
    /** The block number. */
    blockNumber?: bigint | undefined;
    blockTag?: undefined;
} | {
    blockHash?: undefined;
    blockNumber?: undefined;
    /**
     * The block tag.
     * @default 'latest'
     */
    blockTag?: blockTag | BlockTag | undefined;
});
export type GetBlockReturnType<chain extends Chain | undefined = undefined, includeTransactions extends boolean = false, blockTag extends BlockTag = 'latest'> = Prettify<FormattedBlock<chain, includeTransactions, blockTag>>;
export type GetBlockErrorType = BlockNotFoundErrorType | NumberToHexErrorType | RequestErrorType | ErrorType;
/**
 * Returns information about a block at a block number, hash, or tag.
 *
 * - Docs: https://viem.sh/docs/actions/public/getBlock
 * - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/blocks_fetching-blocks
 * - JSON-RPC Methods:
 *   - Calls [`eth_getBlockByNumber`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblockbynumber) for `blockNumber` & `blockTag`.
 *   - Calls [`eth_getBlockByHash`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblockbyhash) for `blockHash`.
 *
 * @param client - Client to use
 * @param parameters - {@link GetBlockParameters}
 * @returns Information about the block. {@link GetBlockReturnType}
 *
 * @example
 * import { createPublicClient, http } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { getBlock } from 'viem/public'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const block = await getBlock(client)
 */
export declare function getBlock<chain extends Chain | undefined, account extends Account | undefined, includeTransactions extends boolean = false, blockTag extends BlockTag = 'latest'>(client: Client<Transport, chain, account>, { blockHash, blockNumber, blockTag: blockTag_, includeTransactions: includeTransactions_, }?: GetBlockParameters<includeTransactions, blockTag>): Promise<GetBlockReturnType<chain, includeTransactions, blockTag>>;
//# sourceMappingURL=getBlock.d.ts.map