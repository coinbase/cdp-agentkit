import type { ErrorType } from '../../errors/utils.js';
import type { Log } from '../../types/log.js';
import { type ParseEventLogsErrorType } from '../../utils/abi/parseEventLogs.js';
import { portalAbi } from '../abis.js';
export type ExtractTransactionDepositedLogsParameters = {
    /** An opaque array of logs. */
    logs: Log[];
};
export type ExtractTransactionDepositedLogsReturnType = Log<bigint, number, false, undefined, true, typeof portalAbi, 'TransactionDeposited'>[];
export type ExtractTransactionDepositedLogsErrorType = ParseEventLogsErrorType | ErrorType;
export declare function extractTransactionDepositedLogs({ logs, }: ExtractTransactionDepositedLogsParameters): import("../../utils/abi/parseEventLogs.js").ParseEventLogsReturnType<readonly [{
    readonly stateMutability: "nonpayable";
    readonly type: "constructor";
    readonly inputs: readonly [];
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "version";
        readonly internalType: "uint8";
        readonly type: "uint8";
        readonly indexed: false;
    }];
    readonly name: "Initialized";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "account";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }];
    readonly name: "Paused";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "from";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "to";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "version";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: true;
    }, {
        readonly name: "opaqueData";
        readonly internalType: "bytes";
        readonly type: "bytes";
        readonly indexed: false;
    }];
    readonly name: "TransactionDeposited";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "account";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }];
    readonly name: "Unpaused";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "withdrawalHash";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
        readonly indexed: true;
    }, {
        readonly name: "success";
        readonly internalType: "bool";
        readonly type: "bool";
        readonly indexed: false;
    }];
    readonly name: "WithdrawalFinalized";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "withdrawalHash";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
        readonly indexed: true;
    }, {
        readonly name: "from";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "to";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }];
    readonly name: "WithdrawalProven";
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "GUARDIAN";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "L2_ORACLE";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "contract L2OutputOracle";
        readonly type: "address";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "SYSTEM_CONFIG";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "contract SystemConfig";
        readonly type: "address";
    }];
}, {
    readonly stateMutability: "payable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_to";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_value";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_gasLimit";
        readonly internalType: "uint64";
        readonly type: "uint64";
    }, {
        readonly name: "_isCreation";
        readonly internalType: "bool";
        readonly type: "bool";
    }, {
        readonly name: "_data";
        readonly internalType: "bytes";
        readonly type: "bytes";
    }];
    readonly name: "depositTransaction";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "payable";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "donateETH";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_tx";
        readonly internalType: "struct Types.WithdrawalTransaction";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "nonce";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "sender";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "target";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "value";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "gasLimit";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "data";
            readonly internalType: "bytes";
            readonly type: "bytes";
        }];
    }];
    readonly name: "finalizeWithdrawalTransaction";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }];
    readonly name: "finalizedWithdrawals";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "guardian";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_l2Oracle";
        readonly internalType: "contract L2OutputOracle";
        readonly type: "address";
    }, {
        readonly name: "_guardian";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_systemConfig";
        readonly internalType: "contract SystemConfig";
        readonly type: "address";
    }, {
        readonly name: "_paused";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
    readonly name: "initialize";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_l2OutputIndex";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "isOutputFinalized";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "l2Oracle";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "contract L2OutputOracle";
        readonly type: "address";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "l2Sender";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
}, {
    readonly stateMutability: "pure";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_byteCount";
        readonly internalType: "uint64";
        readonly type: "uint64";
    }];
    readonly name: "minimumGasLimit";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint64";
        readonly type: "uint64";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "params";
    readonly outputs: readonly [{
        readonly name: "prevBaseFee";
        readonly internalType: "uint128";
        readonly type: "uint128";
    }, {
        readonly name: "prevBoughtGas";
        readonly internalType: "uint64";
        readonly type: "uint64";
    }, {
        readonly name: "prevBlockNum";
        readonly internalType: "uint64";
        readonly type: "uint64";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "pause";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "paused";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_tx";
        readonly internalType: "struct Types.WithdrawalTransaction";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "nonce";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "sender";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "target";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "value";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "gasLimit";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "data";
            readonly internalType: "bytes";
            readonly type: "bytes";
        }];
    }, {
        readonly name: "_l2OutputIndex";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_outputRootProof";
        readonly internalType: "struct Types.OutputRootProof";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "version";
            readonly internalType: "bytes32";
            readonly type: "bytes32";
        }, {
            readonly name: "stateRoot";
            readonly internalType: "bytes32";
            readonly type: "bytes32";
        }, {
            readonly name: "messagePasserStorageRoot";
            readonly internalType: "bytes32";
            readonly type: "bytes32";
        }, {
            readonly name: "latestBlockhash";
            readonly internalType: "bytes32";
            readonly type: "bytes32";
        }];
    }, {
        readonly name: "_withdrawalProof";
        readonly internalType: "bytes[]";
        readonly type: "bytes[]";
    }];
    readonly name: "proveWithdrawalTransaction";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }];
    readonly name: "provenWithdrawals";
    readonly outputs: readonly [{
        readonly name: "outputRoot";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }, {
        readonly name: "timestamp";
        readonly internalType: "uint128";
        readonly type: "uint128";
    }, {
        readonly name: "l2OutputIndex";
        readonly internalType: "uint128";
        readonly type: "uint128";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "systemConfig";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "contract SystemConfig";
        readonly type: "address";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "unpause";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "version";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "string";
        readonly type: "string";
    }];
}, {
    readonly stateMutability: "payable";
    readonly type: "receive";
}], "TransactionDeposited", true, "TransactionDeposited">;
//# sourceMappingURL=extractTransactionDepositedLogs.d.ts.map