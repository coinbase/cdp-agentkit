export declare const bitTorrent: {
    blockExplorers: {
        readonly default: {
            readonly name: "Bttcscan";
            readonly url: "https://bttcscan.com";
            readonly apiUrl: "https://api.bttcscan.com/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xcA11bde05977b3631167028862bE2a173976CA11";
            readonly blockCreated: 31078552;
        };
    };
    id: 199;
    name: "BitTorrent";
    nativeCurrency: {
        readonly name: "BitTorrent";
        readonly symbol: "BTT";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.bittorrentchain.io"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
    readonly network: "bittorrent-chain-mainnet";
};
//# sourceMappingURL=bitTorrent.d.ts.map