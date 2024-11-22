"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wanchainTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.wanchainTestnet = (0, defineChain_js_1.defineChain)({
    id: 999,
    name: 'Wanchain Testnet',
    nativeCurrency: { name: 'WANCHAIN', symbol: 'WANt', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://gwan-ssl.wandevs.org:46891'],
        },
    },
    blockExplorers: {
        default: {
            name: 'WanScanTest',
            url: 'https://wanscan.org',
        },
    },
    contracts: {
        multicall3: {
            address: '0x11c89bF4496c39FB80535Ffb4c92715839CC5324',
            blockCreated: 24743448,
        },
    },
    testnet: true,
});
//# sourceMappingURL=wanchainTestnet.js.map