export declare const genesys: {
    blockExplorers: {
        readonly default: {
            readonly name: "Genesys Explorer";
            readonly url: "https://gchainexplorer.genesys.network";
        };
    };
    contracts?: import("../index.js").Prettify<{
        [key: string]: import("../../index.js").ChainContract | {
            [sourceId: number]: import("../../index.js").ChainContract | undefined;
        } | undefined;
    } & {
        ensRegistry?: import("../../index.js").ChainContract | undefined;
        ensUniversalResolver?: import("../../index.js").ChainContract | undefined;
        multicall3?: import("../../index.js").ChainContract | undefined;
        universalSignatureVerifier?: import("../../index.js").ChainContract | undefined;
    }> | undefined;
    id: 16507;
    name: "Genesys Mainnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "GSYS";
        readonly symbol: "GSYS";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.genesys.network"];
        };
    };
    sourceId?: number | undefined;
    testnet: false;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=genesys.d.ts.map