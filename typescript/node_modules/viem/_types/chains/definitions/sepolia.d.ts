export declare const sepolia: {
    blockExplorers: {
        readonly default: {
            readonly name: "Etherscan";
            readonly url: "https://sepolia.etherscan.io";
            readonly apiUrl: "https://api-sepolia.etherscan.io/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 751532;
        };
        readonly ensRegistry: {
            readonly address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e";
        };
        readonly ensUniversalResolver: {
            readonly address: "0xc8Af999e38273D658BE1b921b88A9Ddf005769cC";
            readonly blockCreated: 5317080;
        };
    };
    id: 11155111;
    name: "Sepolia";
    nativeCurrency: {
        readonly name: "Sepolia Ether";
        readonly symbol: "ETH";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://sepolia.drpc.org"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=sepolia.d.ts.map