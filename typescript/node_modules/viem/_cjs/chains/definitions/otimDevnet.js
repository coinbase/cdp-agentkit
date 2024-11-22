"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otimDevnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.otimDevnet = (0, defineChain_js_1.defineChain)({
    id: 41144114,
    name: 'Otim Devnet',
    nativeCurrency: {
        decimals: 18,
        name: 'ETH',
        symbol: 'ETH',
    },
    rpcUrls: {
        default: {
            http: ['http://devnet.otim.xyz'],
        },
    },
    contracts: {
        batchInvoker: {
            address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
        },
    },
});
//# sourceMappingURL=otimDevnet.js.map