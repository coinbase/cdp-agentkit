"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.funkiSepolia = void 0;
const chainConfig_js_1 = require("../../op-stack/chainConfig.js");
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
const sourceId = 11_155_111;
exports.funkiSepolia = (0, defineChain_js_1.defineChain)({
    ...chainConfig_js_1.chainConfig,
    id: 3397901,
    network: 'funkiSepolia',
    name: 'Funki Sepolia Sandbox',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://funki-testnet.alt.technology'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Funki Sepolia Sandbox Explorer',
            url: 'https://sepolia-sandbox.funkichain.com/',
        },
    },
    testnet: true,
    contracts: {
        ...chainConfig_js_1.chainConfig.contracts,
        multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
            blockCreated: 1620204,
        },
    },
    sourceId,
});
//# sourceMappingURL=funkiSepolia.js.map