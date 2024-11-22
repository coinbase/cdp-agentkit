export declare const oasisTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "Ftnscan";
            readonly url: "https://oasis.ftnscan.com";
            readonly apiUrl: "https://oasis.ftnscan.com/api";
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
    id: 4090;
    name: "Oasis Testnet";
    nativeCurrency: {
        readonly name: "Fasttoken";
        readonly symbol: "FTN";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc1.oasis.bahamutchain.com"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
    readonly network: "oasis-testnet";
};
//# sourceMappingURL=oasisTestnet.d.ts.map