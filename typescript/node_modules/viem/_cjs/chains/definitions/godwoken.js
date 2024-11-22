"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.godwoken = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.godwoken = (0, defineChain_js_1.defineChain)({
    id: 71402,
    name: 'Godwoken Mainnet',
    nativeCurrency: { decimals: 18, name: 'pCKB', symbol: 'pCKB' },
    rpcUrls: {
        default: {
            http: ['https://v1.mainnet.godwoken.io/rpc'],
        },
    },
    blockExplorers: {
        default: {
            name: 'GW Scan',
            url: 'https://v1.gwscan.com',
        },
    },
    contracts: {
        multicall3: {
            address: '0xcA11bde05977b3631167028862bE2a173976CA11',
            blockCreated: 15034,
        },
    },
    testnet: false,
});
//# sourceMappingURL=godwoken.js.map