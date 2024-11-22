"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.palm = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.palm = (0, defineChain_js_1.defineChain)({
    id: 11_297_108_109,
    name: 'Palm',
    nativeCurrency: {
        decimals: 18,
        name: 'PALM',
        symbol: 'PALM',
    },
    rpcUrls: {
        default: {
            http: ['https://palm-mainnet.public.blastapi.io'],
            webSocket: ['wss://palm-mainnet.public.blastapi.io'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Chainlens',
            url: 'https://palm.chainlens.com',
        },
    },
    contracts: {
        multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
            blockCreated: 15429248,
        },
    },
});
//# sourceMappingURL=palm.js.map