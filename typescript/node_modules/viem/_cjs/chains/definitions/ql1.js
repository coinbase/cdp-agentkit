"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ql1 = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.ql1 = (0, defineChain_js_1.defineChain)({
    id: 766,
    name: 'QL1',
    nativeCurrency: {
        decimals: 18,
        name: 'QOM',
        symbol: 'QOM',
    },
    rpcUrls: {
        default: {
            http: ['https://rpc.qom.one'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Ql1 Explorer',
            url: 'https://scan.qom.one',
        },
    },
    contracts: {
        multicall3: {
            address: '0x7A52370716ea730585884F5BDB0f6E60C39b8C64',
        },
    },
    testnet: false,
});
//# sourceMappingURL=ql1.js.map