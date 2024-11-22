import type { AbiEvent, Address } from 'abitype';
import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import type { Chain } from '../../types/chain.js';
import type { MaybeAbiEventName, MaybeExtractEventArgsFromAbi } from '../../types/contract.js';
import type { Log } from '../../types/log.js';
import type { GetPollOptions } from '../../types/transport.js';
import { type ObserveErrorType } from '../../utils/observe.js';
import { type StringifyErrorType } from '../../utils/stringify.js';
import type { ErrorType } from '../../errors/utils.js';
import type { BlockNumber } from '../../types/block.js';
export type WatchEventOnLogsParameter<abiEvent extends AbiEvent | undefined = undefined, abiEvents extends readonly AbiEvent[] | readonly unknown[] | undefined = abiEvent extends AbiEvent ? [abiEvent] : undefined, strict extends boolean | undefined = undefined, eventName extends string | undefined = MaybeAbiEventName<abiEvent>> = Log<bigint, number, false, abiEvent, strict, abiEvents, eventName>[];
export type WatchEventOnLogsFn<abiEvent extends AbiEvent | undefined = undefined, abiEvents extends readonly AbiEvent[] | readonly unknown[] | undefined = abiEvent extends AbiEvent ? [abiEvent] : undefined, strict extends boolean | undefined = undefined, _eventName extends string | undefined = MaybeAbiEventName<abiEvent>> = (logs: WatchEventOnLogsParameter<abiEvent, abiEvents, strict, _eventName>) => void;
export type WatchEventParameters<abiEvent extends AbiEvent | undefined = undefined, abiEvents extends readonly AbiEvent[] | readonly unknown[] | undefined = abiEvent extends AbiEvent ? [abiEvent] : undefined, strict extends boolean | undefined = undefined, transport extends Transport = Transport, _eventName extends string | undefined = MaybeAbiEventName<abiEvent>> = {
    /** The address of the contract. */
    address?: Address | Address[] | undefined;
    /** Block to start listening from. */
    fromBlock?: BlockNumber<bigint> | undefined;
    /** The callback to call when an error occurred when trying to get for a new block. */
    onError?: ((error: Error) => void) | undefined;
    /** The callback to call when new event logs are received. */
    onLogs: WatchEventOnLogsFn<abiEvent, abiEvents, strict, _eventName>;
} & GetPollOptions<transport> & ({
    event: abiEvent;
    events?: undefined;
    args?: MaybeExtractEventArgsFromAbi<abiEvents, _eventName> | undefined;
    /**
     * Whether or not the logs must match the indexed/non-indexed arguments on `event`.
     * @default false
     */
    strict?: strict | undefined;
} | {
    event?: undefined;
    events?: abiEvents | undefined;
    args?: undefined;
    /**
     * Whether or not the logs must match the indexed/non-indexed arguments on `event`.
     * @default false
     */
    strict?: strict | undefined;
} | {
    event?: undefined;
    events?: undefined;
    args?: undefined;
    strict?: undefined;
});
export type WatchEventReturnType = () => void;
export type WatchEventErrorType = StringifyErrorType | ObserveErrorType | ErrorType;
/**
 * Watches and returns emitted [Event Logs](https://viem.sh/docs/glossary/terms#event-log).
 *
 * - Docs: https://viem.sh/docs/actions/public/watchEvent
 * - JSON-RPC Methods:
 *   - **RPC Provider supports `eth_newFilter`:**
 *     - Calls [`eth_newFilter`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_newfilter) to create a filter (called on initialize).
 *     - On a polling interval, it will call [`eth_getFilterChanges`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getfilterchanges).
 *   - **RPC Provider does not support `eth_newFilter`:**
 *     - Calls [`eth_getLogs`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getlogs) for each block between the polling interval.
 *
 * This Action will batch up all the Event Logs found within the [`pollingInterval`](https://viem.sh/docs/actions/public/watchEvent#pollinginterval-optional), and invoke them via [`onLogs`](https://viem.sh/docs/actions/public/watchEvent#onLogs).
 *
 * `watchEvent` will attempt to create an [Event Filter](https://viem.sh/docs/actions/public/createEventFilter) and listen to changes to the Filter per polling interval, however, if the RPC Provider does not support Filters (e.g. `eth_newFilter`), then `watchEvent` will fall back to using [`getLogs`](https://viem.sh/docs/actions/public/getLogs) instead.
 *
 * @param client - Client to use
 * @param parameters - {@link WatchEventParameters}
 * @returns A function that can be invoked to stop watching for new Event Logs. {@link WatchEventReturnType}
 *
 * @example
 * import { createPublicClient, http } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { watchEvent } from 'viem/public'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const unwatch = watchEvent(client, {
 *   onLogs: (logs) => console.log(logs),
 * })
 */
export declare function watchEvent<chain extends Chain | undefined, const abiEvent extends AbiEvent | undefined = undefined, const abiEvents extends readonly AbiEvent[] | readonly unknown[] | undefined = abiEvent extends AbiEvent ? [abiEvent] : undefined, strict extends boolean | undefined = undefined, transport extends Transport = Transport, _eventName extends string | undefined = undefined>(client: Client<transport, chain>, { address, args, batch, event, events, fromBlock, onError, onLogs, poll: poll_, pollingInterval, strict: strict_, }: WatchEventParameters<abiEvent, abiEvents, strict, transport>): WatchEventReturnType;
//# sourceMappingURL=watchEvent.d.ts.map