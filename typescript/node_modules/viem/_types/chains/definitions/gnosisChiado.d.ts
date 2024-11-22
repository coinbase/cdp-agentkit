export declare const gnosisChiado: {
    blockExplorers: {
        readonly default: {
            readonly name: "Blockscout";
            readonly url: "https://blockscout.chiadochain.net";
            readonly apiUrl: "https://blockscout.chiadochain.net/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xcA11bde05977b3631167028862bE2a173976CA11";
            readonly blockCreated: 4967313;
        };
    };
    id: 10200;
    name: "Gnosis Chiado";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Gnosis";
        readonly symbol: "xDAI";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.chiadochain.net"];
            readonly webSocket: readonly ["wss://rpc.chiadochain.net/wss"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=gnosisChiado.d.ts.map