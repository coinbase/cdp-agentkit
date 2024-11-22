"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.linea = void 0;
const chainConfig_js_1 = require("../../linea/chainConfig.js");
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.linea = (0, defineChain_js_1.defineChain)({
    ...chainConfig_js_1.chainConfig,
    id: 59_144,
    name: 'Linea Mainnet',
    nativeCurrency: { name: 'Linea Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://rpc.linea.build'],
            webSocket: ['wss://rpc.linea.build'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Etherscan',
            url: 'https://lineascan.build',
            apiUrl: 'https://api.lineascan.build/api',
        },
    },
    contracts: {
        multicall3: {
            address: '0xcA11bde05977b3631167028862bE2a173976CA11',
            blockCreated: 42,
        },
    },
    testnet: false,
});
//# sourceMappingURL=linea.js.map