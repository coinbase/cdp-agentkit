export declare const pulsechainV4: {
    blockExplorers: {
        readonly default: {
            readonly name: "PulseScan";
            readonly url: "https://scan.v4.testnet.pulsechain.com";
            readonly apiUrl: "https://scan.v4.testnet.pulsechain.com/api";
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
    id: 943;
    name: "PulseChain V4";
    nativeCurrency: {
        readonly name: "V4 Pulse";
        readonly symbol: "v4PLS";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.v4.testnet.pulsechain.com"];
            readonly webSocket: readonly ["wss://ws.v4.testnet.pulsechain.com"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=pulsechainV4.d.ts.map