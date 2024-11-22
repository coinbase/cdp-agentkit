"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.artelaTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.artelaTestnet = (0, defineChain_js_1.defineChain)({
    id: 11822,
    name: 'Artela Testnet',
    nativeCurrency: { name: 'ART', symbol: 'ART', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://betanet-rpc1.artela.network'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Artela',
            url: 'https://betanet-scan.artela.network',
            apiUrl: 'https://betanet-scan.artela.network/api',
        },
    },
    contracts: {
        multicall3: {
            address: '0xd07c8635f76e8745Ee7092fbb6e8fbc5FeF09DD7',
            blockCreated: 7001871,
        },
    },
    testnet: true,
});
//# sourceMappingURL=artelaTestnet.js.map