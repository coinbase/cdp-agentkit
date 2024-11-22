export declare const metis: {
    blockExplorers: {
        readonly default: {
            readonly name: "Metis Explorer";
            readonly url: "https://explorer.metis.io";
            readonly apiUrl: "https://api.routescan.io/v2/network/mainnet/evm/1088/etherscan/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 2338552;
        };
    };
    id: 1088;
    name: "Metis";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Metis";
        readonly symbol: "METIS";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://andromeda.metis.io/?owner=1088"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=metis.d.ts.map