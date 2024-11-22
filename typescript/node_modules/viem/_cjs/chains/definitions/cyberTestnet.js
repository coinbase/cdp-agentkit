"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cyberTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.cyberTestnet = (0, defineChain_js_1.defineChain)({
    id: 111_557_560,
    name: 'Cyber Testnet',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://cyber-testnet.alt.technology'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Blockscout',
            url: 'https://testnet.cyberscan.co',
            apiUrl: 'https://testnet.cyberscan.co/api',
        },
    },
    contracts: {
        multicall3: {
            address: '0xffc391F0018269d4758AEA1a144772E8FB99545E',
            blockCreated: 304545,
        },
    },
    testnet: true,
});
//# sourceMappingURL=cyberTestnet.js.map