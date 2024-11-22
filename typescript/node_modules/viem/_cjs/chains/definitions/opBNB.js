"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.opBNB = void 0;
const chainConfig_js_1 = require("../../op-stack/chainConfig.js");
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
const sourceId = 56;
exports.opBNB = (0, defineChain_js_1.defineChain)({
    id: 204,
    name: 'opBNB',
    nativeCurrency: {
        name: 'BNB',
        symbol: 'BNB',
        decimals: 18,
    },
    rpcUrls: {
        default: { http: ['https://opbnb-mainnet-rpc.bnbchain.org'] },
    },
    blockExplorers: {
        default: {
            name: 'opBNB (BSCScan)',
            url: 'https://opbnb.bscscan.com',
            apiUrl: 'https://api-opbnb.bscscan.com/api',
        },
    },
    contracts: {
        ...chainConfig_js_1.chainConfig.contracts,
        multicall3: {
            address: '0xcA11bde05977b3631167028862bE2a173976CA11',
            blockCreated: 512881,
        },
        l2OutputOracle: {
            [sourceId]: {
                address: '0x153CAB79f4767E2ff862C94aa49573294B13D169',
            },
        },
        portal: {
            [sourceId]: {
                address: '0x1876EA7702C0ad0C6A2ae6036DE7733edfBca519',
            },
        },
        l1StandardBridge: {
            [sourceId]: {
                address: '0xF05F0e4362859c3331Cb9395CBC201E3Fa6757Ea',
            },
        },
    },
    sourceId,
});
//# sourceMappingURL=opBNB.js.map