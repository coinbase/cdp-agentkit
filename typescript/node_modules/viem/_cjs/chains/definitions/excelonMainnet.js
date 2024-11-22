"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.excelonMainnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.excelonMainnet = (0, defineChain_js_1.defineChain)({
    id: 22052002,
    name: 'Excelon Mainnet',
    network: 'XLON',
    nativeCurrency: {
        decimals: 18,
        name: 'Excelon',
        symbol: 'xlon',
    },
    rpcUrls: {
        default: {
            http: ['https://edgewallet1.xlon.org'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Excelon explorer',
            url: 'https://explorer.excelon.io',
        },
    },
});
//# sourceMappingURL=excelonMainnet.js.map