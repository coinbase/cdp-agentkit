"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kakarotStarknetSepolia = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.kakarotStarknetSepolia = (0, defineChain_js_1.defineChain)({
    id: 920637907288165,
    name: 'Kakarot Starknet Sepolia',
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
//# sourceMappingURL=kakarotStarknetSepolia.js.map