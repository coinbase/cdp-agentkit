"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateAssignmentConflictError = exports.AccountStateConflictError = void 0;
exports.prettyStateMapping = prettyStateMapping;
exports.prettyStateOverride = prettyStateOverride;
const base_js_1 = require("./base.js");
class AccountStateConflictError extends base_js_1.BaseError {
    constructor({ address }) {
        super(`State for account "${address}" is set multiple times.`, {
            name: 'AccountStateConflictError',
        });
    }
}
exports.AccountStateConflictError = AccountStateConflictError;
class StateAssignmentConflictError extends base_js_1.BaseError {
    constructor() {
        super('state and stateDiff are set on the same account.', {
            name: 'StateAssignmentConflictError',
        });
    }
}
exports.StateAssignmentConflictError = StateAssignmentConflictError;
function prettyStateMapping(stateMapping) {
    return stateMapping.reduce((pretty, { slot, value }) => {
        return `${pretty}        ${slot}: ${value}\n`;
    }, '');
}
function prettyStateOverride(stateOverride) {
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