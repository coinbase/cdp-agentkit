export declare const idchain: {
    blockExplorers: {
        readonly default: {
            readonly name: "IDChain Explorer";
            readonly url: "https://explorer.idchain.one";
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
    id: 74;
    name: "IDChain Mainnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "EIDI";
        readonly symbol: "EIDI";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://idchain.one/rpc"];
            readonly webSocket: readonly ["wss://idchain.one/ws"];
        };
    };
    sourceId?: number | undefined;
    testnet: false;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=idchain.d.ts.map