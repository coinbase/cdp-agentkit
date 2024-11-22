export declare const pulsechain: {
    blockExplorers: {
        readonly default: {
            readonly name: "PulseScan";
            readonly url: "https://scan.pulsechain.com";
            readonly apiUrl: "https://api.scan.pulsechain.com/api";
        };
    };
    contracts: {
        readonly ensRegistry: {
            readonly address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e";
        };
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 14353601;
        };
    };
    id: 369;
    name: "PulseChain";
    nativeCurrency: {
        readonly name: "Pulse";
        readonly symbol: "PLS";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.pulsechain.com"];
            readonly webSocket: readonly ["wss://ws.pulsechain.com"];
        };
    };
    sourceId?: number | undefined;
    testnet: false;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=pulsechain.d.ts.map