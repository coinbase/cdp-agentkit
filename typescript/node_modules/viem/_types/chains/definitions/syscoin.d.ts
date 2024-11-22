export declare const syscoin: {
    blockExplorers: {
        readonly default: {
            readonly name: "SyscoinExplorer";
            readonly url: "https://explorer.syscoin.org";
            readonly apiUrl: "https://explorer.syscoin.org/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xcA11bde05977b3631167028862bE2a173976CA11";
            readonly blockCreated: 287139;
        };
    };
    id: 57;
    name: "Syscoin Mainnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Syscoin";
        readonly symbol: "SYS";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.syscoin.org"];
            readonly webSocket: readonly ["wss://rpc.syscoin.org/wss"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=syscoin.d.ts.map