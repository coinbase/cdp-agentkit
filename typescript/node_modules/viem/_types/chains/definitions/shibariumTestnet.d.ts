export declare const shibariumTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "Blockscout";
            readonly url: "https://puppyscan.shib.io";
            readonly apiUrl: "https://puppyscan.shib.io/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xA4029b74FBA366c926eDFA7Dd10B21C621170a4c";
            readonly blockCreated: 3035769;
        };
    };
    id: 157;
    name: "Puppynet Shibarium";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Bone";
        readonly symbol: "BONE";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://puppynet.shibrpc.com"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=shibariumTestnet.d.ts.map