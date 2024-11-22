import { InvalidAddressError, } from '../errors/address.js';
import { InvalidBytesLengthError, } from '../errors/data.js';
import { AccountStateConflictError, StateAssignmentConflictError, } from '../errors/stateOverride.js';
import { isAddress } from './address/isAddress.js';
import { numberToHex } from './encoding/toHex.js';
/** @internal */
export function serializeStateMapping(stateMapping) {
    if (!stateMapping || stateMapping.length === 0)
        return undefined;
    return stateMapping.reduce((acc, { slot, value }) => {
        if (slot.length !== 66)
            throw new InvalidBytesLengthError({
                size: slot.length,
                targetSize: 66,
                type: 'hex',
            });
        if (value.length !== 66)
            throw new InvalidBytesLengthError({
                size: value.length,
                targetSize: 66,
                type: 'hex',
            });
        acc[slot] = value;
        return acc;
    }, {});
}
/** @internal */
export function serializeAccountStateOverride(parameters) {
    const { balance, nonce, state, stateDiff, code } = parameters;
    const rpcAccountStateOverride = {};
    if (code !== undefined)
        rpcAccountStateOverride.code = code;
    if (balance !== undefined)
        rpcAccountStateOverride.balance = numberToHex(balance);
    if (nonce !== undefined)
        rpcAccountStateOverride.nonce = numberToHex(nonce);
    if (state !== undefined)
        rpcAccountStateOverride.state = serializeStateMapping(state);
    if (stateDiff !== undefined) {
        if (rpcAccountStateOverride.state)
            throw new StateAssignmentConflictError();
        rpcAccountStateOverride.stateDiff = serializeStateMapping(stateDiff);
    }
    return rpcAccountStateOverride;
}
/** @internal */
export function serializeStateOverride(parameters) {
    if (!parameters)
        return undefined;
    const rpcStateOverride = {};
    for (const { address, ...accountState } of parameters) {
        if (!isAddress(address, { strict: false }))
            throw new InvalidAddressError({ address });
        if (rpcStateOverride[address])
            throw new AccountStateConflictError({ address: address });
        rpcStateOverride[address] = serializeAccountStateOverride(accountState);
    }
    return rpcStateOverride;
}
//# sourceMappingURL=stateOverride.js.map