export declare const real: {
    blockExplorers: {
        readonly default: {
            readonly name: "re.al Explorer";
            readonly url: "https://explorer.re.al";
            readonly apiUrl: "https://explorer.re.al/api/v2";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xcA11bde05977b3631167028862bE2a173976CA11";
            readonly blockCreated: 695;
        };
    };
    id: 111188;
    name: "re.al";
    nativeCurrency: {
        readonly name: "reETH";
        readonly decimals: 18;
        readonly symbol: "reETH";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://real.drpc.org"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=real.d.ts.map