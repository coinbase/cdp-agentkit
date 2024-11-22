"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playfiAlbireo = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
const chainConfig_js_1 = require("../../zksync/chainConfig.js");
exports.playfiAlbireo = (0, defineChain_js_1.defineChain)({
    ...chainConfig_js_1.chainConfig,
    id: 1_612_127,
    name: 'PlayFi Albireo Testnet',
    network: 'albireo',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://albireo-rpc.playfi.ai'],
            webSocket: ['wss://albireo-rpc-ws.playfi.ai/ws'],
        },
    },
    blockExplorers: {
        default: {
            name: 'PlayFi Albireo Explorer',
            url: 'https://albireo-explorer.playfi.ai',
        },
    },
    contracts: {
        multicall3: {
            address: '0xF9cda624FBC7e059355ce98a31693d299FACd963',
        },
    },
    testnet: true,
});
//# sourceMappingURL=playfiAlbireo.js.map