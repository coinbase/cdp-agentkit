export declare const mandala: {
    blockExplorers: {
        readonly default: {
            readonly name: "Mandala Blockscout";
            readonly url: "https://blockscout.mandala.aca-staging.network";
            readonly apiUrl: "https://blockscout.mandala.aca-staging.network/api";
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
    id: 595;
    name: "Mandala TC9";
    nativeCurrency: {
        readonly name: "Mandala";
        readonly symbol: "mACA";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://eth-rpc-tc9.aca-staging.network"];
            readonly webSocket: readonly ["wss://eth-rpc-tc9.aca-staging.network"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
    readonly network: "mandala";
};
//# sourceMappingURL=mandala.d.ts.map