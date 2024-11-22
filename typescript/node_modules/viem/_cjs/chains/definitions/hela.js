"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hela = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.hela = (0, defineChain_js_1.defineChain)({
    id: 8668,
    name: 'Hela Mainnet',
    nativeCurrency: {
        name: 'HLUSD',
        symbol: 'HLUSD',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ['https://mainnet-rpc.helachain.com'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Hela explorer',
            url: 'https://mainnet-blockexplorer.helachain.com',
        },
    },
    testnet: false,
});
//# sourceMappingURL=hela.js.map