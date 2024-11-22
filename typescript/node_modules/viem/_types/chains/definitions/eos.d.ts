export declare const eos: {
    blockExplorers: {
        readonly default: {
            readonly name: "EOS EVM Explorer";
            readonly url: "https://explorer.evm.eosnetwork.com";
            readonly apiUrl: "https://explorer.evm.eosnetwork.com/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 7943933;
        };
    };
    id: 17777;
    name: "EOS EVM";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "EOS";
        readonly symbol: "EOS";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://api.evm.eosnetwork.com"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=eos.d.ts.map