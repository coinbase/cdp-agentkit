export declare const btr: {
    blockExplorers: {
        readonly default: {
            readonly name: "Bitlayer(BTR) Scan";
            readonly url: "https://www.btrscan.com";
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
    id: 200901;
    name: "Bitlayer";
    nativeCurrency: {
        readonly name: "Bitcoin";
        readonly symbol: "BTC";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.bitlayer.org", "https://rpc.bitlayer-rpc.com", "https://rpc.ankr.com/bitlayer"];
            readonly webSocket: readonly ["wss://ws.bitlayer.org", "wss://ws.bitlayer-rpc.com"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=btr.d.ts.map