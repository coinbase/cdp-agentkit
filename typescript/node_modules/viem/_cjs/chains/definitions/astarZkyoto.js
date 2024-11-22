"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.astarZkyoto = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.astarZkyoto = (0, defineChain_js_1.defineChain)({
    id: 6_038_361,
    name: 'Astar zkEVM Testnet zKyoto',
    network: 'zKyoto',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://rpc.startale.com/zkyoto'],
        },
    },
    blockExplorers: {
        default: {
            name: 'zKyoto Explorer',
            url: 'https://zkyoto.explorer.startale.com',
        },
    },
    contracts: {
        multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
            blockCreated: 196153,
        },
    },
    testnet: true,
});
//# sourceMappingURL=astarZkyoto.js.map