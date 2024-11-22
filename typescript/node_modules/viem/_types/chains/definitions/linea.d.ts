export declare const linea: {
    blockExplorers: {
        readonly default: {
            readonly name: "Etherscan";
            readonly url: "https://lineascan.build";
            readonly apiUrl: "https://api.lineascan.build/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xcA11bde05977b3631167028862bE2a173976CA11";
            readonly blockCreated: 42;
        };
    };
    id: 59144;
    name: "Linea Mainnet";
    nativeCurrency: {
        readonly name: "Linea Ether";
        readonly symbol: "ETH";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.linea.build"];
            readonly webSocket: readonly ["wss://rpc.linea.build"];
        };
    };
    sourceId?: number | undefined;
    testnet: false;
    custom?: Record<string, unknown> | undefined;
    fees: {
        readonly estimateFeesPerGas: ({ client, multiply, request, type, }: Parameters<import("../../index.js").ChainEstimateFeesPerGasFn>[0]) => ReturnType<import("../../index.js").ChainEstimateFeesPerGasFn>;
        readonly maxPriorityFeePerGas: ({ block, client, request }: import("../../index.js").ChainFeesFnParameters<import("../../index.js").ChainFormatters | undefined>) => Promise<bigint | null>;
    };
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=linea.d.ts.map