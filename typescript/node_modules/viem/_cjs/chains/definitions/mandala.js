"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mandala = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.mandala = (0, defineChain_js_1.defineChain)({
    id: 595,
    name: 'Mandala TC9',
    network: 'mandala',
    nativeCurrency: {
        name: 'Mandala',
        symbol: 'mACA',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ['https://eth-rpc-tc9.aca-staging.network'],
            webSocket: ['wss://eth-rpc-tc9.aca-staging.network'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Mandala Blockscout',
            url: 'https://blockscout.mandala.aca-staging.network',
            apiUrl: 'https://blockscout.mandala.aca-staging.network/api',
        },
    },
    testnet: true,
});
//# sourceMappingURL=mandala.js.map