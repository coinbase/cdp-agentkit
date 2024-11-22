"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sapphire = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.sapphire = (0, defineChain_js_1.defineChain)({
    id: 23294,
    name: 'Oasis Sapphire',
    network: 'sapphire',
    nativeCurrency: { name: 'Sapphire Rose', symbol: 'ROSE', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://sapphire.oasis.io'],
            webSocket: ['wss://sapphire.oasis.io/ws'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Oasis Explorer',
            url: 'https://explorer.oasis.io/mainnet/sapphire',
        },
    },
    contracts: {
        multicall3: {
            address: '0xcA11bde05977b3631167028862bE2a173976CA11',
            blockCreated: 734531,
        },
    },
});
//# sourceMappingURL=sapphire.js.map