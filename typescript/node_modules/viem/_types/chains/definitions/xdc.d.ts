export declare const xdc: {
    blockExplorers: {
        readonly default: {
            readonly name: "XDCScan";
            readonly url: "https://xdcscan.com";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0x0B1795ccA8E4eC4df02346a082df54D437F8D9aF";
            readonly blockCreated: 75884020;
        };
    };
    id: 50;
    name: "XinFin Network";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "XDC";
        readonly symbol: "XDC";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.xdcrpc.com"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=xdc.d.ts.map