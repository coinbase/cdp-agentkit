"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bscGreenfield = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.bscGreenfield = (0, defineChain_js_1.defineChain)({
    id: 1017,
    name: 'BNB Greenfield Chain',
    nativeCurrency: {
        decimals: 18,
        name: 'BNB',
        symbol: 'BNB',
    },
    rpcUrls: {
        default: { http: ['https://greenfield-chain.bnbchain.org'] },
    },
    blockExplorers: {
        default: {
            name: 'BNB Greenfield Mainnet Scan',
            url: 'https://greenfieldscan.com',
        },
    },
    testnet: false,
});
//# sourceMappingURL=bscGreenfield.js.map