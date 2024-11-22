"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.energy = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.energy = (0, defineChain_js_1.defineChain)({
    id: 246,
    name: 'Energy Mainnet',
    nativeCurrency: { name: 'EWT', symbol: 'EWT', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://rpc.energyweb.org'],
        },
    },
    blockExplorers: {
        default: {
            name: 'EnergyWeb Explorer',
            url: 'https://explorer.energyweb.org',
        },
    },
    testnet: false,
});
//# sourceMappingURL=energy.js.map