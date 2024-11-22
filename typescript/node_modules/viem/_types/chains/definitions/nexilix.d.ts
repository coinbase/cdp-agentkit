export declare const nexilix: {
    blockExplorers: {
        readonly default: {
            readonly name: "NexilixScan";
            readonly url: "https://scan.nexilix.com";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0x58381c8e2BF9d0C2C4259cA14BdA9Afe02831244";
            readonly blockCreated: 74448;
        };
    };
    id: 240;
    name: "Nexilix Smart Chain";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Nexilix";
        readonly symbol: "NEXILIX";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpcurl.pos.nexilix.com"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=nexilix.d.ts.map