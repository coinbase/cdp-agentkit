export declare const fantomTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "FTMScan";
            readonly url: "https://testnet.ftmscan.com";
            readonly apiUrl: "https://testnet.ftmscan.com/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 8328688;
        };
    };
    id: 4002;
    name: "Fantom Testnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Fantom";
        readonly symbol: "FTM";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.testnet.fantom.network"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=fantomTestnet.d.ts.map