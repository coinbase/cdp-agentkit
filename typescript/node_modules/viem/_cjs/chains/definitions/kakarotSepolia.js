"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kakarotSepolia = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.kakarotSepolia = (0, defineChain_js_1.defineChain)({
    id: 1802203764,
    name: 'Kakarot Sepolia',
    nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ['https://sepolia-rpc.kakarot.org'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Kakarot Scan',
            url: 'https://sepolia.kakarotscan.org',
        },
    },
    testnet: true,
});
//# sourceMappingURL=kakarotSepolia.js.map