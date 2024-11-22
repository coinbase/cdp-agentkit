export declare const goerli: {
    blockExplorers: {
        readonly default: {
            readonly name: "Etherscan";
            readonly url: "https://goerli.etherscan.io";
            readonly apiUrl: "https://api-goerli.etherscan.io/api";
        };
    };
    contracts: {
        readonly ensRegistry: {
            readonly address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e";
        };
        readonly ensUniversalResolver: {
            readonly address: "0xfc4AC75C46C914aF5892d6d3eFFcebD7917293F1";
            readonly blockCreated: 10339206;
        };
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 6507670;
        };
    };
    id: 5;
    name: "Goerli";
    nativeCurrency: {
        readonly name: "Goerli Ether";
        readonly symbol: "ETH";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.ankr.com/eth_goerli"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=goerli.d.ts.map