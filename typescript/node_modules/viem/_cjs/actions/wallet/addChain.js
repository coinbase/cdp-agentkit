"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addChain = addChain;
const toHex_js_1 = require("../../utils/encoding/toHex.js");
async function addChain(client, { chain }) {
    const { id, name, nativeCurrency, rpcUrls, blockExplorers } = chain;
    await client.request({
        method: 'wallet_addEthereumChain',
        params: [
            {
                chainId: (0, toHex_js_1.numberToHex)(id),
                chainName: name,
                nativeCurrency,
                rpcUrls: rpcUrls.default.http,
                blockExplorerUrls: blockExplorers
                    ? Object.values(blockExplorers).map(({ url }) => url)
                    : undefined,
            },
        ],
    }, { dedupe: true, retryCount: 0 });
}
//# sourceMappingURL=addChain.js.map