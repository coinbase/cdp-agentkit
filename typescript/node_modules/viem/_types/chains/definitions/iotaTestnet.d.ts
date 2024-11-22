export declare const iotaTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "Explorer";
            readonly url: "https://explorer.evm.testnet.iotaledger.net";
            readonly apiUrl: "https://explorer.evm.testnet.iotaledger.net/api";
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
    id: 1075;
    name: "IOTA EVM Testnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "IOTA";
        readonly symbol: "IOTA";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://json-rpc.evm.testnet.iotaledger.net"];
            readonly webSocket: readonly ["wss://ws.json-rpc.evm.testnet.iotaledger.net"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
    readonly network: "iotaevm-testnet";
};
//# sourceMappingURL=iotaTestnet.d.ts.map