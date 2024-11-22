"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sixProtocol = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.sixProtocol = (0, defineChain_js_1.defineChain)({
    id: 98,
    name: 'Six Protocol',
    nativeCurrency: {
        decimals: 18,
        name: 'SIX',
        symbol: 'SIX',
    },
    rpcUrls: {
        default: {
            http: ['https://sixnet-rpc-evm.sixprotocol.net'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Six Protocol Scan',
            url: 'https://sixscan.io/sixnet',
        },
    },
    testnet: false,
});
//# sourceMappingURL=sixProtocol.js.map