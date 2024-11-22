import { BaseError } from './base.js';
export class AccountStateConflictError extends BaseError {
    constructor({ address }) {
        super(`State for account "${address}" is set multiple times.`, {
            name: 'AccountStateConflictError',
        });
    }
}
export class StateAssignmentConflictError extends BaseError {
    constructor() {
        super('state and stateDiff are set on the same account.', {
            name: 'StateAssignmentConflictError',
        });
    }
}
/** @internal */
export function prettyStateMapping(stateMapping) {
    return stateMapping.reduce((pretty, { slot, value }) => {
        return `${pretty}        ${slot}: ${value}\n`;
    }, '');
}
export function prettyStateOverride(stateOverride) {
    return stateOverride
        .reduce((pretty, { address, ...state }) => {
        let val = `${pretty}    ${address}:\n`;
        if (state.nonce)
            val += `      nonce: ${state.nonce}\n`;
        if (state.balance)
            val += `      balance: ${state.balance}\n`;
        if (state.code)
            val += `      code: ${state.code}\n`;
        if (state.state) {
            val += '      state:\n';
            val += prettyStateMapping(state.state);
        }
        if (state.stateDiff) {
            val += '      stateDiff:\n';
            val += prettyStateMapping(state.stateDiff);
        }
        return val;
    }, '  State Override:\n')
        .slice(0, -1);
}
//# sourceMappingURL=stateOverride.js.map