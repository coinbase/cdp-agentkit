export declare const fantom: {
    blockExplorers: {
        readonly default: {
            readonly name: "FTMScan";
            readonly url: "https://ftmscan.com";
            readonly apiUrl: "https://api.ftmscan.com/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 33001987;
        };
    };
    id: 250;
    name: "Fantom";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Fantom";
        readonly symbol: "FTM";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.ankr.com/fantom"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=fantom.d.ts.map