"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fantomSonicTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.fantomSonicTestnet = (0, defineChain_js_1.defineChain)({
    id: 64_240,
    name: 'Fantom Sonic Open Testnet',
    network: 'fantom-sonic-testnet',
    nativeCurrency: {
        decimals: 18,
        name: 'Fantom',
        symbol: 'FTM',
    },
    rpcUrls: {
        default: { http: ['https://rpcapi.sonic.fantom.network'] },
    },
    blockExplorers: {
        default: {
            name: 'Fantom Sonic Open Testnet Explorer',
            url: 'https://public-sonic.fantom.network',
        },
    },
    testnet: true,
});
//# sourceMappingURL=fantomSonicTestnet.js.map