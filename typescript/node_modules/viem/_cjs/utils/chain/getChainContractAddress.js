"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChainContractAddress = getChainContractAddress;
const chain_js_1 = require("../../errors/chain.js");
function getChainContractAddress({ blockNumber, chain, contract: name, }) {
    const contract = chain?.contracts?.[name];
    if (!contract)
        throw new chain_js_1.ChainDoesNotSupportContract({
            chain,
            contract: { name },
        });
    if (blockNumber &&
        contract.blockCreated &&
        contract.blockCreated > blockNumber)
        throw new chain_js_1.ChainDoesNotSupportContract({
            blockNumber,
            chain,
            contract: {
                name,
                blockCreated: contract.blockCreated,
            },
        });
    return contract.address;
}
//# sourceMappingURL=getChainContractAddress.js.map