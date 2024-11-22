"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fluenceStage = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.fluenceStage = (0, defineChain_js_1.defineChain)({
    id: 123_420_000_220,
    name: 'Fluence Stage',
    nativeCurrency: { name: 'tFLT', symbol: 'tFLT', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://rpc.stage.fluence.dev'],
            webSocket: ['wss://ws.stage.fluence.dev'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Blockscout',
            url: 'https://blockscout.stage.fluence.dev',
            apiUrl: 'https://blockscout.stage.fluence.dev/api',
        },
    },
    testnet: true,
});
//# sourceMappingURL=fluenceStage.js.map