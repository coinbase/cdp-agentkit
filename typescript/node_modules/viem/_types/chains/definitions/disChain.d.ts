export declare const disChain: {
    blockExplorers: {
        readonly default: {
            readonly name: "DisChain Explorer";
            readonly url: "https://www.oklink.com/dis";
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
    id: 513100;
    name: "DisChain";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "DIS";
        readonly symbol: "DIS";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.dischain.xyz"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=disChain.d.ts.map