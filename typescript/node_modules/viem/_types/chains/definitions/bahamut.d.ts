export declare const bahamut: {
    blockExplorers: {
        readonly default: {
            readonly name: "Ftnscan";
            readonly url: "https://www.ftnscan.com";
            readonly apiUrl: "https://www.ftnscan.com/api";
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
    id: 5165;
    name: "Bahamut";
    nativeCurrency: {
        readonly name: "Fasttoken";
        readonly symbol: "FTN";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc1.bahamut.io", "https://bahamut-rpc.publicnode.com", "https://rpc2.bahamut.io"];
            readonly webSocket: readonly ["wss://ws1.sahara.bahamutchain.com", "wss://bahamut-rpc.publicnode.com", "wss://ws2.sahara.bahamutchain.com"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
    readonly network: "bahamut";
};
//# sourceMappingURL=bahamut.d.ts.map