"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrollSepolia = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.scrollSepolia = (0, defineChain_js_1.defineChain)({
    id: 534_351,
    name: 'Scroll Sepolia',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://sepolia-rpc.scroll.io'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Scrollscan',
            url: 'https://sepolia.scrollscan.com',
            apiUrl: 'https://api-sepolia.scrollscan.com/api',
        },
    },
    contracts: {
        multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
            blockCreated: 9473,
        },
    },
    testnet: true,
});
//# sourceMappingURL=scrollSepolia.js.map