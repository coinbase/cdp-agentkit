import { BaseError } from '../../errors/base.js';
export class BytecodeLengthExceedsMaxSizeError extends BaseError {
    constructor({ givenLength, maxBytecodeSize, }) {
        super(`Bytecode cannot be longer than ${maxBytecodeSize} bytes. Given length: ${givenLength}`, { name: 'BytecodeLengthExceedsMaxSizeError' });
    }
}
export class BytecodeLengthInWordsMustBeOddError extends BaseError {
    constructor({ givenLengthInWords }) {
        super(`Bytecode length in 32-byte words must be odd. Given length in words: ${givenLengthInWords}`, { name: 'BytecodeLengthInWordsMustBeOddError' });
    }
}
export class BytecodeLengthMustBeDivisibleBy32Error extends BaseError {
    constructor({ givenLength }) {
        super(`The bytecode length in bytes must be divisible by 32. Given length: ${givenLength}`, { name: 'BytecodeLengthMustBeDivisibleBy32Error' });
    }
}
//# sourceMappingURL=bytecode.js.map