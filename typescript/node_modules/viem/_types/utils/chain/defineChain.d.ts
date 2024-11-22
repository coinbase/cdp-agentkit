import type { Chain, ChainFormatters } from '../../types/chain.js';
import type { Assign, Prettify } from '../../types/utils.js';
export declare function defineChain<formatters extends ChainFormatters, const chain extends Chain<formatters>>(chain: chain): Prettify<Assign<Chain<undefined>, chain>>;
//# sourceMappingURL=defineChain.d.ts.map