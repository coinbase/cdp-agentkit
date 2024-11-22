export declare const xrSepolia: {
    blockExplorers: {
        readonly default: {
            readonly name: "Blockscout";
            readonly url: "https://xr-sepolia-testnet.explorer.caldera.xyz";
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
    id: 2730;
    name: "XR Sepolia";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "tXR";
        readonly symbol: "tXR";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://xr-sepolia-testnet.rpc.caldera.xyz/http"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=xrSepolia.d.ts.map