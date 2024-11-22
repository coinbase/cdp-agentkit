export declare const confluxESpace: {
    blockExplorers: {
        readonly default: {
            readonly name: "ConfluxScan";
            readonly url: "https://evm.confluxscan.io";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xEFf0078910f638cd81996cc117bccD3eDf2B072F";
            readonly blockCreated: 68602935;
        };
    };
    id: 1030;
    name: "Conflux eSpace";
    nativeCurrency: {
        readonly name: "Conflux";
        readonly symbol: "CFX";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://evm.confluxrpc.com"];
            readonly webSocket: readonly ["wss://evm.confluxrpc.com/ws"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=confluxESpace.d.ts.map