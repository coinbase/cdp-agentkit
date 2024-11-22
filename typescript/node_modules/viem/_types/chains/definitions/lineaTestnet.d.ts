export declare const lineaTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "Etherscan";
            readonly url: "https://goerli.lineascan.build";
            readonly apiUrl: "https://goerli.lineascan.build/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 498623;
        };
    };
    id: 59140;
    name: "Linea Goerli Testnet";
    nativeCurrency: {
        readonly name: "Linea Ether";
        readonly symbol: "ETH";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.goerli.linea.build"];
            readonly webSocket: readonly ["wss://rpc.goerli.linea.build"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=lineaTestnet.d.ts.map