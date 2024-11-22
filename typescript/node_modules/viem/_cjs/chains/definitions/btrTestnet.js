"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.btrTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.btrTestnet = (0, defineChain_js_1.defineChain)({
    id: 200810,
    name: 'Bitlayer Testnet',
    nativeCurrency: {
        name: 'Bitcoin',
        symbol: 'BTC',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ['https://testnet-rpc.bitlayer.org'],
            webSocket: [
                'wss://testnet-ws.bitlayer.org',
                'wss://testnet-ws.bitlayer-rpc.com',
            ],
        },
    },
    blockExplorers: {
        default: {
            name: 'Bitlayer(BTR) Scan',
            url: 'https://testnet.btrscan.com',
        },
    },
    testnet: true,
});
//# sourceMappingURL=btrTestnet.js.map