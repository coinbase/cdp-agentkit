import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import type { ErrorType } from '../../errors/utils.js';
import type { BlockTag } from '../../types/block.js';
import type { Chain } from '../../types/chain.js';
import type { HasTransportType } from '../../types/transport.js';
import { type PollErrorType } from '../../utils/poll.js';
import { type StringifyErrorType } from '../../utils/stringify.js';
import { type GetBlockReturnType } from './getBlock.js';
export type OnBlockParameter<chain extends Chain | undefined = Chain, includeTransactions extends boolean = false, blockTag extends BlockTag = 'latest'> = GetBlockReturnType<chain, includeTransactions, blockTag>;
export type OnBlock<chain extends Chain | undefined = Chain, includeTransactions extends boolean = false, blockTag extends BlockTag = 'latest'> = (block: OnBlockParameter<chain, includeTransactions, blockTag>, prevBlock: OnBlockParameter<chain, includeTransactions, blockTag> | undefined) => void;
export type WatchBlocksParameters<transport extends Transport = Transport, chain extends Chain | undefined = Chain, includeTransactions extends boolean = false, blockTag extends BlockTag = 'latest'> = {
    /** The callback to call when a new block is received. */
    onBlock: OnBlock<chain, includeTransactions, blockTag>;
    /** The callback to call when an error occurred when trying to get for a new block. */
    onError?: ((error: Error) => void) | undefined;
} & ((HasTransportType<transport, 'webSocket'> extends true ? {
    blockTag?: undefined;
    emitMissed?: undefined;
    emitOnBegin?: undefined;
    includeTransactions?: undefined;
    /** Whether or not the WebSocket Transport should poll the JSON-RPC, rather than using `eth_subscribe`. */
    poll?: false | undefined;
    pollingInterval?: undefined;
} : never) | {
    /** The block tag. Defaults to "latest". */
    blockTag?: blockTag | BlockTag | undefined;
    /** Whether or not to emit the missed blocks to the callback. */
    emitMissed?: boolean | undefined;
    /** Whether or not to emit the block to the callback when the subscription opens. */
    emitOnBegin?: boolean | undefined;
    /** Whether or not to include transaction data in the response. */
    includeTransactions?: includeTransactions | undefined;
    poll?: true | undefined;
    /** Polling frequency (in ms). Defaults to the client's pollingInterval config. */
    pollingInterval?: number | undefined;
});
export type WatchBlocksReturnType = () => void;
export type WatchBlocksErrorType = StringifyErrorType | PollErrorType | ErrorType;
/**
 * Watches and returns information for incoming blocks.
 *
 * - Docs: https://viem.sh/docs/actions/public/watchBlocks
 * - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/blocks_watching-blocks
 * - JSON-RPC Methods:
 *   - When `poll: true`, calls [`eth_getBlockByNumber`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getBlockByNumber) on a polling interval.
 *   - When `poll: false` & WebSocket Transport, uses a WebSocket subscription via [`eth_subscribe`](https://docs.alchemy.com/reference/eth-subscribe-polygon) and the `"newHeads"` event.
 *
 * @param client - Client to use
 * @param parameters - {@link WatchBlocksParameters}
 * @returns A function that can be invoked to stop watching for new block numbers. {@link WatchBlocksReturnType}
 *
 * @example
 * import { createPublicClient, watchBlocks, http } from 'viem'
 * import { mainnet } from 'viem/chains'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const unwatch = watchBlocks(client, {
 *   onBlock: (block) => console.log(block),
 * })
 */
export declare function watchBlocks<transport extends Transport, chain extends Chain | undefined, includeTransactions extends boolean = false, blockTag extends BlockTag = 'latest'>(client: Client<transport, chain>, { blockTag, emitMissed, emitOnBegin, onBlock, onError, includeTransactions: includeTransactions_, poll: poll_, pollingInterval, }: WatchBlocksParameters<transport, chain, includeTransactions, blockTag>): WatchBlocksReturnType;
//# sourceMappingURL=watchBlocks.d.ts.map