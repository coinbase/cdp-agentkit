export declare const xdcTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "XDCScan";
            readonly url: "https://testnet.xdcscan.com";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 59765389;
        };
    };
    id: 51;
    name: "Apothem Network";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "TXDC";
        readonly symbol: "TXDC";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://erpc.apothem.network"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=xdcTestnet.d.ts.map