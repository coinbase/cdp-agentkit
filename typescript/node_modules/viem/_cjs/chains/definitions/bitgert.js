"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bitgert = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.bitgert = (0, defineChain_js_1.defineChain)({
    id: 32520,
    name: 'Bitgert Mainnet',
    nativeCurrency: {
        decimals: 18,
        name: 'Brise',
        symbol: 'Brise',
    },
    rpcUrls: {
        default: { http: ['https://rpc-bitgert.icecreamswap.com'] },
    },
    blockExplorers: {
        default: {
            name: 'Bitgert Scan',
            url: 'https://brisescan.com',
        },
    },
    contracts: {
        multicall3: {
            address: '0xcA11bde05977b3631167028862bE2a173976CA11',
            blockCreated: 2118034,
        },
    },
    testnet: false,
});
//# sourceMappingURL=bitgert.js.map