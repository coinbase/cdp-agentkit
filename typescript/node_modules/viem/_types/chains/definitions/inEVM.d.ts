export declare const inEVM: {
    blockExplorers: {
        readonly default: {
            readonly name: "inEVM Explorer";
            readonly url: "https://inevm.calderaexplorer.xyz";
            readonly apiUrl: "https://inevm.calderaexplorer.xyz/api/v2";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 118606;
        };
    };
    id: 2525;
    name: "inEVM Mainnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Injective";
        readonly symbol: "INJ";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://mainnet.rpc.inevm.com/http"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=inEVM.d.ts.map