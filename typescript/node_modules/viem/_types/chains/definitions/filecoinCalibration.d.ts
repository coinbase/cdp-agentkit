export declare const filecoinCalibration: {
    blockExplorers: {
        readonly default: {
            readonly name: "Filscan";
            readonly url: "https://calibration.filscan.io";
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
    id: 314159;
    name: "Filecoin Calibration";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "testnet filecoin";
        readonly symbol: "tFIL";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://api.calibration.node.glif.io/rpc/v1"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=filecoinCalibration.d.ts.map