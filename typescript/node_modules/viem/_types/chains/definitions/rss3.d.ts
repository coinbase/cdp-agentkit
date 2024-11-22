export declare const rss3: {
    blockExplorers: {
        readonly default: {
            readonly name: "RSS3 VSL Mainnet Scan";
            readonly url: "https://scan.rss3.io";
            readonly apiUrl: "https://scan.rss3.io/api";
        };
    };
    contracts: {
        readonly l2OutputOracle: {
            readonly 1: {
                readonly address: "0xE6f24d2C32B3109B18ed33cF08eFb490b1e09C10";
            };
        };
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 14193;
        };
        readonly portal: {
            readonly 1: {
                readonly address: "0x6A12432491bbbE8d3babf75F759766774C778Db4";
                readonly blockCreated: 19387057;
            };
        };
        readonly l1StandardBridge: {
            readonly 1: {
                readonly address: "0x4cbab69108Aa72151EDa5A3c164eA86845f18438";
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
    id: 12553;
    name: "RSS3 VSL Mainnet";
    nativeCurrency: {
        readonly name: "RSS3";
        readonly symbol: "RSS3";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.rss3.io"];
        };
    };
    sourceId: 1;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters: {
        readonly block: {
            exclude: [] | undefined;
            format: (args: import("../index.js").OpStackRpcBlock) => {
                baseFeePerGas: bigint | null;
                blobGasUsed: bigint;
                difficulty: bigint;
                excessBlobGas: bigint;
                extraData: import("../../index.js").Hex;
                gasLimit: bigint;
                gasUsed: bigint;
                hash: `0x${string}` | null;
                logsBloom: `0x${string}` | null;
                miner: import("abitype").Address;
                mixHash: import("../../index.js").Hash;
                nonce: `0x${string}` | null;
                number: bigint | null;
                parentBeaconBlockRoot?: import("../../index.js").Hex | undefined;
                parentHash: import("../../index.js").Hash;
                receiptsRoot: import("../../index.js").Hex;
                sealFields: import("../../index.js").Hex[];
                sha3Uncles: import("../../index.js").Hash;
                size: bigint;
                stateRoot: import("../../index.js").Hash;
                timestamp: bigint;
                totalDifficulty: bigint | null;
                transactions: `0x${string}`[] | import("../index.js").OpStackTransaction<boolean>[];
                transactionsRoot: import("../../index.js").Hash;
                uncles: import("../../index.js").Hash[];
                withdrawals?: import("../../index.js").Withdrawal[] | undefined;
                withdrawalsRoot?: import("../../index.js").Hex | undefined;
            } & {};
            type: "block";
        };
        readonly transaction: {
            exclude: [] | undefined;
            format: (args: import("../index.js").OpStackRpcTransaction) => ({
                blockHash: `0x${string}` | null;
                blockNumber: bigint | null;
                from: import("abitype").Address;
                gas: bigint;
                hash: import("../../index.js").Hash;
                input: import("../../index.js").Hex;
                nonce: number;
                r: import("../../index.js").Hex;
                s: import("../../index.js").Hex;
                to: import("abitype").Address | null;
                transactionIndex: number | null;
                typeHex: import("../../index.js").Hex | null;
                v: bigint;
                value: bigint;
                yParity: number;
                gasPrice?: undefined;
                maxFeePerBlobGas?: undefined;
                maxFeePerGas: bigint;
                maxPriorityFeePerGas: bigint;
                isSystemTx?: boolean;
                mint?: bigint | undefined;
                sourceHash: import("../../index.js").Hex;
                type: "deposit";
            } | {
                r: import("../../index.js").Hex;
                s: import("../../index.js").Hex;
                v: bigint;
                to: import("abitype").Address | null;
                from: import("abitype").Address;
                gas: bigint;
                nonce: number;
                value: bigint;
                blockHash: `0x${string}` | null;
                blockNumber: bigint | null;
                hash: import("../../index.js").Hash;
                input: import("../../index.js").Hex;
                transactionIndex: number | null;
                typeHex: import("../../index.js").Hex | null;
                accessList?: undefined;
                authorizationList?: undefined;
                blobVersionedHashes?: undefined;
                chainId?: number | undefined;
                yParity?: undefined;
                type: "legacy";
                gasPrice: bigint;
                maxFeePerBlobGas?: undefined;
                maxFeePerGas?: undefined;
                maxPriorityFeePerGas?: undefined;
                isSystemTx?: undefined;
                mint?: undefined;
                sourceHash?: undefined;
            } | {
                blockHash: `0x${string}` | null;
                blockNumber: bigint | null;
                from: import("abitype").Address;
                gas: bigint;
                hash: import("../../index.js").Hash;
                input: import("../../index.js").Hex;
                nonce: number;
                r: import("../../index.js").Hex;
                s: import("../../index.js").Hex;
                to: import("abitype").Address | null;
                transactionIndex: number | null;
                typeHex: import("../../index.js").Hex | null;
                v: bigint;
                value: bigint;
                yParity: number;
                accessList: import("../../index.js").AccessList;
                authorizationList?: undefined;
                blobVersionedHashes?: undefined;
                chainId: number;
                type: "eip2930";
                gasPrice: bigint;
                maxFeePerBlobGas?: undefined;
                maxFeePerGas?: undefined;
                maxPriorityFeePerGas?: undefined;
                isSystemTx?: undefined;
                mint?: undefined;
                sourceHash?: undefined;
            } | {
                blockHash: `0x${string}` | null;
                blockNumber: bigint | null;
                from: import("abitype").Address;
                gas: bigint;
                hash: import("../../index.js").Hash;
                input: import("../../index.js").Hex;
                nonce: number;
                r: import("../../index.js").Hex;
                s: import("../../index.js").Hex;
                to: import("abitype").Address | null;
                transactionIndex: number | null;
                typeHex: import("../../index.js").Hex | null;
                v: bigint;
                value: bigint;
                yParity: number;
                accessList: import("../../index.js").AccessList;
                authorizationList?: undefined;
                blobVersionedHashes?: undefined;
                chainId: number;
                type: "eip1559";
                gasPrice?: undefined;
                maxFeePerBlobGas?: undefined;
                maxFeePerGas: bigint;
                maxPriorityFeePerGas: bigint;
                isSystemTx?: undefined;
                mint?: undefined;
                sourceHash?: undefined;
            } | {
                blockHash: `0x${string}` | null;
                blockNumber: bigint | null;
                from: import("abitype").Address;
                gas: bigint;
                hash: import("../../index.js").Hash;
                input: import("../../index.js").Hex;
                nonce: number;
                r: import("../../index.js").Hex;
                s: import("../../index.js").Hex;
                to: import("abitype").Address | null;
                transactionIndex: number | null;
                typeHex: import("../../index.js").Hex | null;
                v: bigint;
                value: bigint;
                yParity: number;
                accessList: import("../../index.js").AccessList;
                authorizationList?: undefined;
                blobVersionedHashes: readonly import("../../index.js").Hex[];
                chainId: number;
                type: "eip4844";
                gasPrice?: undefined;
                maxFeePerBlobGas: bigint;
                maxFeePerGas: bigint;
                maxPriorityFeePerGas: bigint;
                isSystemTx?: undefined;
                mint?: undefined;
                sourceHash?: undefined;
            } | {
                blockHash: `0x${string}` | null;
                blockNumber: bigint | null;
                from: import("abitype").Address;
                gas: bigint;
                hash: import("../../index.js").Hash;
                input: import("../../index.js").Hex;
                nonce: number;
                r: import("../../index.js").Hex;
                s: import("../../index.js").Hex;
                to: import("abitype").Address | null;
                transactionIndex: number | null;
                typeHex: import("../../index.js").Hex | null;
                v: bigint;
                value: bigint;
                yParity: number;
                accessList: import("../../index.js").AccessList;
                authorizationList: import("../../experimental/index.js").SignedAuthorizationList;
                blobVersionedHashes?: undefined;
                chainId: number;
                type: "eip7702";
                gasPrice?: undefined;
                maxFeePerBlobGas?: undefined;
                maxFeePerGas: bigint;
                maxPriorityFeePerGas: bigint;
                isSystemTx?: undefined;
                mint?: undefined;
                sourceHash?: undefined;
            }) & {};
            type: "transaction";
        };
        readonly transactionReceipt: {
            exclude: [] | undefined;
            format: (args: import("../index.js").OpStackRpcTransactionReceipt) => {
                blobGasPrice?: bigint | undefined;
                blobGasUsed?: bigint | undefined;
                blockHash: import("../../index.js").Hash;
                blockNumber: bigint;
                contractAddress: import("abitype").Address | null | undefined;
                cumulativeGasUsed: bigint;
                effectiveGasPrice: bigint;
                from: import("abitype").Address;
                gasUsed: bigint;
                logs: import("../../index.js").Log<bigint, number, false>[];
                logsBloom: import("../../index.js").Hex;
                root?: import("../../index.js").Hash | undefined;
                status: "success" | "reverted";
                to: import("abitype").Address | null;
                transactionHash: import("../../index.js").Hash;
                transactionIndex: number;
                type: import("../../index.js").TransactionType;
                l1GasPrice: bigint | null;
                l1GasUsed: bigint | null;
                l1Fee: bigint | null;
                l1FeeScalar: number | null;
            } & {};
            type: "transactionReceipt";
        };
    };
    serializers: {
        readonly transaction: typeof import("../index.js").serializeTransactionOpStack;
    };
};
//# sourceMappingURL=rss3.d.ts.map