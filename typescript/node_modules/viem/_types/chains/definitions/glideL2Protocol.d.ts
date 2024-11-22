export declare const glideL2Protocol: {
    blockExplorers: {
        readonly default: {
            readonly name: "Glide Protocol Explore";
            readonly url: "https://blockchain-explorer.glideprotocol.xyz";
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
    id: 253;
    name: "Glide L2 Protocol XP";
    nativeCurrency: {
        readonly name: "GLXP";
        readonly symbol: "GLXP";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc-api.glideprotocol.xyz/l2-rpc"];
            readonly webSocket: readonly ["wss://rpc-api.glideprotocol.xyz/l2-rpc"];
        };
    };
    sourceId?: number | undefined;
    testnet: false;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=glideL2Protocol.d.ts.map