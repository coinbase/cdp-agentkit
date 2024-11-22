import type { Abi, Address, ExtractAbiEvent } from 'abitype';
import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import type { Chain } from '../../types/chain.js';
import type { Log } from '../../types/log.js';
import type { ErrorType } from '../../errors/utils.js';
import type { BlockNumber } from '../../types/block.js';
import type { ContractEventArgs, ContractEventName } from '../../types/contract.js';
import type { GetPollOptions } from '../../types/transport.js';
import { type ObserveErrorType } from '../../utils/observe.js';
import { type StringifyErrorType } from '../../utils/stringify.js';
export type WatchContractEventOnLogsParameter<abi extends Abi | readonly unknown[] = Abi, eventName extends ContractEventName<abi> = ContractEventName<abi>, strict extends boolean | undefined = undefined> = abi extends Abi ? Abi extends abi ? Log[] : Log<bigint, number, false, ExtractAbiEvent<abi, eventName>, strict>[] : Log[];
export type WatchContractEventOnLogsFn<abi extends Abi | readonly unknown[] = Abi, eventName extends ContractEventName<abi> = ContractEventName<abi>, strict extends boolean | undefined = undefined> = (logs: WatchContractEventOnLogsParameter<abi, eventName, strict>) => void;
export type WatchContractEventParameters<abi extends Abi | readonly unknown[] = Abi, eventName extends ContractEventName<abi> | undefined = ContractEventName<abi>, strict extends boolean | undefined = undefined, transport extends Transport = Transport> = {
    /** The address of the contract. */
    address?: Address | Address[] | undefined;
    /** Contract ABI. */
    abi: abi;
    args?: ContractEventArgs<abi, eventName extends ContractEventName<abi> ? eventName : ContractEventName<abi>> | undefined;
    /** Contract event. */
    eventName?: eventName | ContractEventName<abi> | undefined;
    /** Block to start listening from. */
    fromBlock?: BlockNumber<bigint> | undefined;
    /** The callback to call when an error occurred when trying to get for a new block. */
    onError?: ((error: Error) => void) | undefined;
    /** The callback to call when new event logs are received. */
    onLogs: WatchContractEventOnLogsFn<abi, eventName extends ContractEventName<abi> ? eventName : ContractEventName<abi>, strict>;
    /**
     * Whether or not the logs must match the indexed/non-indexed arguments on `event`.
     * @default false
     */
    strict?: strict | boolean | undefined;
} & GetPollOptions<transport>;
export type WatchContractEventReturnType = () => void;
export type WatchContractEventErrorType = StringifyErrorType | ObserveErrorType | ErrorType;
/**
 * Watches and returns emitted contract event logs.
 *
 * - Docs: https://viem.sh/docs/contract/watchContractEvent
 *
 * This Action will batch up all the event logs found within the [`pollingInterval`](https://viem.sh/docs/contract/watchContractEvent#pollinginterval-optional), and invoke them via [`onLogs`](https://viem.sh/docs/contract/watchContractEvent#onLogs).
 *
 * `watchContractEvent` will attempt to create an [Event Filter](https://viem.sh/docs/contract/createContractEventFilter) and listen to changes to the Filter per polling interval, however, if the RPC Provider does not support Filters (e.g. `eth_newFilter`), then `watchContractEvent` will fall back to using [`getLogs`](https://viem.sh/docs/actions/public/getLogs) instead.
 *
 * @param client - Client to use
 * @param parameters - {@link WatchContractEventParameters}
 * @returns A function that can be invoked to stop watching for new event logs. {@link WatchContractEventReturnType}
 *
 * @example
 * import { createPublicClient, http, parseAbi } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { watchContractEvent } from 'viem/contract'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const unwatch = watchContractEvent(client, {
 *   address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
 *   abi: parseAbi(['event Transfer(address indexed from, address indexed to, uint256 value)']),
 *   eventName: 'Transfer',
 *   args: { from: '0xc961145a54C96E3aE9bAA048c4F4D6b04C13916b' },
 *   onLogs: (logs) => console.log(logs),
 * })
 */
export declare function watchContractEvent<chain extends Chain | undefined, const abi extends Abi | readonly unknown[], eventName extends ContractEventName<abi> | undefined = undefined, strict extends boolean | undefined = undefined, transport extends Transport = Transport>(client: Client<transport, chain>, parameters: WatchContractEventParameters<abi, eventName, strict, transport>): WatchContractEventReturnType;
//# sourceMappingURL=watchContractEvent.d.ts.map