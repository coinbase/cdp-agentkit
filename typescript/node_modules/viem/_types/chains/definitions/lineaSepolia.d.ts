export declare const lineaSepolia: {
    blockExplorers: {
        readonly default: {
            readonly name: "Etherscan";
            readonly url: "https://sepolia.lineascan.build";
            readonly apiUrl: "https://api-sepolia.lineascan.build/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 227427;
        };
    };
    id: 59141;
    name: "Linea Sepolia Testnet";
    nativeCurrency: {
        readonly name: "Linea Ether";
        readonly symbol: "ETH";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.sepolia.linea.build"];
            readonly webSocket: readonly ["wss://rpc.sepolia.linea.build"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees: {
        readonly estimateFeesPerGas: ({ client, multiply, request, type, }: Parameters<import("../../index.js").ChainEstimateFeesPerGasFn>[0]) => ReturnType<import("../../index.js").ChainEstimateFeesPerGasFn>;
        readonly maxPriorityFeePerGas: ({ block, client, request }: import("../../index.js").ChainFeesFnParameters<import("../../index.js").ChainFormatters | undefined>) => Promise<bigint | null>;
    };
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=lineaSepolia.d.ts.map