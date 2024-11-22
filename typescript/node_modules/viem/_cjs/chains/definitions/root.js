"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.root = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.root = (0, defineChain_js_1.defineChain)({
    id: 7668,
    name: 'The Root Network',
    nativeCurrency: {
        decimals: 18,
        name: 'XRP',
        symbol: 'XRP',
    },
    rpcUrls: {
        default: {
            http: ['https://root.rootnet.live/archive'],
            webSocket: ['wss://root.rootnet.live/archive/ws'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Rootscan',
            url: 'https://rootscan.io',
        },
    },
    contracts: {
        multicall3: {
            address: '0xc9C2E2429AeC354916c476B30d729deDdC94988d',
            blockCreated: 9218338,
        },
    },
});
//# sourceMappingURL=root.js.map