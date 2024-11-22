"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bronosTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.bronosTestnet = (0, defineChain_js_1.defineChain)({
    id: 1038,
    name: 'Bronos Testnet',
    nativeCurrency: {
        decimals: 18,
        name: 'Bronos Coin',
        symbol: 'tBRO',
    },
    rpcUrls: {
        default: { http: ['https://evm-testnet.bronos.org'] },
    },
    blockExplorers: {
        default: {
            name: 'BronoScan',
            url: 'https://tbroscan.bronos.org',
        },
    },
    testnet: true,
});
//# sourceMappingURL=bronosTestnet.js.map