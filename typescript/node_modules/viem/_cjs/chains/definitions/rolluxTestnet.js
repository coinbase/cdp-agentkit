"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rolluxTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.rolluxTestnet = (0, defineChain_js_1.defineChain)({
    id: 57000,
    name: 'Rollux Testnet',
    nativeCurrency: {
        decimals: 18,
        name: 'Syscoin',
        symbol: 'SYS',
    },
    rpcUrls: {
        default: {
            http: ['https://rpc-tanenbaum.rollux.com/'],
            webSocket: ['wss://rpc-tanenbaum.rollux.com/wss'],
        },
    },
    blockExplorers: {
        default: {
            name: 'RolluxTestnetExplorer',
            url: 'https://rollux.tanenbaum.io',
            apiUrl: 'https://rollux.tanenbaum.io/api',
        },
    },
    contracts: {
        multicall3: {
            address: '0xcA11bde05977b3631167028862bE2a173976CA11',
            blockCreated: 1813675,
        },
    },
});
//# sourceMappingURL=rolluxTestnet.js.map