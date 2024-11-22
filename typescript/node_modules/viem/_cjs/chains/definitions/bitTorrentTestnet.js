"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bitTorrentTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.bitTorrentTestnet = (0, defineChain_js_1.defineChain)({
    id: 1028,
    name: 'BitTorrent Chain Testnet',
    network: 'bittorrent-chain-testnet',
    nativeCurrency: { name: 'BitTorrent', symbol: 'BTT', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://testrpc.bittorrentchain.io'] },
    },
    blockExplorers: {
        default: {
            name: 'Bttcscan',
            url: 'https://testnet.bttcscan.com',
            apiUrl: 'https://testnet.bttcscan.com/api',
        },
    },
    testnet: true,
});
//# sourceMappingURL=bitTorrentTestnet.js.map