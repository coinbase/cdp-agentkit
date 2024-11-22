"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crab = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.crab = (0, defineChain_js_1.defineChain)({
    id: 44,
    name: 'Crab Network',
    nativeCurrency: {
        decimals: 18,
        name: 'Crab Network Native Token',
        symbol: 'CRAB',
    },
    rpcUrls: {
        default: {
            http: ['https://crab-rpc.darwinia.network'],
            webSocket: ['wss://crab-rpc.darwinia.network'],
        },
    },
    blockExplorers: {
        default: { name: 'Blockscout', url: 'https://crab-scan.darwinia.network' },
    },
    contracts: {
        multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
            blockCreated: 3032593,
        },
    },
});
//# sourceMappingURL=crab.js.map