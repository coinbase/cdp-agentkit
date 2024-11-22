"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mintSepoliaTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.mintSepoliaTestnet = (0, defineChain_js_1.defineChain)({
    id: 1686,
    name: 'Mint Sepolia Testnet',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://testnet-rpc.mintchain.io'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Mintchain Testnet explorer',
            url: 'https://testnet-explorer.mintchain.io',
        },
    },
    testnet: true,
});
//# sourceMappingURL=mintSepoliaTestnet.js.map