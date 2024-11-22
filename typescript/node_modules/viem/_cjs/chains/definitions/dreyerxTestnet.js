"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dreyerxTestnet = void 0;
const utils_js_1 = require("../utils.js");
exports.dreyerxTestnet = (0, utils_js_1.defineChain)({
    id: 23452,
    name: 'DreyerX Testnet',
    nativeCurrency: {
        name: 'DreyerX',
        symbol: 'DRX',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ['http://testnet-rpc.dreyerx.com'],
        },
    },
    blockExplorers: {
        default: {
            name: 'DreyerX Testnet Scan',
            url: 'https://testnet-scan.dreyerx.com',
        },
    },
    testnet: true,
});
//# sourceMappingURL=dreyerxTestnet.js.map