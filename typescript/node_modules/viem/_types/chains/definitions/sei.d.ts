export declare const sei: {
    blockExplorers: {
        readonly default: {
            readonly name: "Seitrace";
            readonly url: "https://seitrace.com";
            readonly apiUrl: "https://seitrace.com/pacific-1/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xcA11bde05977b3631167028862bE2a173976CA11";
        };
    };
    id: 1329;
    name: "Sei Network";
    nativeCurrency: {
        readonly name: "Sei";
        readonly symbol: "SEI";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://evm-rpc.sei-apis.com/"];
            readonly webSocket: readonly ["wss://evm-ws.sei-apis.com/"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=sei.d.ts.map