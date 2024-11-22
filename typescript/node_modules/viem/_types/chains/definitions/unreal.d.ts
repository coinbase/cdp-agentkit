export declare const unreal: {
    blockExplorers: {
        readonly default: {
            readonly name: "Unreal Explorer";
            readonly url: "https://unreal.blockscout.com";
            readonly apiUrl: "https://unreal.blockscout.com/api/v2";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0x8b6B0e60D8CD84898Ea8b981065A12F876eA5677";
            readonly blockCreated: 1745;
        };
    };
    id: 18233;
    name: "Unreal";
    nativeCurrency: {
        readonly name: "reETH";
        readonly decimals: 18;
        readonly symbol: "reETH";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.unreal-orbit.gelato.digital"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=unreal.d.ts.map