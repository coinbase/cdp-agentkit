export declare const neonMainnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "Neonscan";
            readonly url: "https://neonscan.org";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 206545524;
        };
    };
    id: 245022934;
    name: "Neon EVM MainNet";
    nativeCurrency: {
        readonly name: "NEON";
        readonly symbol: "NEON";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://neon-proxy-mainnet.solana.p2p.org"];
        };
    };
    sourceId?: number | undefined;
    testnet: false;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
    readonly network: "neonMainnet";
};
//# sourceMappingURL=neonMainnet.d.ts.map