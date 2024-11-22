export declare const spicy: {
    blockExplorers: {
        readonly default: {
            readonly name: "Chiliz Explorer";
            readonly url: "http://spicy-explorer.chiliz.com";
            readonly apiUrl: "http://spicy-explorer.chiliz.com/api";
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
    id: 88882;
    name: "Chiliz Spicy Testnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "CHZ";
        readonly symbol: "CHZ";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://spicy-rpc.chiliz.com", "https://chiliz-spicy-rpc.publicnode.com"];
            readonly webSocket: readonly ["wss://spicy-rpc-ws.chiliz.com", "wss://chiliz-spicy-rpc.publicnode.com"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
    readonly network: "chiliz-spicy-Testnet";
};
//# sourceMappingURL=spicy.d.ts.map