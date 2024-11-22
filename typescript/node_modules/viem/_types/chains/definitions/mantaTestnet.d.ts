export declare const mantaTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "Manta Testnet Explorer";
            readonly url: "https://pacific-explorer.testnet.manta.network";
            readonly apiUrl: "https://pacific-explorer.testnet.manta.network/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0x211B1643b95Fe76f11eD8880EE810ABD9A4cf56C";
            readonly blockCreated: 419915;
        };
    };
    id: 3441005;
    name: "Manta Pacific Testnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "ETH";
        readonly symbol: "ETH";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://manta-testnet.calderachain.xyz/http"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
    readonly network: "manta-testnet";
};
//# sourceMappingURL=mantaTestnet.d.ts.map