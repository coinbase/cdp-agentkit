export declare const diode: {
    blockExplorers: {
        readonly default: {
            readonly name: "Diode Explorer";
            readonly url: "https://diode.io/prenet";
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
    id: 15;
    name: "Diode Prenet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "DIODE";
        readonly symbol: "DIODE";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://prenet.diode.io:8443"];
            readonly webSocket: readonly ["wss://prenet.diode.io:8443/ws"];
        };
    };
    sourceId?: number | undefined;
    testnet: false;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=diode.d.ts.map