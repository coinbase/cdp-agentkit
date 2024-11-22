"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zenchainTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.zenchainTestnet = (0, defineChain_js_1.defineChain)({
    id: 8408,
    name: 'Zenchain Testnet',
    nativeCurrency: {
        decimals: 18,
        name: 'ZCX',
        symbol: 'ZCX',
    },
    rpcUrls: {
        default: {
            http: ['https://zenchain-testnet.api.onfinality.io/public'],
            webSocket: ['wss://zenchain-testnet.api.onfinality.io/public-ws'],
        },
    },
    contracts: {
        multicall3: {
            address: '0xcA11bde05977b3631167028862bE2a173976CA11',
            blockCreated: 230019,
        },
    },
    blockExplorers: {
        default: {
            name: 'Zentrace',
            url: 'https://zentrace.io',
        },
    },
    testnet: true,
});
//# sourceMappingURL=zenchainTestnet.js.map