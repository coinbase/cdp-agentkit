import type { ErrorType } from '../../errors/utils.js';
import type { Block, BlockTag } from '../../types/block.js';
import type { Chain } from '../../types/chain.js';
import type { ExtractChainFormatterExclude, ExtractChainFormatterReturnType } from '../../types/chain.js';
import type { Hash } from '../../types/misc.js';
import type { RpcBlock } from '../../types/rpc.js';
import type { ExactPartial, Prettify } from '../../types/utils.js';
import { type DefineFormatterErrorType } from './formatter.js';
import { type FormattedTransaction } from './transaction.js';
type BlockPendingDependencies = 'hash' | 'logsBloom' | 'nonce' | 'number';
export type FormattedBlock<chain extends Chain | undefined = undefined, includeTransactions extends boolean = boolean, blockTag extends BlockTag = BlockTag, _FormatterReturnType = ExtractChainFormatterReturnType<chain, 'block', Block<bigint, includeTransactions>>, _ExcludedPendingDependencies extends string = BlockPendingDependencies & ExtractChainFormatterExclude<chain, 'block'>, _Formatted = Omit<_FormatterReturnType, BlockPendingDependencies> & {
    [_key in _ExcludedPendingDependencies]: never;
} & Pick<Block<bigint, includeTransactions, blockTag>, BlockPendingDependencies>, _Transactions = includeTransactions extends true ? Prettify<FormattedTransaction<chain, blockTag>>[] : Hash[]> = Omit<_Formatted, 'transactions'> & {
    transactions: _Transactions;
};
export type FormatBlockErrorType = ErrorType;
export declare function formatBlock(block: ExactPartial<RpcBlock>): Block;
export type DefineBlockErrorType = DefineFormatterErrorType | ErrorType;
export declare const defineBlock: <parametersOverride, returnTypeOverride, exclude extends (keyof RpcBlock | keyof parametersOverride)[] = []>({ exclude, format: overrides, }: {
    exclude?: exclude | undefined;
    format: (_: parametersOverride) => returnTypeOverride;
}) => {
    exclude: exclude | undefined;
    format: (args: parametersOverride) => { [K in keyof returnTypeOverride]: returnTypeOverride[K]; } & { [_key in exclude[number]]: never; };
    type: "block";
};
export {};
//# sourceMappingURL=block.d.ts.map