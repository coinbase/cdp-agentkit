import type { Bytes } from '../Bytes.js';
import * as Errors from '../Errors.js';
/** @internal */
export type Cursor = {
    bytes: Bytes;
    dataView: DataView;
    position: number;
    positionReadCount: Map<number, number>;
    recursiveReadCount: number;
    recursiveReadLimit: number;
    remaining: number;
    assertReadLimit(position?: number): void;
    assertPosition(position: number): void;
    decrementPosition(offset: number): void;
    getReadCount(position?: number): number;
    incrementPosition(offset: number): void;
    inspectByte(position?: number): Bytes[number];
    inspectBytes(length: number, position?: number): Bytes;
    inspectUint8(position?: number): number;
    inspectUint16(position?: number): number;
    inspectUint24(position?: number): number;
    inspectUint32(position?: number): number;
    pushByte(byte: Bytes[number]): void;
    pushBytes(bytes: Bytes): void;
    pushUint8(value: number): void;
    pushUint16(value: number): void;
    pushUint24(value: number): void;
    pushUint32(value: number): void;
    readByte(): Bytes[number];
    readBytes(length: number, size?: number): Bytes;
    readUint8(): number;
    readUint16(): number;
    readUint24(): number;
    readUint32(): number;
    setPosition(position: number): () => void;
    _touch(): void;
};
/** @internal */
export declare function create(bytes: Bytes, { recursiveReadLimit }?: create.Config): Cursor;
/** @internal */
export declare namespace create {
    type Config = {
        recursiveReadLimit?: number | undefined;
    };
    type ErrorType = Errors.GlobalErrorType;
}
/** @internal */
export declare class NegativeOffsetError extends Errors.BaseError {
    readonly name = "Cursor.NegativeOffsetError";
    constructor({ offset }: {
        offset: number;
    });
}
/** @internal */
export declare class PositionOutOfBoundsError extends Errors.BaseError {
    readonly name = "Cursor.PositionOutOfBoundsError";
    constructor({ length, position }: {
        length: number;
        position: number;
    });
}
/** @internal */
export declare class RecursiveReadLimitExceededError extends Errors.BaseError {
    readonly name = "Cursor.RecursiveReadLimitExceededError";
    constructor({ count, limit }: {
        count: number;
        limit: number;
    });
}
//# sourceMappingURL=cursor.d.ts.map