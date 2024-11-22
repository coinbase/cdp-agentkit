export declare const nexi: {
    blockExplorers: {
        readonly default: {
            readonly name: "NexiScan";
            readonly url: "https://www.nexiscan.com";
            readonly apiUrl: "https://www.nexiscan.com/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0x0277A46Cc69A57eE3A6C8c158bA874832F718B8E";
            readonly blockCreated: 25770160;
        };
    };
    id: 4242;
    name: "Nexi";
    nativeCurrency: {
        readonly name: "Nexi";
        readonly symbol: "NEXI";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.chain.nexi.technology"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=nexi.d.ts.map