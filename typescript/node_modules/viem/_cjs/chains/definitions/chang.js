"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chang = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.chang = (0, defineChain_js_1.defineChain)({
    id: 5858,
    name: 'Chang Chain Foundation Mainnet',
    nativeCurrency: {
        decimals: 18,
        name: 'CTH',
        symbol: 'CTH',
    },
    rpcUrls: {
        default: {
            http: ['https://rpc.cthscan.com'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Chang Chain explorer',
            url: 'https://cthscan.com',
        },
    },
});
//# sourceMappingURL=chang.js.map