export declare const zetachainAthensTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "ZetaScan";
            readonly url: "https://athens.explorer.zetachain.com";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xcA11bde05977b3631167028862bE2a173976CA11";
            readonly blockCreated: 2715217;
        };
    };
    id: 7001;
    name: "ZetaChain Athens Testnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Zeta";
        readonly symbol: "aZETA";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://zetachain-athens-evm.blockpi.network/v1/rpc/public"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=zetachainAthensTestnet.d.ts.map