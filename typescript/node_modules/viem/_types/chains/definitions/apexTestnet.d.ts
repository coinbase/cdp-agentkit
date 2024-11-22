export declare const apexTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "Blockscout";
            readonly url: "https://exp-testnet.apexlayer.xyz";
            readonly apiUrl: "https://exp-testnet.apexlayer.xyz/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xf7642be33a6b18D16a995657adb5a68CD0438aE2";
            readonly blockCreated: 283775;
        };
    };
    id: 3993;
    name: "APEX Testnet";
    nativeCurrency: {
        readonly name: "Ether";
        readonly symbol: "ETH";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc-testnet.apexlayer.xyz"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=apexTestnet.d.ts.map