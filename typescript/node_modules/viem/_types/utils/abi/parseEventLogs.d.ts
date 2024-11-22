import type { Abi } from 'abitype';
import type { ErrorType } from '../../errors/utils.js';
import type { ContractEventName, GetEventArgs } from '../../types/contract.js';
import type { Log } from '../../types/log.js';
import type { RpcLog } from '../../types/rpc.js';
import { type DecodeEventLogErrorType } from './decodeEventLog.js';
export type ParseEventLogsParameters<abi extends Abi | readonly unknown[] = Abi, eventName extends ContractEventName<abi> | ContractEventName<abi>[] | undefined = ContractEventName<abi>, strict extends boolean | undefined = boolean | undefined, allArgs = GetEventArgs<abi, eventName extends ContractEventName<abi> ? eventName : ContractEventName<abi>, {
    EnableUnion: true;
    IndexedOnly: false;
    Required: false;
}>> = {
    /** Contract ABI. */
    abi: abi;
    /** Arguments for the event. */
    args?: allArgs | undefined;
    /** Contract event. */
    eventName?: eventName | ContractEventName<abi> | ContractEventName<abi>[] | undefined;
    /** List of logs. */
    logs: (Log | RpcLog)[];
    strict?: strict | boolean | undefined;
};
export type ParseEventLogsReturnType<abi extends Abi | readonly unknown[] = Abi, eventName extends ContractEventName<abi> | ContractEventName<abi>[] | undefined = ContractEventName<abi>, strict extends boolean | undefined = boolean | undefined, derivedEventName extends ContractEventName<abi> | undefined = eventName extends ContractEventName<abi>[] ? eventName[number] : eventName> = Log<bigint, number, false, undefined, strict, abi, derivedEventName>[];
export type ParseEventLogsErrorType = DecodeEventLogErrorType | ErrorType;
/**
 * Extracts & decodes logs matching the provided signature(s) (`abi` + optional `eventName`)
 * from a set of opaque logs.
 *
 * @param parameters - {@link ParseEventLogsParameters}
 * @returns The logs. {@link ParseEventLogsReturnType}
 *
 * @example
 * import { createClient, http } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { parseEventLogs } from 'viem/op-stack'
 *
 * const client = createClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 *
 * const receipt = await getTransactionReceipt(client, {
 *   hash: '0xec23b2ba4bc59ba61554507c1b1bc91649e6586eb2dd00c728e8ed0db8bb37ea',
 * })
 *
 * const logs = parseEventLogs({ logs: receipt.logs })
 * // [{ args: { ... }, eventName: 'TransactionDeposited', ... }, ...]
 */
export declare function parseEventLogs<abi extends Abi | readonly unknown[], strict extends boolean | undefined = true, eventName extends ContractEventName<abi> | ContractEventName<abi>[] | undefined = undefined>(parameters: ParseEventLogsParameters<abi, eventName, strict>): ParseEventLogsReturnType<abi, eventName, strict>;
//# sourceMappingURL=parseEventLogs.d.ts.map