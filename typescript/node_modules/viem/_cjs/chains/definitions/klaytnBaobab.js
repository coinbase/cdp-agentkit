"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.klaytnBaobab = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.klaytnBaobab = (0, defineChain_js_1.defineChain)({
    id: 1_001,
    name: 'Klaytn Baobab Testnet',
    network: 'klaytn-baobab',
    nativeCurrency: {
        decimals: 18,
        name: 'Baobab Klaytn',
        symbol: 'KLAY',
    },
    rpcUrls: {
        default: { http: ['https://public-en-baobab.klaytn.net'] },
    },
    blockExplorers: {
        default: {
            name: 'KlaytnScope',
            url: 'https://baobab.klaytnscope.com',
        },
    },
    contracts: {
        multicall3: {
            address: '0xcA11bde05977b3631167028862bE2a173976CA11',
            blockCreated: 123390593,
        },
    },
    testnet: true,
});
//# sourceMappingURL=klaytnBaobab.js.map