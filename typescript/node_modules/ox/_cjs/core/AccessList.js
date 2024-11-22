"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidStorageKeySizeError = void 0;
exports.fromTupleList = fromTupleList;
exports.toTupleList = toTupleList;
const Address = require("./Address.js");
const Errors = require("./Errors.js");
const Hash = require("./Hash.js");
const Hex = require("./Hex.js");
function fromTupleList(accessList) {
    const list = [];
    for (let i = 0; i < accessList.length; i++) {
        const [address, storageKeys] = accessList[i];
        if (address)
            Address.assert(address, { strict: false });
        list.push({
            address: address,
            storageKeys: storageKeys.map((key) => Hash.validate(key) ? key : Hex.trimLeft(key)),
        });
    }
    return list;
}
function toTupleList(accessList) {
    if (!accessList || accessList.length === 0)
        return [];
    const tuple = [];
    for (const { address, storageKeys } of accessList) {
        for (let j = 0; j < storageKeys.length; j++)
            if (Hex.size(storageKeys[j]) !== 32)
                throw new InvalidStorageKeySizeError({
                    storageKey: storageKeys[j],
                });
        if (address)
            Address.assert(address, { strict: false });
        tuple.push([address, storageKeys]);
    }
    return tuple;
}
class InvalidStorageKeySizeError extends Errors.BaseError {
    constructor({ storageKey }) {
        super(`Size for storage key "${storageKey}" is invalid. Expected 32 bytes. Got ${Hex.size(storageKey)} bytes.`);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'AccessList.InvalidStorageKeySizeError'
        });
    }
}
exports.InvalidStorageKeySizeError = InvalidStorageKeySizeError;
//# sourceMappingURL=AccessList.js.map