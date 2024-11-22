"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chips = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.chips = (0, defineChain_js_1.defineChain)({
    id: 2882,
    name: 'Chips Network',
    network: 'CHIPS',
    nativeCurrency: {
        decimals: 18,
        name: 'IOTA',
        symbol: 'IOTA',
    },
    rpcUrls: {
        default: {
            http: [
                'https://node.chips.ooo/wasp/api/v1/chains/iota1pp3d3mnap3ufmgqnjsnw344sqmf5svjh26y2khnmc89sv6788y3r207a8fn/evm',
            ],
        },
    },
});
//# sourceMappingURL=chips.js.map