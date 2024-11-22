"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.beam = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.beam = (0, defineChain_js_1.defineChain)({
    id: 4337,
    name: 'Beam',
    network: 'beam',
    nativeCurrency: {
        decimals: 18,
        name: 'Beam',
        symbol: 'BEAM',
    },
    rpcUrls: {
        default: {
            http: ['https://build.onbeam.com/rpc'],
            webSocket: ['wss://build.onbeam.com/ws'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Beam Explorer',
            url: 'https://subnets.avax.network/beam',
        },
    },
    contracts: {
        multicall3: {
            address: '0x4956f15efdc3dc16645e90cc356eafa65ffc65ec',
            blockCreated: 1,
        },
    },
});
//# sourceMappingURL=beam.js.map