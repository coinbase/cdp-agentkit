"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.worldchain = void 0;
const chainConfig_js_1 = require("../../op-stack/chainConfig.js");
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
const sourceId = 1;
exports.worldchain = (0, defineChain_js_1.defineChain)({
    ...chainConfig_js_1.chainConfig,
    id: 480,
    name: 'World Chain',
    network: 'worldchain',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://worldchain-mainnet.g.alchemy.com/public'] },
    },
    blockExplorers: {
        default: {
            name: 'Worldscan',
            url: 'https://worldscan.org',
            apiUrl: 'https://api.worldscan.org/api',
        },
        blockscout: {
            name: 'Blockscout',
            url: 'https://worldchain-mainnet.explorer.alchemy.com',
            apiUrl: 'https://worldchain-mainnet.explorer.alchemy.com/api',
        },
    },
    contracts: {
        ...chainConfig_js_1.chainConfig.contracts,
        multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
            blockCreated: 0,
        },
        disputeGameFactory: {
            [sourceId]: {
                address: '0x0E90dCAFBC242D2C861A20Bb20EC8E7182965a52',
            },
        },
        l2OutputOracle: {
            [sourceId]: {
                address: '0x19A6d1E9034596196295CF148509796978343c5D',
            },
        },
        portal: {
            [sourceId]: {
                address: '0xd5ec14a83B7d95BE1E2Ac12523e2dEE12Cbeea6C',
            },
        },
        l1StandardBridge: {
            [sourceId]: {
                address: '0x470458C91978D2d929704489Ad730DC3E3001113',
            },
        },
    },
    testnet: false,
    sourceId,
});
//# sourceMappingURL=worldchain.js.map