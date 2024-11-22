export declare const areonNetworkTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "Areonscan";
            readonly url: "https://areonscan.com";
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
    id: 462;
    name: "Areon Network Testnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "TAREA";
        readonly symbol: "TAREA";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://testnet-rpc.areon.network"];
            readonly webSocket: readonly ["wss://testnet-ws.areon.network"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=areonNetworkTestnet.d.ts.map