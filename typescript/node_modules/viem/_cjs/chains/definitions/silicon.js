"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.silicon = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.silicon = (0, defineChain_js_1.defineChain)({
    id: 2355,
    name: 'Silicon zkEVM',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: {
            http: [
                'https://rpc.silicon.network',
                'https://silicon-mainnet.nodeinfra.com',
            ],
        },
    },
    blockExplorers: {
        default: {
            name: 'SiliconScope',
            url: 'https://scope.silicon.network',
        },
    },
});
//# sourceMappingURL=silicon.js.map