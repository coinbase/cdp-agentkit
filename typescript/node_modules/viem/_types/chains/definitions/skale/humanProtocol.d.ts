export declare const skaleHumanProtocol: {
    blockExplorers: {
        readonly default: {
            readonly name: "SKALE Explorer";
            readonly url: "https://wan-red-ain.explorer.mainnet.skalenodes.com";
        };
    };
    contracts: {};
    id: 1273227453;
    name: "SKALE | Human Protocol";
    nativeCurrency: {
        readonly name: "sFUEL";
        readonly symbol: "sFUEL";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://mainnet.skalenodes.com/v1/wan-red-ain"];
            readonly webSocket: readonly ["wss://mainnet.skalenodes.com/v1/ws/wan-red-ain"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../../index.js").ChainSerializers<undefined, import("../../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=humanProtocol.d.ts.map