export declare const mchVerse: {
    blockExplorers: {
        readonly default: {
            readonly name: "MCH Verse Explorer";
            readonly url: "https://explorer.oasys.mycryptoheroes.net";
            readonly apiUrl: "https://explorer.oasys.mycryptoheroes.net/api";
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
    id: 29548;
    name: "MCH Verse";
    nativeCurrency: {
        readonly name: "Oasys";
        readonly symbol: "OAS";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.oasys.mycryptoheroes.net"];
        };
    };
    sourceId?: number | undefined;
    testnet: false;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=mchVerse.d.ts.map