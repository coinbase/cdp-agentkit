"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.polygonZkEvmCardona = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.polygonZkEvmCardona = (0, defineChain_js_1.defineChain)({
    id: 2442,
    name: 'Polygon zkEVM Cardona',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://rpc.cardona.zkevm-rpc.com'],
        },
    },
    blockExplorers: {
        default: {
            name: 'PolygonScan',
            url: 'https://cardona-zkevm.polygonscan.com',
            apiUrl: 'https://cardona-zkevm.polygonscan.com/api',
        },
    },
    testnet: true,
    contracts: {
        multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
            blockCreated: 114091,
        },
    },
});
//# sourceMappingURL=polygonZkEvmCardona.js.map