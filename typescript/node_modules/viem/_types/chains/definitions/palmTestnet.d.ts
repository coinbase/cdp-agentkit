export declare const palmTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "Chainlens";
            readonly url: "https://palm.chainlens.com";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 15429248;
        };
    };
    id: 11297108099;
    name: "Palm Testnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "PALM";
        readonly symbol: "PALM";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://palm-mainnet.public.blastapi.io"];
            readonly webSocket: readonly ["wss://palm-mainnet.public.blastapi.io"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=palmTestnet.d.ts.map