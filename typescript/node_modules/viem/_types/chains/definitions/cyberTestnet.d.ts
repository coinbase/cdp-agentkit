export declare const cyberTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "Blockscout";
            readonly url: "https://testnet.cyberscan.co";
            readonly apiUrl: "https://testnet.cyberscan.co/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xffc391F0018269d4758AEA1a144772E8FB99545E";
            readonly blockCreated: 304545;
        };
    };
    id: 111557560;
    name: "Cyber Testnet";
    nativeCurrency: {
        readonly name: "Ether";
        readonly symbol: "ETH";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://cyber-testnet.alt.technology"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=cyberTestnet.d.ts.map