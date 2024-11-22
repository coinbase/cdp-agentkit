"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.thetaTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.thetaTestnet = (0, defineChain_js_1.defineChain)({
    id: 365,
    name: 'Theta Testnet',
    nativeCurrency: { name: 'TFUEL', symbol: 'TFUEL', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://eth-rpc-api-testnet.thetatoken.org/rpc'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Theta Explorer',
            url: 'https://testnet-explorer.thetatoken.org',
        },
    },
    testnet: true,
});
//# sourceMappingURL=thetaTestnet.js.map