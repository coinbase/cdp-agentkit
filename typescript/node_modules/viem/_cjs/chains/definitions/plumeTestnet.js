"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plumeTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
const sourceId = 11_155_111;
exports.plumeTestnet = (0, defineChain_js_1.defineChain)({
    id: 161_221_135,
    name: 'Plume Testnet',
    nativeCurrency: {
        name: 'Plume Sepolia Ether',
        symbol: 'ETH',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ['https://testnet-rpc.plumenetwork.xyz/http'],
            webSocket: ['wss://testnet-rpc.plumenetwork.xyz/ws'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Blockscout',
            url: 'https://testnet-explorer.plumenetwork.xyz',
            apiUrl: 'https://testnet-explorer.plumenetwork.xyz/api',
        },
    },
    testnet: true,
    sourceId,
});
//# sourceMappingURL=plumeTestnet.js.map