"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taikoKatla = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.taikoKatla = (0, defineChain_js_1.defineChain)({
    id: 167008,
    name: 'Taiko Katla (Alpha-6 Testnet)',
    network: 'tko-katla',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://rpc.katla.taiko.xyz'],
        },
    },
    blockExplorers: {
        default: {
            name: 'blockscout',
            url: 'https://explorer.katla.taiko.xyz',
        },
    },
});
//# sourceMappingURL=taikoKatla.js.map