export declare const opBNB: {
    blockExplorers: {
        readonly default: {
            readonly name: "opBNB (BSCScan)";
            readonly url: "https://opbnb.bscscan.com";
            readonly apiUrl: "https://api-opbnb.bscscan.com/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xcA11bde05977b3631167028862bE2a173976CA11";
            readonly blockCreated: 512881;
        };
        readonly l2OutputOracle: {
            readonly 56: {
                readonly address: "0x153CAB79f4767E2ff862C94aa49573294B13D169";
            };
        };
        readonly portal: {
            readonly 56: {
                readonly address: "0x1876EA7702C0ad0C6A2ae6036DE7733edfBca519";
            };
        };
        readonly l1StandardBridge: {
            readonly 56: {
                readonly address: "0xF05F0e4362859c3331Cb9395CBC201E3Fa6757Ea";
            };
        };
        readonly gasPriceOracle: {
            readonly address: "0x420000000000000000000000000000000000000F";
        };
        readonly l1Block: {
            readonly address: "0x4200000000000000000000000000000000000015";
        };
        readonly l2CrossDomainMessenger: {
            readonly address: "0x4200000000000000000000000000000000000007";
        };
        readonly l2Erc721Bridge: {
            readonly address: "0x4200000000000000000000000000000000000014";
        };
        readonly l2StandardBridge: {
            readonly address: "0x4200000000000000000000000000000000000010";
        };
        readonly l2ToL1MessagePasser: {
            readonly address: "0x4200000000000000000000000000000000000016";
        };
    };
    id: 204;
    name: "opBNB";
    nativeCurrency: {
        readonly name: "BNB";
        readonly symbol: "BNB";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://opbnb-mainnet-rpc.bnbchain.org"];
        };
    };
    sourceId: 56;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=opBNB.d.ts.map