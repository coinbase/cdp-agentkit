"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confluxESpaceTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.confluxESpaceTestnet = (0, defineChain_js_1.defineChain)({
    id: 71,
    name: 'Conflux eSpace Testnet',
    network: 'cfx-espace-testnet',
    testnet: true,
    nativeCurrency: { name: 'Conflux', symbol: 'CFX', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://evmtestnet.confluxrpc.com'],
            webSocket: ['wss://evmtestnet.confluxrpc.com/ws'],
        },
    },
    blockExplorers: {
        default: {
            name: 'ConfluxScan',
            url: 'https://evmtestnet.confluxscan.io',
        },
    },
    contracts: {
        multicall3: {
            address: '0xEFf0078910f638cd81996cc117bccD3eDf2B072F',
            blockCreated: 117499050,
        },
    },
});
//# sourceMappingURL=confluxESpaceTestnet.js.map