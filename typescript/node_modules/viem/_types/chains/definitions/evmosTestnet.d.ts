export declare const evmosTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "Evmos Testnet Block Explorer";
            readonly url: "https://evm.evmos.dev/";
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
    id: 9000;
    name: "Evmos Testnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Evmos";
        readonly symbol: "EVMOS";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://eth.bd.evmos.dev:8545"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=evmosTestnet.d.ts.map