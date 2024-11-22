import { type InvalidAddressErrorType } from '../errors/address.js';
import { type InvalidBytesLengthErrorType } from '../errors/data.js';
import { type AccountStateConflictErrorType, type StateAssignmentConflictErrorType } from '../errors/stateOverride.js';
import type { RpcAccountStateOverride, RpcStateMapping, RpcStateOverride } from '../types/rpc.js';
import type { StateMapping, StateOverride } from '../types/stateOverride.js';
import { type NumberToHexErrorType } from './encoding/toHex.js';
type SerializeStateMappingParameters = StateMapping | undefined;
type SerializeStateMappingErrorType = InvalidBytesLengthErrorType;
/** @internal */
export declare function serializeStateMapping(stateMapping: SerializeStateMappingParameters): RpcStateMapping | undefined;
type SerializeAccountStateOverrideParameters = Omit<StateOverride[number], 'address'>;
type SerializeAccountStateOverrideErrorType = NumberToHexErrorType | StateAssignmentConflictErrorType | SerializeStateMappingErrorType;
/** @internal */
export declare function serializeAccountStateOverride(parameters: SerializeAccountStateOverrideParameters): RpcAccountStateOverride;
type SerializeStateOverrideParameters = StateOverride | undefined;
export type SerializeStateOverrideErrorType = InvalidAddressErrorType | AccountStateConflictErrorType | SerializeAccountStateOverrideErrorType;
/** @internal */
export declare function serializeStateOverride(parameters?: SerializeStateOverrideParameters): RpcStateOverride | undefined;
export {};
//# sourceMappingURL=stateOverride.d.ts.map