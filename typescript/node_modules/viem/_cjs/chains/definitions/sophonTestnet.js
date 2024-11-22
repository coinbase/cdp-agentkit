"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sophonTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
const chainConfig_js_1 = require("../../zksync/chainConfig.js");
exports.sophonTestnet = (0, defineChain_js_1.defineChain)({
    ...chainConfig_js_1.chainConfig,
    id: 531_050_104,
    name: 'Sophon Testnet',
    nativeCurrency: {
        decimals: 18,
        name: 'Sophon',
        symbol: 'SOPH',
    },
    rpcUrls: {
        default: {
            http: ['https://rpc.testnet.sophon.xyz'],
            webSocket: ['wss://rpc.testnet.sophon.xyz/ws'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Sophon Block Explorer',
            url: 'https://explorer.testnet.sophon.xyz',
        },
    },
    contracts: {
        multicall3: {
            address: '0x83c04d112adedA2C6D9037bb6ecb42E7f0b108Af',
            blockCreated: 15_642,
        },
    },
    testnet: true,
});
//# sourceMappingURL=sophonTestnet.js.map