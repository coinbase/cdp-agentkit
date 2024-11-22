import type { ErrorType } from '../../errors/utils.js';
import type { ChainFormatter } from '../../types/chain.js';
export type ExtractErrorType = ErrorType;
/**
 * @description Picks out the keys from `value` that exist in the formatter..
 */
export declare function extract(value_: Record<string, unknown>, { format }: {
    format?: ChainFormatter['format'] | undefined;
}): Record<string, unknown>;
//# sourceMappingURL=extract.d.ts.map