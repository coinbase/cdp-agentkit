export declare const opBNBTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "opbnbscan";
            readonly url: "https://testnet.opbnbscan.com";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xcA11bde05977b3631167028862bE2a173976CA11";
            readonly blockCreated: 3705108;
        };
        readonly l2OutputOracle: {
            readonly 97: {
                readonly address: "0xFf2394Bb843012562f4349C6632a0EcB92fC8810";
            };
        };
        readonly portal: {
            readonly 97: {
                readonly address: "0x4386C8ABf2009aC0c263462Da568DD9d46e52a31";
            };
        };
        readonly l1StandardBridge: {
            readonly 97: {
                readonly address: "0x677311Fd2cCc511Bbc0f581E8d9a07B033D5E840";
            };
        };
        readonly gasPriceOracle: {
            readonly address: "0x420000000000000000000000000000000000000F";
        };
        readonly l1Block: {
            readonly address: "0x4200000000000000000000000000000000000015";
        };
        readonly l2CrossDomainMessenger: {
            readonly address: "0x4200000000000000000000000000000000000007";
        };
        readonly l2Erc721Bridge: {
            readonly address: "0x4200000000000000000000000000000000000014";
        };
        readonly l2StandardBridge: {
            readonly address: "0x4200000000000000000000000000000000000010";
        };
        readonly l2ToL1MessagePasser: {
            readonly address: "0x4200000000000000000000000000000000000016";
        };
    };
    id: 5611;
    name: "opBNB Testnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "tBNB";
        readonly symbol: "tBNB";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://opbnb-testnet-rpc.bnbchain.org"];
        };
    };
    sourceId: 97;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=opBNBTestnet.d.ts.map