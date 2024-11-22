"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oasisTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.oasisTestnet = (0, defineChain_js_1.defineChain)({
    id: 4090,
    network: 'oasis-testnet',
    name: 'Oasis Testnet',
    nativeCurrency: { name: 'Fasttoken', symbol: 'FTN', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://rpc1.oasis.bahamutchain.com'] },
    },
    blockExplorers: {
        default: {
            name: 'Ftnscan',
            url: 'https://oasis.ftnscan.com',
            apiUrl: 'https://oasis.ftnscan.com/api',
        },
    },
    testnet: true,
});
//# sourceMappingURL=oasisTestnet.js.map