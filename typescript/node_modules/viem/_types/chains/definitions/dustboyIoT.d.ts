export declare const dustboyIoT: {
    blockExplorers: {
        readonly default: {
            readonly name: "Blockscout";
            readonly url: "https://dustboy.jibl2.com";
            readonly apiUrl: "https://dustboy.jibl2.com/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xFFD34aa2C62B2D52E00A361e466C229788f4eD6a";
            readonly blockCreated: 526569;
        };
    };
    id: 555888;
    name: "DustBoy IoT";
    nativeCurrency: {
        readonly name: "Ether";
        readonly symbol: "DST";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://dustboy-rpc.jibl2.com"];
        };
    };
    sourceId?: number | undefined;
    testnet: false;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=dustboyIoT.d.ts.map