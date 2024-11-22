"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBytes = isBytes;
function isBytes(value) {
    if (!value)
        return false;
    if (typeof value !== 'object')
        return false;
    if (!('BYTES_PER_ELEMENT' in value))
        return false;
    return (value.BYTES_PER_ELEMENT === 1 && value.constructor.name === 'Uint8Array');
}
//# sourceMappingURL=isBytes.js.map