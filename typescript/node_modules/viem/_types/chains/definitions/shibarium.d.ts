export declare const shibarium: {
    blockExplorers: {
        readonly default: {
            readonly name: "Blockscout";
            readonly url: "https://shibariumscan.io";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0x864Bf681ADD6052395188A89101A1B37d3B4C961";
            readonly blockCreated: 265900;
        };
    };
    id: 109;
    name: "Shibarium";
    nativeCurrency: {
        readonly name: "Bone";
        readonly symbol: "BONE";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.shibrpc.com"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
    readonly network: "shibarium";
};
//# sourceMappingURL=shibarium.d.ts.map