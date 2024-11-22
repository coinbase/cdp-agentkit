"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnsupportedPackedAbiType = exports.InvalidDefinitionTypeError = exports.InvalidArrayError = exports.InvalidAbiDecodingTypeError = exports.InvalidAbiEncodingTypeError = exports.DecodeLogTopicsMismatch = exports.DecodeLogDataMismatch = exports.BytesSizeMismatchError = exports.AbiItemAmbiguityError = exports.AbiFunctionSignatureNotFoundError = exports.AbiFunctionOutputsNotFoundError = exports.AbiFunctionNotFoundError = exports.AbiEventNotFoundError = exports.AbiEventSignatureNotFoundError = exports.AbiEventSignatureEmptyTopicsError = exports.AbiErrorSignatureNotFoundError = exports.AbiErrorNotFoundError = exports.AbiErrorInputsNotFoundError = exports.AbiEncodingLengthMismatchError = exports.AbiEncodingBytesSizeMismatchError = exports.AbiEncodingArrayLengthMismatchError = exports.AbiDecodingZeroDataError = exports.AbiDecodingDataSizeTooSmallError = exports.AbiDecodingDataSizeInvalidError = exports.AbiConstructorParamsNotFoundError = exports.AbiConstructorNotFoundError = void 0;
const formatAbiItem_js_1 = require("../utils/abi/formatAbiItem.js");
const size_js_1 = require("../utils/data/size.js");
const base_js_1 = require("./base.js");
class AbiConstructorNotFoundError extends base_js_1.BaseError {
    constructor({ docsPath }) {
        super([
            'A constructor was not found on the ABI.',
            'Make sure you are using the correct ABI and that the constructor exists on it.',
        ].join('\n'), {
            docsPath,
            name: 'AbiConstructorNotFoundError',
        });
    }
}
exports.AbiConstructorNotFoundError = AbiConstructorNotFoundError;
class AbiConstructorParamsNotFoundError extends base_js_1.BaseError {
    constructor({ docsPath }) {
        super([
            'Constructor arguments were provided (`args`), but a constructor parameters (`inputs`) were not found on the ABI.',
            'Make sure you are using the correct ABI, and that the `inputs` attribute on the constructor exists.',
        ].join('\n'), {
            docsPath,
            name: 'AbiConstructorParamsNotFoundError',
        });
    }
}
exports.AbiConstructorParamsNotFoundError = AbiConstructorParamsNotFoundError;
class AbiDecodingDataSizeInvalidError extends base_js_1.BaseError {
    constructor({ data, size }) {
        super([
            `Data size of ${size} bytes is invalid.`,
            'Size must be in increments of 32 bytes (size % 32 === 0).',
        ].join('\n'), {
            metaMessages: [`Data: ${data} (${size} bytes)`],
            name: 'AbiDecodingDataSizeInvalidError',
        });
    }
}
exports.AbiDecodingDataSizeInvalidError = AbiDecodingDataSizeInvalidError;
class AbiDecodingDataSizeTooSmallError extends base_js_1.BaseError {
    constructor({ data, params, size, }) {
        super([`Data size of ${size} bytes is too small for given parameters.`].join('\n'), {
            metaMessages: [
                `Params: (${(0, formatAbiItem_js_1.formatAbiParams)(params, { includeName: true })})`,
                `Data:   ${data} (${size} bytes)`,
            ],
            name: 'AbiDecodingDataSizeTooSmallError',
        });
        Object.defineProperty(this, "data", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "params", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "size", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.data = data;
        this.params = params;
        this.size = size;
    }
}
exports.AbiDecodingDataSizeTooSmallError = AbiDecodingDataSizeTooSmallError;
class AbiDecodingZeroDataError extends base_js_1.BaseError {
    constructor() {
        super('Cannot decode zero data ("0x") with ABI parameters.', {
            name: 'AbiDecodingZeroDataError',
        });
    }
}
exports.AbiDecodingZeroDataError = AbiDecodingZeroDataError;
class AbiEncodingArrayLengthMismatchError extends base_js_1.BaseError {
    constructor({ expectedLength, givenLength, type, }) {
        super([
            `ABI encoding array length mismatch for type ${type}.`,
            `Expected length: ${expectedLength}`,
            `Given length: ${givenLength}`,
        ].join('\n'), { name: 'AbiEncodingArrayLengthMismatchError' });
    }
}
exports.AbiEncodingArrayLengthMismatchError = AbiEncodingArrayLengthMismatchError;
class AbiEncodingBytesSizeMismatchError extends base_js_1.BaseError {
    constructor({ expectedSize, value }) {
        super(`Size of bytes "${value}" (bytes${(0, size_js_1.size)(value)}) does not match expected size (bytes${expectedSize}).`, { name: 'AbiEncodingBytesSizeMismatchError' });
    }
}
exports.AbiEncodingBytesSizeMismatchError = AbiEncodingBytesSizeMismatchError;
class AbiEncodingLengthMismatchError extends base_js_1.BaseError {
    constructor({ expectedLength, givenLength, }) {
        super([
            'ABI encoding params/values length mismatch.',
            `Expected length (params): ${expectedLength}`,
            `Given length (values): ${givenLength}`,
        ].join('\n'), { name: 'AbiEncodingLengthMismatchError' });
    }
}
exports.AbiEncodingLengthMismatchError = AbiEncodingLengthMismatchError;
class AbiErrorInputsNotFoundError extends base_js_1.BaseError {
    constructor(errorName, { docsPath }) {
        super([
            `Arguments (\`args\`) were provided to "${errorName}", but "${errorName}" on the ABI does not contain any parameters (\`inputs\`).`,
            'Cannot encode error result without knowing what the parameter types are.',
            'Make sure you are using the correct ABI and that the inputs exist on it.',
        ].join('\n'), {
            docsPath,
            name: 'AbiErrorInputsNotFoundError',
        });
    }
}
exports.AbiErrorInputsNotFoundError = AbiErrorInputsNotFoundError;
class AbiErrorNotFoundError extends base_js_1.BaseError {
    constructor(errorName, { docsPath } = {}) {
        super([
            `Error ${errorName ? `"${errorName}" ` : ''}not found on ABI.`,
            'Make sure you are using the correct ABI and that the error exists on it.',
        ].join('\n'), {
            docsPath,
            name: 'AbiErrorNotFoundError',
        });
    }
}
exports.AbiErrorNotFoundError = AbiErrorNotFoundError;
class AbiErrorSignatureNotFoundError extends base_js_1.BaseError {
    constructor(signature, { docsPath }) {
        super([
            `Encoded error signature "${signature}" not found on ABI.`,
            'Make sure you are using the correct ABI and that the error exists on it.',
            `You can look up the decoded signature here: https://openchain.xyz/signatures?query=${signature}.`,
        ].join('\n'), {
            docsPath,
            name: 'AbiErrorSignatureNotFoundError',
        });
        Object.defineProperty(this, "signature", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.signature = signature;
    }
}
exports.AbiErrorSignatureNotFoundError = AbiErrorSignatureNotFoundError;
class AbiEventSignatureEmptyTopicsError extends base_js_1.BaseError {
    constructor({ docsPath }) {
        super('Cannot extract event signature from empty topics.', {
            docsPath,
            name: 'AbiEventSignatureEmptyTopicsError',
        });
    }
}
exports.AbiEventSignatureEmptyTopicsError = AbiEventSignatureEmptyTopicsError;
class AbiEventSignatureNotFoundError extends base_js_1.BaseError {
    constructor(signature, { docsPath }) {
        super([
            `Encoded event signature "${signature}" not found on ABI.`,
            'Make sure you are using the correct ABI and that the event exists on it.',
            `You can look up the signature here: https://openchain.xyz/signatures?query=${signature}.`,
        ].join('\n'), {
            docsPath,
            name: 'AbiEventSignatureNotFoundError',
        });
    }
}
exports.AbiEventSignatureNotFoundError = AbiEventSignatureNotFoundError;
class AbiEventNotFoundError extends base_js_1.BaseError {
    constructor(eventName, { docsPath } = {}) {
        super([
            `Event ${eventName ? `"${eventName}" ` : ''}not found on ABI.`,
            'Make sure you are using the correct ABI and that the event exists on it.',
        ].join('\n'), {
            docsPath,
            name: 'AbiEventNotFoundError',
        });
    }
}
exports.AbiEventNotFoundError = AbiEventNotFoundError;
class AbiFunctionNotFoundError extends base_js_1.BaseError {
    constructor(functionName, { docsPath } = {}) {
        super([
            `Function ${functionName ? `"${functionName}" ` : ''}not found on ABI.`,
            'Make sure you are using the correct ABI and that the function exists on it.',
        ].join('\n'), {
            docsPath,
            name: 'AbiFunctionNotFoundError',
        });
    }
}
exports.AbiFunctionNotFoundError = AbiFunctionNotFoundError;
class AbiFunctionOutputsNotFoundError extends base_js_1.BaseError {
    constructor(functionName, { docsPath }) {
        super([
            `Function "${functionName}" does not contain any \`outputs\` on ABI.`,
            'Cannot decode function result without knowing what the parameter types are.',
            'Make sure you are using the correct ABI and that the function exists on it.',
        ].join('\n'), {
            docsPath,
            name: 'AbiFunctionOutputsNotFoundError',
        });
    }
}
exports.AbiFunctionOutputsNotFoundError = AbiFunctionOutputsNotFoundError;
class AbiFunctionSignatureNotFoundError extends base_js_1.BaseError {
    constructor(signature, { docsPath }) {
        super([
            `Encoded function signature "${signature}" not found on ABI.`,
            'Make sure you are using the correct ABI and that the function exists on it.',
            `You can look up the signature here: https://openchain.xyz/signatures?query=${signature}.`,
        ].join('\n'), {
            docsPath,
            name: 'AbiFunctionSignatureNotFoundError',
        });
    }
}
exports.AbiFunctionSignatureNotFoundError = AbiFunctionSignatureNotFoundError;
class AbiItemAmbiguityError extends base_js_1.BaseError {
    constructor(x, y) {
        super('Found ambiguous types in overloaded ABI items.', {
            metaMessages: [
                `\`${x.type}\` in \`${(0, formatAbiItem_js_1.formatAbiItem)(x.abiItem)}\`, and`,
                `\`${y.type}\` in \`${(0, formatAbiItem_js_1.formatAbiItem)(y.abiItem)}\``,
                '',
                'These types encode differently and cannot be distinguished at runtime.',
                'Remove one of the ambiguous items in the ABI.',
            ],
            name: 'AbiItemAmbiguityError',
        });
    }
}
exports.AbiItemAmbiguityError = AbiItemAmbiguityError;
class BytesSizeMismatchError extends base_js_1.BaseError {
    constructor({ expectedSize, givenSize, }) {
        super(`Expected bytes${expectedSize}, got bytes${givenSize}.`, {
            name: 'BytesSizeMismatchError',
        });
    }
}
exports.BytesSizeMismatchError = BytesSizeMismatchError;
class DecodeLogDataMismatch extends base_js_1.BaseError {
    constructor({ abiItem, data, params, size, }) {
        super([
            `Data size of ${size} bytes is too small for non-indexed event parameters.`,
        ].join('\n'), {
            metaMessages: [
                `Params: (${(0, formatAbiItem_js_1.formatAbiParams)(params, { includeName: true })})`,
                `Data:   ${data} (${size} bytes)`,
            ],
            name: 'DecodeLogDataMismatch',
        });
        Object.defineProperty(this, "abiItem", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "data", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "params", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "size", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.abiItem = abiItem;
        this.data = data;
        this.params = params;
        this.size = size;
    }
}
exports.DecodeLogDataMismatch = DecodeLogDataMismatch;
class DecodeLogTopicsMismatch extends base_js_1.BaseError {
    constructor({ abiItem, param, }) {
        super([
            `Expected a topic for indexed event parameter${param.name ? ` "${param.name}"` : ''} on event "${(0, formatAbiItem_js_1.formatAbiItem)(abiItem, { includeName: true })}".`,
        ].join('\n'), { name: 'DecodeLogTopicsMismatch' });
        Object.defineProperty(this, "abiItem", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.abiItem = abiItem;
    }
}
exports.DecodeLogTopicsMismatch = DecodeLogTopicsMismatch;
class InvalidAbiEncodingTypeError extends base_js_1.BaseError {
    constructor(type, { docsPath }) {
        super([
            `Type "${type}" is not a valid encoding type.`,
            'Please provide a valid ABI type.',
        ].join('\n'), { docsPath, name: 'InvalidAbiEncodingType' });
    }
}
exports.InvalidAbiEncodingTypeError = InvalidAbiEncodingTypeError;
class InvalidAbiDecodingTypeError extends base_js_1.BaseError {
    constructor(type, { docsPath }) {
        super([
            `Type "${type}" is not a valid decoding type.`,
            'Please provide a valid ABI type.',
        ].join('\n'), { docsPath, name: 'InvalidAbiDecodingType' });
    }
}
exports.InvalidAbiDecodingTypeError = InvalidAbiDecodingTypeError;
class InvalidArrayError extends base_js_1.BaseError {
    constructor(value) {
        super([`Value "${value}" is not a valid array.`].join('\n'), {
            name: 'InvalidArrayError',
        });
    }
}
exports.InvalidArrayError = InvalidArrayError;
class InvalidDefinitionTypeError extends base_js_1.BaseError {
    constructor(type) {
        super([
            `"${type}" is not a valid definition type.`,
            'Valid types: "function", "event", "error"',
        ].join('\n'), { name: 'InvalidDefinitionTypeError' });
    }
}
exports.InvalidDefinitionTypeError = InvalidDefinitionTypeError;
class UnsupportedPackedAbiType extends base_js_1.BaseError {
    constructor(type) {
        super(`Type "${type}" is not supported for packed encoding.`, {
            name: 'UnsupportedPackedAbiType',
        });
    }
}
exports.UnsupportedPackedAbiType = UnsupportedPackedAbiType;
//# sourceMappingURL=abi.js.map