"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.opBNBTestnet = void 0;
const chainConfig_js_1 = require("../../op-stack/chainConfig.js");
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
const sourceId = 97;
exports.opBNBTestnet = (0, defineChain_js_1.defineChain)({
    id: 5611,
    name: 'opBNB Testnet',
    nativeCurrency: {
        decimals: 18,
        name: 'tBNB',
        symbol: 'tBNB',
    },
    rpcUrls: {
        default: { http: ['https://opbnb-testnet-rpc.bnbchain.org'] },
    },
    blockExplorers: {
        default: {
            name: 'opbnbscan',
            url: 'https://testnet.opbnbscan.com',
        },
    },
    contracts: {
        ...chainConfig_js_1.chainConfig.contracts,
        multicall3: {
            address: '0xcA11bde05977b3631167028862bE2a173976CA11',
            blockCreated: 3705108,
        },
        l2OutputOracle: {
            [sourceId]: {
                address: '0xFf2394Bb843012562f4349C6632a0EcB92fC8810',
            },
        },
        portal: {
            [sourceId]: {
                address: '0x4386C8ABf2009aC0c263462Da568DD9d46e52a31',
            },
        },
        l1StandardBridge: {
            [sourceId]: {
                address: '0x677311Fd2cCc511Bbc0f581E8d9a07B033D5E840',
            },
        },
    },
    testnet: true,
    sourceId,
});
//# sourceMappingURL=opBNBTestnet.js.map