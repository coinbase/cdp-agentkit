"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lightlinkPegasus = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.lightlinkPegasus = (0, defineChain_js_1.defineChain)({
    id: 1_891,
    name: 'LightLink Pegasus Testnet',
    network: 'lightlink-pegasus',
    nativeCurrency: {
        decimals: 18,
        name: 'Ether',
        symbol: 'ETH',
    },
    rpcUrls: {
        default: {
            http: ['https://replicator.pegasus.lightlink.io/rpc/v1'],
        },
    },
    blockExplorers: {
        default: {
            name: 'LightLink Pegasus Explorer',
            url: 'https://pegasus.lightlink.io',
        },
    },
    testnet: true,
});
//# sourceMappingURL=lightlinkPegasus.js.map