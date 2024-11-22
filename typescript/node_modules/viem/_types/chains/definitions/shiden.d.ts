export declare const shiden: {
    blockExplorers: {
        readonly default: {
            readonly name: "Shiden Scan";
            readonly url: "https://shiden.subscan.io";
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
    id: 336;
    name: "Shiden";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "SDN";
        readonly symbol: "SDN";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://shiden.public.blastapi.io"];
            readonly webSocket: readonly ["wss://shiden-rpc.dwellir.com"];
        };
    };
    sourceId?: number | undefined;
    testnet: false;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=shiden.d.ts.map