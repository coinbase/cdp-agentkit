"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.atletaOlympia = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.atletaOlympia = (0, defineChain_js_1.defineChain)({
    id: 2340,
    name: 'Atleta Olympia',
    nativeCurrency: { decimals: 18, name: 'Atla', symbol: 'ATLA' },
    rpcUrls: {
        default: {
            http: [
                'https://testnet-rpc.atleta.network:9944',
                'https://testnet-rpc.atleta.network',
            ],
            ws: ['wss://testnet-rpc.atleta.network:9944'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Atleta Olympia Explorer',
            url: 'https://blockscout.atleta.network',
            apiUrl: 'https://blockscout.atleta.network/api',
        },
    },
    contracts: {
        multicall3: {
            address: '0x1472ec6392180fb84F345d2455bCC75B26577115',
            blockCreated: 1076473,
        },
    },
    testnet: true,
});
//# sourceMappingURL=atletaOlympia.js.map