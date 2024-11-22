export declare const fantomSonicTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "Fantom Sonic Open Testnet Explorer";
            readonly url: "https://public-sonic.fantom.network";
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
    id: 64240;
    name: "Fantom Sonic Open Testnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Fantom";
        readonly symbol: "FTM";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpcapi.sonic.fantom.network"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
    readonly network: "fantom-sonic-testnet";
};
//# sourceMappingURL=fantomSonicTestnet.d.ts.map