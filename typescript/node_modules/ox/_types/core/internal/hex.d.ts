import type * as Errors from '../Errors.js';
import * as Hex from '../Hex.js';
/** @internal */
export declare function assertSize(hex: Hex.Hex, size_: number): void;
/** @internal */
export declare namespace assertSize {
    type ErrorType = Hex.size.ErrorType | Hex.SizeOverflowError | Errors.GlobalErrorType;
}
/** @internal */
export declare function assertStartOffset(value: Hex.Hex, start?: number | undefined): void;
export declare namespace assertStartOffset {
    type ErrorType = Hex.SliceOffsetOutOfBoundsError | Hex.size.ErrorType | Errors.GlobalErrorType;
}
/** @internal */
export declare function assertEndOffset(value: Hex.Hex, start?: number | undefined, end?: number | undefined): void;
export declare namespace assertEndOffset {
    type ErrorType = Hex.SliceOffsetOutOfBoundsError | Hex.size.ErrorType | Errors.GlobalErrorType;
}
/** @internal */
export declare function pad(hex_: Hex.Hex, options?: pad.Options): `0x${string}`;
/** @internal */
export declare namespace pad {
    type Options = {
        dir?: 'left' | 'right' | undefined;
        size?: number | undefined;
    };
    type ErrorType = Hex.SizeExceedsPaddingSizeError | Errors.GlobalErrorType;
}
/** @internal */
export declare function trim(value: Hex.Hex, options?: trim.Options): trim.ReturnType;
/** @internal */
export declare namespace trim {
    type Options = {
        dir?: 'left' | 'right' | undefined;
    };
    type ReturnType = Hex.Hex;
    type ErrorType = Errors.GlobalErrorType;
}
//# sourceMappingURL=hex.d.ts.map