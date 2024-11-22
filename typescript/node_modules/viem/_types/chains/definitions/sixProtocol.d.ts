export declare const sixProtocol: {
    blockExplorers: {
        readonly default: {
            readonly name: "Six Protocol Scan";
            readonly url: "https://sixscan.io/sixnet";
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
    id: 98;
    name: "Six Protocol";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "SIX";
        readonly symbol: "SIX";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://sixnet-rpc-evm.sixprotocol.net"];
        };
    };
    sourceId?: number | undefined;
    testnet: false;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=sixProtocol.d.ts.map