export declare const beam: {
    blockExplorers: {
        readonly default: {
            readonly name: "Beam Explorer";
            readonly url: "https://subnets.avax.network/beam";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0x4956f15efdc3dc16645e90cc356eafa65ffc65ec";
            readonly blockCreated: 1;
        };
    };
    id: 4337;
    name: "Beam";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Beam";
        readonly symbol: "BEAM";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://build.onbeam.com/rpc"];
            readonly webSocket: readonly ["wss://build.onbeam.com/ws"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
    readonly network: "beam";
};
//# sourceMappingURL=beam.d.ts.map