"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tron = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.tron = (0, defineChain_js_1.defineChain)({
    id: 728126428,
    name: 'Tron',
    nativeCurrency: { name: 'TRON', symbol: 'TRX', decimals: 6 },
    rpcUrls: {
        default: {
            http: ['https://api.trongrid.io/jsonrpc'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Tronscan',
            url: 'https://tronscan.org',
            apiUrl: 'https://apilist.tronscanapi.com/api',
        },
    },
});
//# sourceMappingURL=tron.js.map