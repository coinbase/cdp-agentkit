"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BytecodeLengthMustBeDivisibleBy32Error = exports.BytecodeLengthInWordsMustBeOddError = exports.BytecodeLengthExceedsMaxSizeError = void 0;
const base_js_1 = require("../../errors/base.js");
class BytecodeLengthExceedsMaxSizeError extends base_js_1.BaseError {
    constructor({ givenLength, maxBytecodeSize, }) {
        super(`Bytecode cannot be longer than ${maxBytecodeSize} bytes. Given length: ${givenLength}`, { name: 'BytecodeLengthExceedsMaxSizeError' });
    }
}
exports.BytecodeLengthExceedsMaxSizeError = BytecodeLengthExceedsMaxSizeError;
class BytecodeLengthInWordsMustBeOddError extends base_js_1.BaseError {
    constructor({ givenLengthInWords }) {
        super(`Bytecode length in 32-byte words must be odd. Given length in words: ${givenLengthInWords}`, { name: 'BytecodeLengthInWordsMustBeOddError' });
    }
}
exports.BytecodeLengthInWordsMustBeOddError = BytecodeLengthInWordsMustBeOddError;
class BytecodeLengthMustBeDivisibleBy32Error extends base_js_1.BaseError {
    constructor({ givenLength }) {
        super(`The bytecode length in bytes must be divisible by 32. Given length: ${givenLength}`, { name: 'BytecodeLengthMustBeDivisibleBy32Error' });
    }
}
exports.BytecodeLengthMustBeDivisibleBy32Error = BytecodeLengthMustBeDivisibleBy32Error;
//# sourceMappingURL=bytecode.js.map