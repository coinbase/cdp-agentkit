export declare const unichainSepolia: {
    blockExplorers: {
        readonly default: {
            readonly name: "Uniscan";
            readonly url: "https://sepolia.uniscan.xyz";
            readonly apiUrl: "https://api-sepolia.uniscan.xyz/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 0;
        };
        readonly portal: {
            readonly 11155111: {
                readonly address: "0x0d83dab629f0e0F9d36c0Cbc89B69a489f0751bD";
            };
        };
        readonly l1StandardBridge: {
            readonly 11155111: {
                readonly address: "0xea58fcA6849d79EAd1f26608855c2D6407d54Ce2";
            };
        };
        readonly disputeGameFactory: {
            readonly 11155111: {
                readonly address: "0xeff73e5aa3B9AEC32c659Aa3E00444d20a84394b";
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
    id: 1301;
    name: "Unichain Sepolia";
    nativeCurrency: {
        readonly name: "Ether";
        readonly symbol: "ETH";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://sepolia.unichain.org"];
        };
    };
    sourceId: 11155111;
    testnet: true;
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
//# sourceMappingURL=unichainSepolia.d.ts.map