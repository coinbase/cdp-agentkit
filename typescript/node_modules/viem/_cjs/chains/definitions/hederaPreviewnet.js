"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hederaPreviewnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.hederaPreviewnet = (0, defineChain_js_1.defineChain)({
    id: 297,
    name: 'Hedera Previewnet',
    network: 'hedera-previewnet',
    nativeCurrency: {
        symbol: 'HBAR',
        name: 'HBAR',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ['https://previewnet.hashio.io/api'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Hashscan',
            url: 'https://hashscan.io/previewnet',
        },
    },
    testnet: true,
});
//# sourceMappingURL=hederaPreviewnet.js.map