"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nautilus = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.nautilus = (0, defineChain_js_1.defineChain)({
    id: 22222,
    name: 'Nautilus Mainnet',
    nativeCurrency: { name: 'ZBC', symbol: 'ZBC', decimals: 9 },
    rpcUrls: {
        default: {
            http: ['https://api.nautilus.nautchain.xyz'],
        },
    },
    blockExplorers: {
        default: {
            name: 'NautScan',
            url: 'https://nautscan.com',
        },
    },
});
//# sourceMappingURL=nautilus.js.map