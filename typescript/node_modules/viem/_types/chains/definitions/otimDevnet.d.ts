export declare const otimDevnet: {
    blockExplorers?: {
        [key: string]: {
            name: string;
            url: string;
            apiUrl?: string | undefined;
        };
        default: {
            name: string;
            url: string;
            apiUrl?: string | undefined;
        };
    } | undefined;
    contracts: {
        readonly batchInvoker: {
            readonly address: "0x5FbDB2315678afecb367f032d93F642f64180aa3";
        };
    };
    id: 41144114;
    name: "Otim Devnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "ETH";
        readonly symbol: "ETH";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["http://devnet.otim.xyz"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=otimDevnet.d.ts.map