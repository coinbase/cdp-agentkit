export declare const iota: {
    blockExplorers: {
        readonly default: {
            readonly name: "Explorer";
            readonly url: "https://explorer.evm.iota.org";
            readonly apiUrl: "https://explorer.evm.iota.org/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xcA11bde05977b3631167028862bE2a173976CA11";
            readonly blockCreated: 25022;
        };
    };
    id: 8822;
    name: "IOTA EVM";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "IOTA";
        readonly symbol: "IOTA";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://json-rpc.evm.iotaledger.net"];
            readonly webSocket: readonly ["wss://ws.json-rpc.evm.iotaledger.net"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
    readonly network: "iotaevm";
};
//# sourceMappingURL=iota.d.ts.map