export declare const defichainEvmTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "DeFiScan";
            readonly url: "https://meta.defiscan.live/?network=TestNet";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xcA11bde05977b3631167028862bE2a173976CA11";
            readonly blockCreated: 156462;
        };
    };
    id: 1131;
    name: "DeFiChain EVM Testnet";
    nativeCurrency: {
        readonly name: "DeFiChain";
        readonly symbol: "DFI";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://eth.testnet.ocean.jellyfishsdk.com"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
    readonly network: "defichain-evm-testnet";
};
//# sourceMappingURL=defichainEvmTestnet.d.ts.map