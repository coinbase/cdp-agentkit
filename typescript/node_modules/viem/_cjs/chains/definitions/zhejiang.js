"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zhejiang = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.zhejiang = (0, defineChain_js_1.defineChain)({
    id: 1_337_803,
    name: 'Zhejiang',
    nativeCurrency: { name: 'Zhejiang Ether', symbol: 'ZhejETH', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://rpc.zhejiang.ethpandaops.io'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Beaconchain',
            url: 'https://zhejiang.beaconcha.in',
        },
    },
    testnet: true,
});
//# sourceMappingURL=zhejiang.js.map