export declare const karura: {
    blockExplorers: {
        readonly default: {
            readonly name: "Karura Blockscout";
            readonly url: "https://blockscout.karura.network";
            readonly apiUrl: "https://blockscout.karura.network/api";
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
    id: 686;
    name: "Karura";
    nativeCurrency: {
        readonly name: "Karura";
        readonly symbol: "KAR";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://eth-rpc-karura.aca-api.network"];
            readonly webSocket: readonly ["wss://eth-rpc-karura.aca-api.network"];
        };
    };
    sourceId?: number | undefined;
    testnet: false;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
    readonly network: "karura";
};
//# sourceMappingURL=karura.d.ts.map