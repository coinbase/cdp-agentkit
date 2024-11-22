"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.koi = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.koi = (0, defineChain_js_1.defineChain)({
    id: 701,
    name: 'Koi Network',
    nativeCurrency: {
        decimals: 18,
        name: 'Koi Network Native Token',
        symbol: 'KRING',
    },
    rpcUrls: {
        default: {
            http: ['https://koi-rpc.darwinia.network'],
            webSocket: ['wss://koi-rpc.darwinia.network'],
        },
    },
    blockExplorers: {
        default: { name: 'Blockscout', url: 'https://koi-scan.darwinia.network' },
    },
    contracts: {
        multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
            blockCreated: 180001,
        },
    },
    testnet: true,
});
//# sourceMappingURL=koi.js.map