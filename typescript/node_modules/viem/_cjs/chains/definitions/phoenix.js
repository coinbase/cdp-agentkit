"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.phoenix = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.phoenix = (0, defineChain_js_1.defineChain)({
    id: 13381,
    name: 'Phoenix Blockchain',
    nativeCurrency: { name: 'Phoenix', symbol: 'PHX', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://rpc.phoenixplorer.com'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Phoenixplorer',
            url: 'https://phoenixplorer.com',
            apiUrl: 'https://phoenixplorer.com/api',
        },
    },
    contracts: {
        multicall3: {
            address: '0x498cF757a575cFF2c2Ed9f532f56Efa797f86442',
            blockCreated: 5620192,
        },
    },
});
//# sourceMappingURL=phoenix.js.map