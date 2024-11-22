export declare const syscoinTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "SyscoinTestnetExplorer";
            readonly url: "https://tanenbaum.io";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xcA11bde05977b3631167028862bE2a173976CA11";
            readonly blockCreated: 271288;
        };
    };
    id: 5700;
    name: "Syscoin Tanenbaum Testnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Syscoin";
        readonly symbol: "SYS";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.tanenbaum.io"];
            readonly webSocket: readonly ["wss://rpc.tanenbaum.io/wss"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=syscoinTestnet.d.ts.map