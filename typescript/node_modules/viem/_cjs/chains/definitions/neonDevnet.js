"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.neonDevnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.neonDevnet = (0, defineChain_js_1.defineChain)({
    id: 245_022_926,
    name: 'Neon EVM DevNet',
    nativeCurrency: { name: 'NEON', symbol: 'NEON', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://devnet.neonevm.org'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Neonscan',
            url: 'https://devnet.neonscan.org',
        },
    },
    contracts: {
        multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
            blockCreated: 205206112,
        },
    },
    testnet: true,
});
//# sourceMappingURL=neonDevnet.js.map