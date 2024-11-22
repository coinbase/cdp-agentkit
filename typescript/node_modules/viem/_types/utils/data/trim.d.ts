import type { ErrorType } from '../../errors/utils.js';
import type { ByteArray, Hex } from '../../types/misc.js';
type TrimOptions = {
    dir?: 'left' | 'right' | undefined;
};
export type TrimReturnType<value extends ByteArray | Hex> = value extends Hex ? Hex : ByteArray;
export type TrimErrorType = ErrorType;
export declare function trim<value extends ByteArray | Hex>(hexOrBytes: value, { dir }?: TrimOptions): TrimReturnType<value>;
export {};
//# sourceMappingURL=trim.d.ts.map