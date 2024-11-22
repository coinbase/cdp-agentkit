import type { Abi, AbiEvent, AbiParameter } from 'abitype';
import type { Hex } from '../types/misc.js';
import { BaseError } from './base.js';
export type AbiConstructorNotFoundErrorType = AbiConstructorNotFoundError & {
    name: 'AbiConstructorNotFoundError';
};
export declare class AbiConstructorNotFoundError extends BaseError {
    constructor({ docsPath }: {
        docsPath: string;
    });
}
export type AbiConstructorParamsNotFoundErrorType = AbiConstructorParamsNotFoundError & {
    name: 'AbiConstructorParamsNotFoundError';
};
export declare class AbiConstructorParamsNotFoundError extends BaseError {
    constructor({ docsPath }: {
        docsPath: string;
    });
}
export type AbiDecodingDataSizeInvalidErrorType = AbiDecodingDataSizeInvalidError & {
    name: 'AbiDecodingDataSizeInvalidError';
};
export declare class AbiDecodingDataSizeInvalidError extends BaseError {
    constructor({ data, size }: {
        data: Hex;
        size: number;
    });
}
export type AbiDecodingDataSizeTooSmallErrorType = AbiDecodingDataSizeTooSmallError & {
    name: 'AbiDecodingDataSizeTooSmallError';
};
export declare class AbiDecodingDataSizeTooSmallError extends BaseError {
    data: Hex;
    params: readonly AbiParameter[];
    size: number;
    constructor({ data, params, size, }: {
        data: Hex;
        params: readonly AbiParameter[];
        size: number;
    });
}
export type AbiDecodingZeroDataErrorType = AbiDecodingZeroDataError & {
    name: 'AbiDecodingZeroDataError';
};
export declare class AbiDecodingZeroDataError extends BaseError {
    constructor();
}
export type AbiEncodingArrayLengthMismatchErrorType = AbiEncodingArrayLengthMismatchError & {
    name: 'AbiEncodingArrayLengthMismatchError';
};
export declare class AbiEncodingArrayLengthMismatchError extends BaseError {
    constructor({ expectedLength, givenLength, type, }: {
        expectedLength: number;
        givenLength: number;
        type: string;
    });
}
export type AbiEncodingBytesSizeMismatchErrorType = AbiEncodingBytesSizeMismatchError & {
    name: 'AbiEncodingBytesSizeMismatchError';
};
export declare class AbiEncodingBytesSizeMismatchError extends BaseError {
    constructor({ expectedSize, value }: {
        expectedSize: number;
        value: Hex;
    });
}
export type AbiEncodingLengthMismatchErrorType = AbiEncodingLengthMismatchError & {
    name: 'AbiEncodingLengthMismatchError';
};
export declare class AbiEncodingLengthMismatchError extends BaseError {
    constructor({ expectedLength, givenLength, }: {
        expectedLength: number;
        givenLength: number;
    });
}
export type AbiErrorInputsNotFoundErrorType = AbiErrorInputsNotFoundError & {
    name: 'AbiErrorInputsNotFoundError';
};
export declare class AbiErrorInputsNotFoundError extends BaseError {
    constructor(errorName: string, { docsPath }: {
        docsPath: string;
    });
}
export type AbiErrorNotFoundErrorType = AbiErrorNotFoundError & {
    name: 'AbiErrorNotFoundError';
};
export declare class AbiErrorNotFoundError extends BaseError {
    constructor(errorName?: string | undefined, { docsPath }?: {
        docsPath?: string | undefined;
    });
}
export type AbiErrorSignatureNotFoundErrorType = AbiErrorSignatureNotFoundError & {
    name: 'AbiErrorSignatureNotFoundError';
};
export declare class AbiErrorSignatureNotFoundError extends BaseError {
    signature: Hex;
    constructor(signature: Hex, { docsPath }: {
        docsPath: string;
    });
}
export type AbiEventSignatureEmptyTopicsErrorType = AbiEventSignatureEmptyTopicsError & {
    name: 'AbiEventSignatureEmptyTopicsError';
};
export declare class AbiEventSignatureEmptyTopicsError extends BaseError {
    constructor({ docsPath }: {
        docsPath: string;
    });
}
export type AbiEventSignatureNotFoundErrorType = AbiEventSignatureNotFoundError & {
    name: 'AbiEventSignatureNotFoundError';
};
export declare class AbiEventSignatureNotFoundError extends BaseError {
    constructor(signature: Hex, { docsPath }: {
        docsPath: string;
    });
}
export type AbiEventNotFoundErrorType = AbiEventNotFoundError & {
    name: 'AbiEventNotFoundError';
};
export declare class AbiEventNotFoundError extends BaseError {
    constructor(eventName?: string | undefined, { docsPath }?: {
        docsPath?: string | undefined;
    });
}
export type AbiFunctionNotFoundErrorType = AbiFunctionNotFoundError & {
    name: 'AbiFunctionNotFoundError';
};
export declare class AbiFunctionNotFoundError extends BaseError {
    constructor(functionName?: string | undefined, { docsPath }?: {
        docsPath?: string | undefined;
    });
}
export type AbiFunctionOutputsNotFoundErrorType = AbiFunctionOutputsNotFoundError & {
    name: 'AbiFunctionOutputsNotFoundError';
};
export declare class AbiFunctionOutputsNotFoundError extends BaseError {
    constructor(functionName: string, { docsPath }: {
        docsPath: string;
    });
}
export type AbiFunctionSignatureNotFoundErrorType = AbiFunctionSignatureNotFoundError & {
    name: 'AbiFunctionSignatureNotFoundError';
};
export declare class AbiFunctionSignatureNotFoundError extends BaseError {
    constructor(signature: Hex, { docsPath }: {
        docsPath: string;
    });
}
export type AbiItemAmbiguityErrorType = AbiItemAmbiguityError & {
    name: 'AbiItemAmbiguityError';
};
export declare class AbiItemAmbiguityError extends BaseError {
    constructor(x: {
        abiItem: Abi[number];
        type: string;
    }, y: {
        abiItem: Abi[number];
        type: string;
    });
}
export type BytesSizeMismatchErrorType = BytesSizeMismatchError & {
    name: 'BytesSizeMismatchError';
};
export declare class BytesSizeMismatchError extends BaseError {
    constructor({ expectedSize, givenSize, }: {
        expectedSize: number;
        givenSize: number;
    });
}
export type DecodeLogDataMismatchErrorType = DecodeLogDataMismatch & {
    name: 'DecodeLogDataMismatch';
};
export declare class DecodeLogDataMismatch extends BaseError {
    abiItem: AbiEvent;
    data: Hex;
    params: readonly AbiParameter[];
    size: number;
    constructor({ abiItem, data, params, size, }: {
        abiItem: AbiEvent;
        data: Hex;
        params: readonly AbiParameter[];
        size: number;
    });
}
export type DecodeLogTopicsMismatchErrorType = DecodeLogTopicsMismatch & {
    name: 'DecodeLogTopicsMismatch';
};
export declare class DecodeLogTopicsMismatch extends BaseError {
    abiItem: AbiEvent;
    constructor({ abiItem, param, }: {
        abiItem: AbiEvent;
        param: AbiParameter & {
            indexed: boolean;
        };
    });
}
export type InvalidAbiEncodingTypeErrorType = InvalidAbiEncodingTypeError & {
    name: 'InvalidAbiEncodingTypeError';
};
export declare class InvalidAbiEncodingTypeError extends BaseError {
    constructor(type: string, { docsPath }: {
        docsPath: string;
    });
}
export type InvalidAbiDecodingTypeErrorType = InvalidAbiDecodingTypeError & {
    name: 'InvalidAbiDecodingTypeError';
};
export declare class InvalidAbiDecodingTypeError extends BaseError {
    constructor(type: string, { docsPath }: {
        docsPath: string;
    });
}
export type InvalidArrayErrorType = InvalidArrayError & {
    name: 'InvalidArrayError';
};
export declare class InvalidArrayError extends BaseError {
    constructor(value: unknown);
}
export type InvalidDefinitionTypeErrorType = InvalidDefinitionTypeError & {
    name: 'InvalidDefinitionTypeError';
};
export declare class InvalidDefinitionTypeError extends BaseError {
    constructor(type: string);
}
export type UnsupportedPackedAbiTypeErrorType = UnsupportedPackedAbiType & {
    name: 'UnsupportedPackedAbiType';
};
export declare class UnsupportedPackedAbiType extends BaseError {
    constructor(type: unknown);
}
//# sourceMappingURL=abi.d.ts.map