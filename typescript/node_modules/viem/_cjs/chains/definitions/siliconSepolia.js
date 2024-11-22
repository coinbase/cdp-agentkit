"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.siliconSepolia = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.siliconSepolia = (0, defineChain_js_1.defineChain)({
    id: 1722641160,
    name: 'Silicon Sepolia zkEVM',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: {
            http: [
                'https://rpc-sepolia.silicon.network',
                'https://silicon-testnet.nodeinfra.com',
            ],
        },
    },
    blockExplorers: {
        default: {
            name: 'SiliconSepoliaScope',
            url: 'https://scope-sepolia.silicon.network',
        },
    },
    testnet: true,
});
//# sourceMappingURL=siliconSepolia.js.map