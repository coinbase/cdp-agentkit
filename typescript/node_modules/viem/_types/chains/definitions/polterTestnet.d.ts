export declare const polterTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "Blockscout";
            readonly url: "https://polter-testnet.explorer.alchemy.com";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 11245;
        };
    };
    id: 631571;
    name: "Polter Testnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Polter GHST";
        readonly symbol: "GHST";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://geist-polter.g.alchemy.com/public"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=polterTestnet.d.ts.map