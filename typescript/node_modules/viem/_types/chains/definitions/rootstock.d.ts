export declare const rootstock: {
    blockExplorers: {
        readonly default: {
            readonly name: "RSK Explorer";
            readonly url: "https://explorer.rsk.co";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xcA11bde05977b3631167028862bE2a173976CA11";
            readonly blockCreated: 4249540;
        };
    };
    id: 30;
    name: "Rootstock Mainnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Rootstock Bitcoin";
        readonly symbol: "RBTC";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://public-node.rsk.co"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
    readonly network: "rootstock";
};
//# sourceMappingURL=rootstock.d.ts.map