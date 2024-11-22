export declare const victionTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "VIC Scan";
            readonly url: "https://testnet.vicscan.xyz";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xcA11bde05977b3631167028862bE2a173976CA11";
            readonly blockCreated: 12170179;
        };
    };
    id: 89;
    name: "Viction Testnet";
    nativeCurrency: {
        readonly name: "Viction";
        readonly symbol: "VIC";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc-testnet.viction.xyz"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=victionTestnet.d.ts.map