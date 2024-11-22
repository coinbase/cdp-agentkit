import type { Abi } from 'abitype';
import { type AbiDecodingDataSizeTooSmallErrorType, type AbiEventSignatureEmptyTopicsErrorType, type AbiEventSignatureNotFoundErrorType, type DecodeLogDataMismatchErrorType, type DecodeLogTopicsMismatchErrorType } from '../../errors/abi.js';
import type { ErrorType } from '../../errors/utils.js';
import type { ContractEventArgsFromTopics, ContractEventName } from '../../types/contract.js';
import type { Hex } from '../../types/misc.js';
import type { IsNarrowable, Prettify, UnionEvaluate } from '../../types/utils.js';
import { type ToEventSelectorErrorType } from '../hash/toEventSelector.js';
import { type DecodeAbiParametersErrorType } from './decodeAbiParameters.js';
import { type FormatAbiItemErrorType } from './formatAbiItem.js';
export type DecodeEventLogParameters<abi extends Abi | readonly unknown[] = Abi, eventName extends ContractEventName<abi> | undefined = ContractEventName<abi>, topics extends Hex[] = Hex[], data extends Hex | undefined = undefined, strict extends boolean = true> = {
    abi: abi;
    data?: data | undefined;
    eventName?: eventName | ContractEventName<abi> | undefined;
    strict?: strict | boolean | undefined;
    topics: [signature: Hex, ...args: topics] | [];
};
export type DecodeEventLogReturnType<abi extends Abi | readonly unknown[] = Abi, eventName extends ContractEventName<abi> | undefined = ContractEventName<abi>, topics extends Hex[] = Hex[], data extends Hex | undefined = undefined, strict extends boolean = true, allEventNames extends ContractEventName<abi> = eventName extends ContractEventName<abi> ? eventName : ContractEventName<abi>> = IsNarrowable<abi, Abi> extends true ? {
    [name in allEventNames]: Prettify<{
        eventName: name;
    } & UnionEvaluate<ContractEventArgsFromTopics<abi, name, strict> extends infer allArgs ? topics extends readonly [] ? data extends undefined ? {
        args?: undefined;
    } : {
        args?: allArgs | undefined;
    } : {
        args: allArgs;
    } : never>>;
}[allEventNames] : {
    eventName: eventName;
    args: readonly unknown[] | undefined;
};
export type DecodeEventLogErrorType = AbiDecodingDataSizeTooSmallErrorType | AbiEventSignatureEmptyTopicsErrorType | AbiEventSignatureNotFoundErrorType | DecodeAbiParametersErrorType | DecodeLogTopicsMismatchErrorType | DecodeLogDataMismatchErrorType | FormatAbiItemErrorType | ToEventSelectorErrorType | ErrorType;
export declare function decodeEventLog<const abi extends Abi | readonly unknown[], eventName extends ContractEventName<abi> | undefined = undefined, topics extends Hex[] = Hex[], data extends Hex | undefined = undefined, strict extends boolean = true>(parameters: DecodeEventLogParameters<abi, eventName, topics, data, strict>): DecodeEventLogReturnType<abi, eventName, topics, data, strict>;
//# sourceMappingURL=decodeEventLog.d.ts.map