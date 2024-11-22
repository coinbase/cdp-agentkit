export declare const acala: {
    blockExplorers: {
        readonly default: {
            readonly name: "Acala Blockscout";
            readonly url: "https://blockscout.acala.network";
            readonly apiUrl: "https://blockscout.acala.network/api";
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
    id: 787;
    name: "Acala";
    nativeCurrency: {
        readonly name: "Acala";
        readonly symbol: "ACA";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://eth-rpc-acala.aca-api.network"];
            readonly webSocket: readonly ["wss://eth-rpc-acala.aca-api.network"];
        };
    };
    sourceId?: number | undefined;
    testnet: false;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
    readonly network: "acala";
};
//# sourceMappingURL=acala.d.ts.map