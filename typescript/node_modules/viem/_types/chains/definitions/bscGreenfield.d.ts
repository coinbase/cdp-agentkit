export declare const bscGreenfield: {
    blockExplorers: {
        readonly default: {
            readonly name: "BNB Greenfield Mainnet Scan";
            readonly url: "https://greenfieldscan.com";
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
    id: 1017;
    name: "BNB Greenfield Chain";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "BNB";
        readonly symbol: "BNB";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://greenfield-chain.bnbchain.org"];
        };
    };
    sourceId?: number | undefined;
    testnet: false;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=bscGreenfield.d.ts.map