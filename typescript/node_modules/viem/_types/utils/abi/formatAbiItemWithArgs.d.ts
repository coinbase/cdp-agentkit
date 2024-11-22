import type { ErrorType } from '../../errors/utils.js';
import type { AbiItem } from '../../types/contract.js';
export type FormatAbiItemWithArgsErrorType = ErrorType;
export declare function formatAbiItemWithArgs({ abiItem, args, includeFunctionName, includeName, }: {
    abiItem: AbiItem;
    args: readonly unknown[];
    includeFunctionName?: boolean | undefined;
    includeName?: boolean | undefined;
}): string | undefined;
//# sourceMappingURL=formatAbiItemWithArgs.d.ts.map