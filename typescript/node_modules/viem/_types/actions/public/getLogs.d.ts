import type { AbiEvent, Address } from 'abitype';
import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import type { ErrorType } from '../../errors/utils.js';
import type { BlockNumber, BlockTag } from '../../types/block.js';
import type { Chain } from '../../types/chain.js';
import type { MaybeAbiEventName, MaybeExtractEventArgsFromAbi } from '../../types/contract.js';
import type { Log } from '../../types/log.js';
import type { Hash } from '../../types/misc.js';
import type { DecodeEventLogErrorType } from '../../utils/abi/decodeEventLog.js';
import { type EncodeEventTopicsErrorType } from '../../utils/abi/encodeEventTopics.js';
import type { RequestErrorType } from '../../utils/buildRequest.js';
import { type NumberToHexErrorType } from '../../utils/encoding/toHex.js';
import { type FormatLogErrorType } from '../../utils/formatters/log.js';
export type GetLogsParameters<abiEvent extends AbiEvent | undefined = undefined, abiEvents extends readonly AbiEvent[] | readonly unknown[] | undefined = abiEvent extends AbiEvent ? [abiEvent] : undefined, strict extends boolean | undefined = undefined, fromBlock extends BlockNumber | BlockTag | undefined = undefined, toBlock extends BlockNumber | BlockTag | undefined = undefined, _eventName extends string | undefined = MaybeAbiEventName<abiEvent>> = {
    /** Address or list of addresses from which logs originated */
    address?: Address | Address[] | undefined;
} & ({
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
    events: abiEvents;
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
}) & ({
    /** Block number or tag after which to include logs */
    fromBlock?: fromBlock | BlockNumber | BlockTag | undefined;
    /** Block number or tag before which to include logs */
    toBlock?: toBlock | BlockNumber | BlockTag | undefined;
    blockHash?: undefined;
} | {
    fromBlock?: undefined;
    toBlock?: undefined;
    /** Hash of block to include logs from */
    blockHash?: Hash | undefined;
});
export type GetLogsReturnType<abiEvent extends AbiEvent | undefined = undefined, abiEvents extends readonly AbiEvent[] | readonly unknown[] | undefined = abiEvent extends AbiEvent ? [abiEvent] : undefined, strict extends boolean | undefined = undefined, fromBlock extends BlockNumber | BlockTag | undefined = undefined, toBlock extends BlockNumber | BlockTag | undefined = undefined, _eventName extends string | undefined = MaybeAbiEventName<abiEvent>, _pending extends boolean = (fromBlock extends 'pending' ? true : false) | (toBlock extends 'pending' ? true : false)> = Log<bigint, number, _pending, abiEvent, strict, abiEvents, _eventName>[];
export type GetLogsErrorType = DecodeEventLogErrorType | EncodeEventTopicsErrorType | FormatLogErrorType | NumberToHexErrorType | RequestErrorType | ErrorType;
/**
 * Returns a list of event logs matching the provided parameters.
 *
 * - Docs: https://viem.sh/docs/actions/public/getLogs
 * - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/logs_event-logs
 * - JSON-RPC Methods: [`eth_getLogs`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getlogs)
 *
 * @param client - Client to use
 * @param parameters - {@link GetLogsParameters}
 * @returns A list of event logs. {@link GetLogsReturnType}
 *
 * @example
 * import { createPublicClient, http, parseAbiItem } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { getLogs } from 'viem/public'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const logs = await getLogs(client)
 */
export declare function getLogs<chain extends Chain | undefined, const abiEvent extends AbiEvent | undefined = undefined, const abiEvents extends readonly AbiEvent[] | readonly unknown[] | undefined = abiEvent extends AbiEvent ? [abiEvent] : undefined, strict extends boolean | undefined = undefined, fromBlock extends BlockNumber | BlockTag | undefined = undefined, toBlock extends BlockNumber | BlockTag | undefined = undefined>(client: Client<Transport, chain>, { address, blockHash, fromBlock, toBlock, event, events: events_, args, strict: strict_, }?: GetLogsParameters<abiEvent, abiEvents, strict, fromBlock, toBlock>): Promise<GetLogsReturnType<abiEvent, abiEvents, strict, fromBlock, toBlock>>;
//# sourceMappingURL=getLogs.d.ts.map