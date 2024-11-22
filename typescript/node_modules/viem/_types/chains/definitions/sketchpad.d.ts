export declare const sketchpad: {
    blockExplorers: {
        readonly default: {
            readonly name: "Sketchpad Explorer";
            readonly url: "https://explorer.sketchpad-1.forma.art";
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
    id: 984123;
    name: "Forma Sketchpad";
    nativeCurrency: {
        readonly symbol: "TIA";
        readonly name: "TIA";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.sketchpad-1.forma.art"];
            readonly webSocket: readonly ["wss://ws.sketchpad-1.forma.art"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
    readonly network: "sketchpad";
};
//# sourceMappingURL=sketchpad.d.ts.map