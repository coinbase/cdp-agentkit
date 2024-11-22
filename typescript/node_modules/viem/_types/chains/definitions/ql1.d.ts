export declare const ql1: {
    blockExplorers: {
        readonly default: {
            readonly name: "Ql1 Explorer";
            readonly url: "https://scan.qom.one";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0x7A52370716ea730585884F5BDB0f6E60C39b8C64";
        };
    };
    id: 766;
    name: "QL1";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "QOM";
        readonly symbol: "QOM";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.qom.one"];
        };
    };
    sourceId?: number | undefined;
    testnet: false;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=ql1.d.ts.map