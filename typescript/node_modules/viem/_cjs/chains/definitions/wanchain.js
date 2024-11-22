"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wanchain = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.wanchain = (0, defineChain_js_1.defineChain)({
    id: 888,
    name: 'Wanchain',
    nativeCurrency: { name: 'WANCHAIN', symbol: 'WAN', decimals: 18 },
    rpcUrls: {
        default: {
            http: [
                'https://gwan-ssl.wandevs.org:56891',
                'https://gwan2-ssl.wandevs.org',
            ],
        },
    },
    blockExplorers: {
        default: {
            name: 'WanScan',
            url: 'https://wanscan.org',
        },
    },
    contracts: {
        multicall3: {
            address: '0xcDF6A1566e78EB4594c86Fe73Fcdc82429e97fbB',
            blockCreated: 25312390,
        },
    },
});
//# sourceMappingURL=wanchain.js.map