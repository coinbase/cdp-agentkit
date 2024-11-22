export declare const koi: {
    blockExplorers: {
        readonly default: {
            readonly name: "Blockscout";
            readonly url: "https://koi-scan.darwinia.network";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 180001;
        };
    };
    id: 701;
    name: "Koi Network";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Koi Network Native Token";
        readonly symbol: "KRING";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://koi-rpc.darwinia.network"];
            readonly webSocket: readonly ["wss://koi-rpc.darwinia.network"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=koi.d.ts.map