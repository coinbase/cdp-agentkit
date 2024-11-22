"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sophon = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
const chainConfig_js_1 = require("../../zksync/chainConfig.js");
exports.sophon = (0, defineChain_js_1.defineChain)({
    ...chainConfig_js_1.chainConfig,
    id: 50104,
    name: 'Sophon',
    nativeCurrency: {
        decimals: 18,
        name: 'Sophon',
        symbol: 'SOPH',
    },
    rpcUrls: {
        default: {
            http: ['https://rpc.sophon.xyz'],
            webSocket: ['wss://rpc.sophon.xyz/ws'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Sophon Block Explorer',
            url: 'https://explorer.sophon.xyz',
        },
    },
    contracts: {
        multicall3: {
            address: '0x5f4867441d2416cA88B1b3fd38f21811680CD2C8',
            blockCreated: 116,
        },
    },
    testnet: false,
});
//# sourceMappingURL=sophon.js.map