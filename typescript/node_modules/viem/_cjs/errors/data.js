"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidBytesLengthError = exports.SizeExceedsPaddingSizeError = exports.SliceOffsetOutOfBoundsError = void 0;
const base_js_1 = require("./base.js");
class SliceOffsetOutOfBoundsError extends base_js_1.BaseError {
    constructor({ offset, position, size, }) {
        super(`Slice ${position === 'start' ? 'starting' : 'ending'} at offset "${offset}" is out-of-bounds (size: ${size}).`, { name: 'SliceOffsetOutOfBoundsError' });
    }
}
exports.SliceOffsetOutOfBoundsError = SliceOffsetOutOfBoundsError;
class SizeExceedsPaddingSizeError extends base_js_1.BaseError {
    constructor({ size, targetSize, type, }) {
        super(`${type.charAt(0).toUpperCase()}${type
            .slice(1)
            .toLowerCase()} size (${size}) exceeds padding size (${targetSize}).`, { name: 'SizeExceedsPaddingSizeError' });
    }
}
exports.SizeExceedsPaddingSizeError = SizeExceedsPaddingSizeError;
class InvalidBytesLengthError extends base_js_1.BaseError {
    constructor({ size, targetSize, type, }) {
        super(`${type.charAt(0).toUpperCase()}${type
            .slice(1)
            .toLowerCase()} is expected to be ${targetSize} ${type} long, but is ${size} ${type} long.`, { name: 'InvalidBytesLengthError' });
    }
}
exports.InvalidBytesLengthError = InvalidBytesLengthError;
//# sourceMappingURL=data.js.map