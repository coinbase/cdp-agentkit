export declare const atletaOlympia: {
    blockExplorers: {
        readonly default: {
            readonly name: "Atleta Olympia Explorer";
            readonly url: "https://blockscout.atleta.network";
            readonly apiUrl: "https://blockscout.atleta.network/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0x1472ec6392180fb84F345d2455bCC75B26577115";
            readonly blockCreated: 1076473;
        };
    };
    id: 2340;
    name: "Atleta Olympia";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Atla";
        readonly symbol: "ATLA";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://testnet-rpc.atleta.network:9944", "https://testnet-rpc.atleta.network"];
            readonly ws: readonly ["wss://testnet-rpc.atleta.network:9944"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=atletaOlympia.d.ts.map