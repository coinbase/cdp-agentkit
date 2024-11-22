"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xdcTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.xdcTestnet = (0, defineChain_js_1.defineChain)({
    id: 51,
    name: 'Apothem Network',
    nativeCurrency: {
        decimals: 18,
        name: 'TXDC',
        symbol: 'TXDC',
    },
    rpcUrls: {
        default: { http: ['https://erpc.apothem.network'] },
    },
    blockExplorers: {
        default: {
            name: 'XDCScan',
            url: 'https://testnet.xdcscan.com',
        },
    },
    contracts: {
        multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
            blockCreated: 59765389,
        },
    },
});
//# sourceMappingURL=xdcTestnet.js.map