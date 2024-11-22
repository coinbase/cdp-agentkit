export declare const l3xTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "L3X Testnet Explorer";
            readonly url: "https://explorer-testnet.l3x.com";
            readonly apiUrl: "https://explorer-testnet.l3x.com/api/v2";
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
    id: 12325;
    name: "L3X Protocol Testnet";
    nativeCurrency: {
        readonly name: "Ether";
        readonly symbol: "ETH";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc-testnet.l3x.com"];
            readonly webSocket: readonly ["wss://rpc-testnet.l3x.com"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=l3xTestnet.d.ts.map