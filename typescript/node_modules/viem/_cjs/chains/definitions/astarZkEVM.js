"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.astarZkEVM = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.astarZkEVM = (0, defineChain_js_1.defineChain)({
    id: 3_776,
    name: 'Astar zkEVM',
    network: 'AstarZkEVM',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://rpc-zkevm.astar.network'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Astar zkEVM Explorer',
            url: 'https://astar-zkevm.explorer.startale.com',
        },
    },
    contracts: {
        multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
            blockCreated: 93528,
        },
    },
    testnet: false,
});
//# sourceMappingURL=astarZkEVM.js.map