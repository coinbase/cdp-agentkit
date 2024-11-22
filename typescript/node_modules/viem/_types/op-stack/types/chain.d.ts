import type { Chain, ChainContract } from '../../types/chain.js';
export type TargetChain<chain extends Chain = Chain, contractName extends string = string> = {
    contracts: {
        [_ in contractName]: {
            [_ in chain['id']]: ChainContract;
        };
    };
};
//# sourceMappingURL=chain.d.ts.map