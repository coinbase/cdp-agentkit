export declare const satoshiVMTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "blockscout";
            readonly url: "https://testnet.svmscan.io";
            readonly apiUrl: "https://testnet.svmscan.io/api";
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
    id: 3110;
    name: "SatoshiVM Testnet";
    nativeCurrency: {
        readonly name: "BTC";
        readonly symbol: "BTC";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://test-rpc-node-http.svmscan.io"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=satoshivmTestnet.d.ts.map