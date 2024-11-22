"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SizeOverflowError = exports.InvalidHexValueError = exports.InvalidHexBooleanError = exports.InvalidBytesBooleanError = exports.IntegerOutOfRangeError = void 0;
const base_js_1 = require("./base.js");
class IntegerOutOfRangeError extends base_js_1.BaseError {
    constructor({ max, min, signed, size, value, }) {
        super(`Number "${value}" is not in safe ${size ? `${size * 8}-bit ${signed ? 'signed' : 'unsigned'} ` : ''}integer range ${max ? `(${min} to ${max})` : `(above ${min})`}`, { name: 'IntegerOutOfRangeError' });
    }
}
exports.IntegerOutOfRangeError = IntegerOutOfRangeError;
class InvalidBytesBooleanError extends base_js_1.BaseError {
    constructor(bytes) {
        super(`Bytes value "${bytes}" is not a valid boolean. The bytes array must contain a single byte of either a 0 or 1 value.`, {
            name: 'InvalidBytesBooleanError',
        });
    }
}
exports.InvalidBytesBooleanError = InvalidBytesBooleanError;
class InvalidHexBooleanError extends base_js_1.BaseError {
    constructor(hex) {
        super(`Hex value "${hex}" is not a valid boolean. The hex value must be "0x0" (false) or "0x1" (true).`, { name: 'InvalidHexBooleanError' });
    }
}
exports.InvalidHexBooleanError = InvalidHexBooleanError;
class InvalidHexValueError extends base_js_1.BaseError {
    constructor(value) {
        super(`Hex value "${value}" is an odd length (${value.length}). It must be an even length.`, { name: 'InvalidHexValueError' });
    }
}
exports.InvalidHexValueError = InvalidHexValueError;
class SizeOverflowError extends base_js_1.BaseError {
    constructor({ givenSize, maxSize }) {
        super(`Size cannot exceed ${maxSize} bytes. Given size: ${givenSize} bytes.`, { name: 'SizeOverflowError' });
    }
}
exports.SizeOverflowError = SizeOverflowError;
//# sourceMappingURL=encoding.js.map