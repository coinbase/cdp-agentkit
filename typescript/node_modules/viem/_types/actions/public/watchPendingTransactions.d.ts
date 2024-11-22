import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import type { ErrorType } from '../../errors/utils.js';
import type { Chain } from '../../types/chain.js';
import type { Hash } from '../../types/misc.js';
import type { GetPollOptions } from '../../types/transport.js';
import { type ObserveErrorType } from '../../utils/observe.js';
import { type StringifyErrorType } from '../../utils/stringify.js';
export type OnTransactionsParameter = Hash[];
export type OnTransactionsFn = (transactions: OnTransactionsParameter) => void;
export type WatchPendingTransactionsParameters<transport extends Transport = Transport> = {
    /** The callback to call when an error occurred when trying to get for a new block. */
    onError?: ((error: Error) => void) | undefined;
    /** The callback to call when new transactions are received. */
    onTransactions: OnTransactionsFn;
} & GetPollOptions<transport>;
export type WatchPendingTransactionsReturnType = () => void;
export type WatchPendingTransactionsErrorType = StringifyErrorType | ObserveErrorType | ErrorType;
/**
 * Watches and returns pending transaction hashes.
 *
 * - Docs: https://viem.sh/docs/actions/public/watchPendingTransactions
 * - JSON-RPC Methods:
 *   - When `poll: true`
 *     - Calls [`eth_newPendingTransactionFilter`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_newpendingtransactionfilter) to initialize the filter.
 *     - Calls [`eth_getFilterChanges`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getFilterChanges) on a polling interval.
 *   - When `poll: false` & WebSocket Transport, uses a WebSocket subscription via [`eth_subscribe`](https://docs.alchemy.com/reference/eth-subscribe-polygon) and the `"newPendingTransactions"` event.
 *
 * This Action will batch up all the pending transactions found within the [`pollingInterval`](https://viem.sh/docs/actions/public/watchPendingTransactions#pollinginterval-optional), and invoke them via [`onTransactions`](https://viem.sh/docs/actions/public/watchPendingTransactions#ontransactions).
 *
 * @param client - Client to use
 * @param parameters - {@link WatchPendingTransactionsParameters}
 * @returns A function that can be invoked to stop watching for new pending transaction hashes. {@link WatchPendingTransactionsReturnType}
 *
 * @example
 * import { createPublicClient, http } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { watchPendingTransactions } from 'viem/public'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const unwatch = await watchPendingTransactions(client, {
 *   onTransactions: (hashes) => console.log(hashes),
 * })
 */
export declare function watchPendingTransactions<transport extends Transport, chain extends Chain | undefined>(client: Client<transport, chain>, { batch, onError, onTransactions, poll: poll_, pollingInterval, }: WatchPendingTransactionsParameters<transport>): () => void;
//# sourceMappingURL=watchPendingTransactions.d.ts.map