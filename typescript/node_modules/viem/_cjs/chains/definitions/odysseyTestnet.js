"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.odysseyTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.odysseyTestnet = (0, defineChain_js_1.defineChain)({
    id: 911867,
    name: 'Odyssey Testnet',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://odyssey.ithaca.xyz'] },
    },
    blockExplorers: {
        default: {
            name: 'Odyssey Explorer',
            url: 'https://odyssey-explorer.ithaca.xyz',
            apiUrl: 'https://odyssey-explorer.ithaca.xyz/api',
        },
    },
    testnet: true,
});
//# sourceMappingURL=odysseyTestnet.js.map