export declare const dfk: {
    blockExplorers: {
        readonly default: {
            readonly name: "DFKSubnetScan";
            readonly url: "https://subnets.avax.network/defi-kingdoms";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 14790551;
        };
    };
    id: 53935;
    name: "DFK Chain";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Jewel";
        readonly symbol: "JEWEL";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://subnets.avax.network/defi-kingdoms/dfk-chain/rpc"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=dfk.d.ts.map