export declare const coreDao: {
    blockExplorers: {
        readonly default: {
            readonly name: "CoreDao";
            readonly url: "https://scan.coredao.org";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xcA11bde05977b3631167028862bE2a173976CA11";
            readonly blockCreated: 11907934;
        };
    };
    id: 1116;
    name: "Core Dao";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Core";
        readonly symbol: "CORE";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.coredao.org"];
        };
    };
    sourceId?: number | undefined;
    testnet: false;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=coreDao.d.ts.map