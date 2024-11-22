export declare const beamTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "Beam Explorer";
            readonly url: "https://subnets-test.avax.network/beam";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0x9bf49b704ee2a095b95c1f2d4eb9010510c41c9e";
            readonly blockCreated: 3;
        };
    };
    id: 13337;
    name: "Beam Testnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Beam";
        readonly symbol: "BEAM";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://build.onbeam.com/rpc/testnet"];
            readonly webSocket: readonly ["wss://build.onbeam.com/ws/testnet"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
    readonly network: "beam";
};
//# sourceMappingURL=beamTestnet.d.ts.map