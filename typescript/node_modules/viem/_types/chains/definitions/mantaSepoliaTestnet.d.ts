export declare const mantaSepoliaTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "Manta Sepolia Testnet Explorer";
            readonly url: "https://pacific-explorer.sepolia-testnet.manta.network";
            readonly apiUrl: "https://pacific-explorer.sepolia-testnet.manta.network/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xca54918f7B525C8df894668846506767412b53E3";
            readonly blockCreated: 479584;
        };
    };
    id: 3441006;
    name: "Manta Pacific Sepolia Testnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "ETH";
        readonly symbol: "ETH";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://pacific-rpc.sepolia-testnet.manta.network/http"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
    readonly network: "manta-sepolia";
};
//# sourceMappingURL=mantaSepoliaTestnet.d.ts.map