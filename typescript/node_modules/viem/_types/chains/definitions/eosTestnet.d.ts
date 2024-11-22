export declare const eosTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "EOS EVM Testnet Explorer";
            readonly url: "https://explorer.testnet.evm.eosnetwork.com";
            readonly apiUrl: "https://explorer.testnet.evm.eosnetwork.com/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 9067940;
        };
    };
    id: 15557;
    name: "EOS EVM Testnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "EOS";
        readonly symbol: "EOS";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://api.testnet.evm.eosnetwork.com"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=eosTestnet.d.ts.map