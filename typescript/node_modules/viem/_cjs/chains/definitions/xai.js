"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xai = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.xai = (0, defineChain_js_1.defineChain)({
    id: 660279,
    name: 'Xai Mainnet',
    nativeCurrency: { name: 'Xai', symbol: 'XAI', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://xai-chain.net/rpc'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Blockscout',
            url: 'https://explorer.xai-chain.net',
        },
    },
    contracts: {
        multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
            blockCreated: 222549,
        },
    },
    testnet: false,
});
//# sourceMappingURL=xai.js.map