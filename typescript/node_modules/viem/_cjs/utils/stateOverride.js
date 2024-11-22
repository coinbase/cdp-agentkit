"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeStateMapping = serializeStateMapping;
exports.serializeAccountStateOverride = serializeAccountStateOverride;
exports.serializeStateOverride = serializeStateOverride;
const address_js_1 = require("../errors/address.js");
const data_js_1 = require("../errors/data.js");
const stateOverride_js_1 = require("../errors/stateOverride.js");
const isAddress_js_1 = require("./address/isAddress.js");
const toHex_js_1 = require("./encoding/toHex.js");
function serializeStateMapping(stateMapping) {
    if (!stateMapping || stateMapping.length === 0)
        return undefined;
    return stateMapping.reduce((acc, { slot, value }) => {
        if (slot.length !== 66)
            throw new data_js_1.InvalidBytesLengthError({
                size: slot.length,
                targetSize: 66,
                type: 'hex',
            });
        if (value.length !== 66)
            throw new data_js_1.InvalidBytesLengthError({
                size: value.length,
                targetSize: 66,
                type: 'hex',
            });
        acc[slot] = value;
        return acc;
    }, {});
}
function serializeAccountStateOverride(parameters) {
    const { balance, nonce, state, stateDiff, code } = parameters;
    const rpcAccountStateOverride = {};
    if (code !== undefined)
        rpcAccountStateOverride.code = code;
    if (balance !== undefined)
        rpcAccountStateOverride.balance = (0, toHex_js_1.numberToHex)(balance);
    if (nonce !== undefined)
        rpcAccountStateOverride.nonce = (0, toHex_js_1.numberToHex)(nonce);
    if (state !== undefined)
        rpcAccountStateOverride.state = serializeStateMapping(state);
    if (stateDiff !== undefined) {
        if (rpcAccountStateOverride.state)
            throw new stateOverride_js_1.StateAssignmentConflictError();
        rpcAccountStateOverride.stateDiff = serializeStateMapping(stateDiff);
    }
    return rpcAccountStateOverride;
}
function serializeStateOverride(parameters) {
    if (!parameters)
        return undefined;
    const rpcStateOverride = {};
    for (const { address, ...accountState } of parameters) {
        if (!(0, isAddress_js_1.isAddress)(address, { strict: false }))
            throw new address_js_1.InvalidAddressError({ address });
        if (rpcStateOverride[address])
            throw new stateOverride_js_1.AccountStateConflictError({ address: address });
        rpcStateOverride[address] = serializeAccountStateOverride(accountState);
    }
    return rpcStateOverride;
}
//# sourceMappingURL=stateOverride.js.map