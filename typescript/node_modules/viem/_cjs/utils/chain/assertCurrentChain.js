"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertCurrentChain = assertCurrentChain;
const chain_js_1 = require("../../errors/chain.js");
function assertCurrentChain({ chain, currentChainId, }) {
    if (!chain)
        throw new chain_js_1.ChainNotFoundError();
    if (currentChainId !== chain.id)
        throw new chain_js_1.ChainMismatchError({ chain, currentChainId });
}
//# sourceMappingURL=assertCurrentChain.js.map