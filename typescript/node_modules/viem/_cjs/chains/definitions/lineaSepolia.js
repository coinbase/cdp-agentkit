"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lineaSepolia = void 0;
const chainConfig_js_1 = require("../../linea/chainConfig.js");
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.lineaSepolia = (0, defineChain_js_1.defineChain)({
    ...chainConfig_js_1.chainConfig,
    id: 59_141,
    name: 'Linea Sepolia Testnet',
    nativeCurrency: { name: 'Linea Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://rpc.sepolia.linea.build'],
            webSocket: ['wss://rpc.sepolia.linea.build'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Etherscan',
            url: 'https://sepolia.lineascan.build',
            apiUrl: 'https://api-sepolia.lineascan.build/api',
        },
    },
    contracts: {
        multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
            blockCreated: 227427,
        },
    },
    testnet: true,
});
//# sourceMappingURL=lineaSepolia.js.map