import * as Bytes from '../Bytes.js';
import type * as Errors from '../Errors.js';
/** @internal */
export declare function assertSize(bytes: Bytes.Bytes, size_: number): void;
/** @internal */
export declare namespace assertSize {
    type ErrorType = Bytes.size.ErrorType | Bytes.SizeOverflowError | Errors.GlobalErrorType;
}
/** @internal */
export declare function assertStartOffset(value: Bytes.Bytes, start?: number | undefined): void;
export declare namespace assertStartOffset {
    type ErrorType = Bytes.SliceOffsetOutOfBoundsError | Bytes.size.ErrorType | Errors.GlobalErrorType;
}
/** @internal */
export declare function assertEndOffset(value: Bytes.Bytes, start?: number | undefined, end?: number | undefined): void;
/** @internal */
export declare namespace assertEndOffset {
    type ErrorType = Bytes.SliceOffsetOutOfBoundsError | Bytes.size.ErrorType | Errors.GlobalErrorType;
}
/** @internal */
export declare const charCodeMap: {
    readonly zero: 48;
    readonly nine: 57;
    readonly A: 65;
    readonly F: 70;
    readonly a: 97;
    readonly f: 102;
};
/** @internal */
export declare function charCodeToBase16(char: number): number | undefined;
/** @internal */
export declare function pad(bytes: Bytes.Bytes, options?: pad.Options): Uint8Array;
/** @internal */
export declare namespace pad {
    type Options = {
        dir?: 'left' | 'right' | undefined;
        size?: number | undefined;
    };
    type ReturnType = Bytes.Bytes;
    type ErrorType = Bytes.SizeExceedsPaddingSizeError | Errors.GlobalErrorType;
}
/** @internal */
export declare function trim(value: Bytes.Bytes, options?: trim.Options): trim.ReturnType;
/** @internal */
export declare namespace trim {
    type Options = {
        dir?: 'left' | 'right' | undefined;
    };
    type ReturnType = Bytes.Bytes;
    type ErrorType = Errors.GlobalErrorType;
}
//# sourceMappingURL=bytes.d.ts.map