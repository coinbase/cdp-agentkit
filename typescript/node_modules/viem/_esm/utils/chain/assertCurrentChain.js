import { ChainMismatchError, ChainNotFoundError, } from '../../errors/chain.js';
export function assertCurrentChain({ chain, currentChainId, }) {
    if (!chain)
        throw new ChainNotFoundError();
    if (currentChainId !== chain.id)
        throw new ChainMismatchError({ chain, currentChainId });
}
//# sourceMappingURL=assertCurrentChain.js.map