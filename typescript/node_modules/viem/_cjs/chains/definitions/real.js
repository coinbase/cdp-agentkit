"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.real = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.real = (0, defineChain_js_1.defineChain)({
    id: 111188,
    name: 're.al',
    nativeCurrency: {
        name: 'reETH',
        decimals: 18,
        symbol: 'reETH',
    },
    rpcUrls: {
        default: { http: ['https://real.drpc.org'] },
    },
    blockExplorers: {
        default: {
            name: 're.al Explorer',
            url: 'https://explorer.re.al',
            apiUrl: 'https://explorer.re.al/api/v2',
        },
    },
    contracts: {
        multicall3: {
            address: '0xcA11bde05977b3631167028862bE2a173976CA11',
            blockCreated: 695,
        },
    },
});
//# sourceMappingURL=real.js.map