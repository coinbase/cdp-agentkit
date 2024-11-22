export declare const manta: {
    blockExplorers: {
        readonly default: {
            readonly name: "Manta Explorer";
            readonly url: "https://pacific-explorer.manta.network";
            readonly apiUrl: "https://pacific-explorer.manta.network/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xcA11bde05977b3631167028862bE2a173976CA11";
            readonly blockCreated: 332890;
        };
    };
    id: 169;
    name: "Manta Pacific Mainnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "ETH";
        readonly symbol: "ETH";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://pacific-rpc.manta.network/http"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
    readonly network: "manta";
};
//# sourceMappingURL=manta.d.ts.map