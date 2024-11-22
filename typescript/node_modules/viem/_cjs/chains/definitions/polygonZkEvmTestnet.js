"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.polygonZkEvmTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.polygonZkEvmTestnet = (0, defineChain_js_1.defineChain)({
    id: 1442,
    name: 'Polygon zkEVM Testnet',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://rpc.public.zkevm-test.net'],
        },
    },
    blockExplorers: {
        default: {
            name: 'PolygonScan',
            url: 'https://testnet-zkevm.polygonscan.com',
            apiUrl: 'https://testnet-zkevm.polygonscan.com/api',
        },
    },
    testnet: true,
    contracts: {
        multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
            blockCreated: 525686,
        },
    },
});
//# sourceMappingURL=polygonZkEvmTestnet.js.map