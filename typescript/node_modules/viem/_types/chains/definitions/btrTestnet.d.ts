export declare const btrTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "Bitlayer(BTR) Scan";
            readonly url: "https://testnet.btrscan.com";
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
    id: 200810;
    name: "Bitlayer Testnet";
    nativeCurrency: {
        readonly name: "Bitcoin";
        readonly symbol: "BTC";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://testnet-rpc.bitlayer.org"];
            readonly webSocket: readonly ["wss://testnet-ws.bitlayer.org", "wss://testnet-ws.bitlayer-rpc.com"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=btrTestnet.d.ts.map