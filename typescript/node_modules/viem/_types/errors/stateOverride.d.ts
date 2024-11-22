import type { StateMapping, StateOverride } from '../types/stateOverride.js';
import { BaseError } from './base.js';
export type AccountStateConflictErrorType = AccountStateConflictError & {
    name: 'AccountStateConflictError';
};
export declare class AccountStateConflictError extends BaseError {
    constructor({ address }: {
        address: string;
    });
}
export type StateAssignmentConflictErrorType = StateAssignmentConflictError & {
    name: 'StateAssignmentConflictError';
};
export declare class StateAssignmentConflictError extends BaseError {
    constructor();
}
/** @internal */
export declare function prettyStateMapping(stateMapping: StateMapping): string;
export declare function prettyStateOverride(stateOverride: StateOverride): string;
//# sourceMappingURL=stateOverride.d.ts.map