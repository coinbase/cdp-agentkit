export declare const haqqMainnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "HAQQ Explorer";
            readonly url: "https://explorer.haqq.network";
            readonly apiUrl: "https://explorer.haqq.network/api";
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
    id: 11235;
    name: "HAQQ Mainnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Islamic Coin";
        readonly symbol: "ISLM";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.eth.haqq.network"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=haqqMainnet.d.ts.map