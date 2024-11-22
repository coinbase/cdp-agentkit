"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taraxaTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.taraxaTestnet = (0, defineChain_js_1.defineChain)({
    id: 842,
    name: 'Taraxa Testnet',
    nativeCurrency: { name: 'Tara', symbol: 'TARA', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://rpc.testnet.taraxa.io'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Taraxa Explorer',
            url: 'https://explorer.testnet.taraxa.io',
        },
    },
    testnet: true,
});
//# sourceMappingURL=taraxaTestnet.js.map