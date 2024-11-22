export declare const blastSepolia: {
    blockExplorers: {
        readonly default: {
            readonly name: "Blastscan";
            readonly url: "https://sepolia.blastscan.io";
            readonly apiUrl: "https://api-sepolia.blastscan.io/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 756690;
        };
    };
    id: 168587773;
    name: "Blast Sepolia";
    nativeCurrency: {
        readonly name: "Ether";
        readonly symbol: "ETH";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://sepolia.blast.io"];
        };
    };
    sourceId: 11155111;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=blastSepolia.d.ts.map