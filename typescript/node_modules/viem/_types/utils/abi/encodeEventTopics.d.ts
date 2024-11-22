import type { Abi, ExtractAbiEvents } from 'abitype';
import { type AbiEventNotFoundErrorType } from '../../errors/abi.js';
import { type FilterTypeNotSupportedErrorType } from '../../errors/log.js';
import type { ErrorType } from '../../errors/utils.js';
import type { ContractEventArgs, ContractEventName } from '../../types/contract.js';
import type { Hex } from '../../types/misc.js';
import type { IsNarrowable, UnionEvaluate } from '../../types/utils.js';
import { type ToBytesErrorType } from '../encoding/toBytes.js';
import { type Keccak256ErrorType } from '../hash/keccak256.js';
import { type ToEventSelectorErrorType } from '../hash/toEventSelector.js';
import { type EncodeAbiParametersErrorType } from './encodeAbiParameters.js';
import { type FormatAbiItemErrorType } from './formatAbiItem.js';
import { type GetAbiItemErrorType } from './getAbiItem.js';
export type EncodeEventTopicsParameters<abi extends Abi | readonly unknown[] = Abi, eventName extends ContractEventName<abi> | undefined = ContractEventName<abi>, hasEvents = abi extends Abi ? Abi extends abi ? true : [ExtractAbiEvents<abi>] extends [never] ? false : true : true, allArgs = ContractEventArgs<abi, eventName extends ContractEventName<abi> ? eventName : ContractEventName<abi>>, allErrorNames = ContractEventName<abi>> = {
    abi: abi;
    args?: allArgs | undefined;
} & UnionEvaluate<IsNarrowable<abi, Abi> extends true ? abi['length'] extends 1 ? {
    eventName?: eventName | allErrorNames | undefined;
} : {
    eventName: eventName | allErrorNames;
} : {
    eventName?: eventName | allErrorNames | undefined;
}> & (hasEvents extends true ? unknown : never);
export type EncodeEventTopicsReturnType = [Hex, ...(Hex | Hex[] | null)[]];
export type EncodeEventTopicsErrorType = AbiEventNotFoundErrorType | EncodeArgErrorType | FormatAbiItemErrorType | GetAbiItemErrorType | ToEventSelectorErrorType | ErrorType;
export declare function encodeEventTopics<const abi extends Abi | readonly unknown[], eventName extends ContractEventName<abi> | undefined = undefined>(parameters: EncodeEventTopicsParameters<abi, eventName>): EncodeEventTopicsReturnType;
export type EncodeArgErrorType = Keccak256ErrorType | ToBytesErrorType | EncodeAbiParametersErrorType | FilterTypeNotSupportedErrorType | ErrorType;
//# sourceMappingURL=encodeEventTopics.d.ts.map