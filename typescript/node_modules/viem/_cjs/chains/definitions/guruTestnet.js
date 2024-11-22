"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.guruTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.guruTestnet = (0, defineChain_js_1.defineChain)({
    id: 261,
    name: 'Guru Network Testnet',
    nativeCurrency: {
        name: 'tGURU Token',
        symbol: 'tGURU',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ['https://rpc.gurunetwork.ai/archive/261'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Guruscan',
            url: 'https://sepolia.gurunetwork.ai',
        },
    },
    testnet: true,
});
//# sourceMappingURL=guruTestnet.js.map