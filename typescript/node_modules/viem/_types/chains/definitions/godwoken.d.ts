export declare const godwoken: {
    blockExplorers: {
        readonly default: {
            readonly name: "GW Scan";
            readonly url: "https://v1.gwscan.com";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xcA11bde05977b3631167028862bE2a173976CA11";
            readonly blockCreated: 15034;
        };
    };
    id: 71402;
    name: "Godwoken Mainnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "pCKB";
        readonly symbol: "pCKB";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://v1.mainnet.godwoken.io/rpc"];
        };
    };
    sourceId?: number | undefined;
    testnet: false;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=godwoken.d.ts.map