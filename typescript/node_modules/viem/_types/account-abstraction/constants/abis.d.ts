export declare const entryPoint06Abi: readonly [{
    readonly inputs: readonly [{
        readonly name: "preOpGas";
        readonly type: "uint256";
    }, {
        readonly name: "paid";
        readonly type: "uint256";
    }, {
        readonly name: "validAfter";
        readonly type: "uint48";
    }, {
        readonly name: "validUntil";
        readonly type: "uint48";
    }, {
        readonly name: "targetSuccess";
        readonly type: "bool";
    }, {
        readonly name: "targetResult";
        readonly type: "bytes";
    }];
    readonly name: "ExecutionResult";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly name: "opIndex";
        readonly type: "uint256";
    }, {
        readonly name: "reason";
        readonly type: "string";
    }];
    readonly name: "FailedOp";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly name: "sender";
        readonly type: "address";
    }];
    readonly name: "SenderAddressResult";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly name: "aggregator";
        readonly type: "address";
    }];
    readonly name: "SignatureValidationFailed";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly name: "preOpGas";
            readonly type: "uint256";
        }, {
            readonly name: "prefund";
            readonly type: "uint256";
        }, {
            readonly name: "sigFailed";
            readonly type: "bool";
        }, {
            readonly name: "validAfter";
            readonly type: "uint48";
        }, {
            readonly name: "validUntil";
            readonly type: "uint48";
        }, {
            readonly name: "paymasterContext";
            readonly type: "bytes";
        }];
        readonly name: "returnInfo";
        readonly type: "tuple";
    }, {
        readonly components: readonly [{
            readonly name: "stake";
            readonly type: "uint256";
        }, {
            readonly name: "unstakeDelaySec";
            readonly type: "uint256";
        }];
        readonly name: "senderInfo";
        readonly type: "tuple";
    }, {
        readonly components: readonly [{
            readonly name: "stake";
            readonly type: "uint256";
        }, {
            readonly name: "unstakeDelaySec";
            readonly type: "uint256";
        }];
        readonly name: "factoryInfo";
        readonly type: "tuple";
    }, {
        readonly components: readonly [{
            readonly name: "stake";
            readonly type: "uint256";
        }, {
            readonly name: "unstakeDelaySec";
            readonly type: "uint256";
        }];
        readonly name: "paymasterInfo";
        readonly type: "tuple";
    }];
    readonly name: "ValidationResult";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly name: "preOpGas";
            readonly type: "uint256";
        }, {
            readonly name: "prefund";
            readonly type: "uint256";
        }, {
            readonly name: "sigFailed";
            readonly type: "bool";
        }, {
            readonly name: "validAfter";
            readonly type: "uint48";
        }, {
            readonly name: "validUntil";
            readonly type: "uint48";
        }, {
            readonly name: "paymasterContext";
            readonly type: "bytes";
        }];
        readonly name: "returnInfo";
        readonly type: "tuple";
    }, {
        readonly components: readonly [{
            readonly name: "stake";
            readonly type: "uint256";
        }, {
            readonly name: "unstakeDelaySec";
            readonly type: "uint256";
        }];
        readonly name: "senderInfo";
        readonly type: "tuple";
    }, {
        readonly components: readonly [{
            readonly name: "stake";
            readonly type: "uint256";
        }, {
            readonly name: "unstakeDelaySec";
            readonly type: "uint256";
        }];
        readonly name: "factoryInfo";
        readonly type: "tuple";
    }, {
        readonly components: readonly [{
            readonly name: "stake";
            readonly type: "uint256";
        }, {
            readonly name: "unstakeDelaySec";
            readonly type: "uint256";
        }];
        readonly name: "paymasterInfo";
        readonly type: "tuple";
    }, {
        readonly components: readonly [{
            readonly name: "aggregator";
            readonly type: "address";
        }, {
            readonly components: readonly [{
                readonly name: "stake";
                readonly type: "uint256";
            }, {
                readonly name: "unstakeDelaySec";
                readonly type: "uint256";
            }];
            readonly name: "stakeInfo";
            readonly type: "tuple";
        }];
        readonly name: "aggregatorInfo";
        readonly type: "tuple";
    }];
    readonly name: "ValidationResultWithAggregation";
    readonly type: "error";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly name: "userOpHash";
        readonly type: "bytes32";
    }, {
        readonly indexed: true;
        readonly name: "sender";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly name: "factory";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly name: "paymaster";
        readonly type: "address";
    }];
    readonly name: "AccountDeployed";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [];
    readonly name: "BeforeExecution";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly name: "account";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly name: "totalDeposit";
        readonly type: "uint256";
    }];
    readonly name: "Deposited";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly name: "aggregator";
        readonly type: "address";
    }];
    readonly name: "SignatureAggregatorChanged";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly name: "account";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly name: "totalStaked";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly name: "unstakeDelaySec";
        readonly type: "uint256";
    }];
    readonly name: "StakeLocked";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly name: "account";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly name: "withdrawTime";
        readonly type: "uint256";
    }];
    readonly name: "StakeUnlocked";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly name: "account";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly name: "withdrawAddress";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly name: "amount";
        readonly type: "uint256";
    }];
    readonly name: "StakeWithdrawn";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly name: "userOpHash";
        readonly type: "bytes32";
    }, {
        readonly indexed: true;
        readonly name: "sender";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly name: "paymaster";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly name: "nonce";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly name: "success";
        readonly type: "bool";
    }, {
        readonly indexed: false;
        readonly name: "actualGasCost";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly name: "actualGasUsed";
        readonly type: "uint256";
    }];
    readonly name: "UserOperationEvent";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly name: "userOpHash";
        readonly type: "bytes32";
    }, {
        readonly indexed: true;
        readonly name: "sender";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly name: "nonce";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly name: "revertReason";
        readonly type: "bytes";
    }];
    readonly name: "UserOperationRevertReason";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly name: "account";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly name: "withdrawAddress";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly name: "amount";
        readonly type: "uint256";
    }];
    readonly name: "Withdrawn";
    readonly type: "event";
}, {
    readonly inputs: readonly [];
    readonly name: "SIG_VALIDATION_FAILED";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly name: "initCode";
        readonly type: "bytes";
    }, {
        readonly name: "sender";
        readonly type: "address";
    }, {
        readonly name: "paymasterAndData";
        readonly type: "bytes";
    }];
    readonly name: "_validateSenderAndPaymaster";
    readonly outputs: readonly [];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly name: "unstakeDelaySec";
        readonly type: "uint32";
    }];
    readonly name: "addStake";
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly name: "account";
        readonly type: "address";
    }];
    readonly name: "balanceOf";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly name: "account";
        readonly type: "address";
    }];
    readonly name: "depositTo";
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly name: "";
        readonly type: "address";
    }];
    readonly name: "deposits";
    readonly outputs: readonly [{
        readonly name: "deposit";
        readonly type: "uint112";
    }, {
        readonly name: "staked";
        readonly type: "bool";
    }, {
        readonly name: "stake";
        readonly type: "uint112";
    }, {
        readonly name: "unstakeDelaySec";
        readonly type: "uint32";
    }, {
        readonly name: "withdrawTime";
        readonly type: "uint48";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly name: "account";
        readonly type: "address";
    }];
    readonly name: "getDepositInfo";
    readonly outputs: readonly [{
        readonly components: readonly [{
            readonly name: "deposit";
            readonly type: "uint112";
        }, {
            readonly name: "staked";
            readonly type: "bool";
        }, {
            readonly name: "stake";
            readonly type: "uint112";
        }, {
            readonly name: "unstakeDelaySec";
            readonly type: "uint32";
        }, {
            readonly name: "withdrawTime";
            readonly type: "uint48";
        }];
        readonly name: "info";
        readonly type: "tuple";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly name: "sender";
        readonly type: "address";
    }, {
        readonly name: "key";
        readonly type: "uint192";
    }];
    readonly name: "getNonce";
    readonly outputs: readonly [{
        readonly name: "nonce";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly name: "initCode";
        readonly type: "bytes";
    }];
    readonly name: "getSenderAddress";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly name: "sender";
            readonly type: "address";
        }, {
            readonly name: "nonce";
            readonly type: "uint256";
        }, {
            readonly name: "initCode";
            readonly type: "bytes";
        }, {
            readonly name: "callData";
            readonly type: "bytes";
        }, {
            readonly name: "callGasLimit";
            readonly type: "uint256";
        }, {
            readonly name: "verificationGasLimit";
            readonly type: "uint256";
        }, {
            readonly name: "preVerificationGas";
            readonly type: "uint256";
        }, {
            readonly name: "maxFeePerGas";
            readonly type: "uint256";
        }, {
            readonly name: "maxPriorityFeePerGas";
            readonly type: "uint256";
        }, {
            readonly name: "paymasterAndData";
            readonly type: "bytes";
        }, {
            readonly name: "signature";
            readonly type: "bytes";
        }];
        readonly name: "userOp";
        readonly type: "tuple";
    }];
    readonly name: "getUserOpHash";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bytes32";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly components: readonly [{
                readonly name: "sender";
                readonly type: "address";
            }, {
                readonly name: "nonce";
                readonly type: "uint256";
            }, {
                readonly name: "initCode";
                readonly type: "bytes";
            }, {
                readonly name: "callData";
                readonly type: "bytes";
            }, {
                readonly name: "callGasLimit";
                readonly type: "uint256";
            }, {
                readonly name: "verificationGasLimit";
                readonly type: "uint256";
            }, {
                readonly name: "preVerificationGas";
                readonly type: "uint256";
            }, {
                readonly name: "maxFeePerGas";
                readonly type: "uint256";
            }, {
                readonly name: "maxPriorityFeePerGas";
                readonly type: "uint256";
            }, {
                readonly name: "paymasterAndData";
                readonly type: "bytes";
            }, {
                readonly name: "signature";
                readonly type: "bytes";
            }];
            readonly name: "userOps";
            readonly type: "tuple[]";
        }, {
            readonly name: "aggregator";
            readonly type: "address";
        }, {
            readonly name: "signature";
            readonly type: "bytes";
        }];
        readonly name: "opsPerAggregator";
        readonly type: "tuple[]";
    }, {
        readonly name: "beneficiary";
        readonly type: "address";
    }];
    readonly name: "handleAggregatedOps";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly name: "sender";
            readonly type: "address";
        }, {
            readonly name: "nonce";
            readonly type: "uint256";
        }, {
            readonly name: "initCode";
            readonly type: "bytes";
        }, {
            readonly name: "callData";
            readonly type: "bytes";
        }, {
            readonly name: "callGasLimit";
            readonly type: "uint256";
        }, {
            readonly name: "verificationGasLimit";
            readonly type: "uint256";
        }, {
            readonly name: "preVerificationGas";
            readonly type: "uint256";
        }, {
            readonly name: "maxFeePerGas";
            readonly type: "uint256";
        }, {
            readonly name: "maxPriorityFeePerGas";
            readonly type: "uint256";
        }, {
            readonly name: "paymasterAndData";
            readonly type: "bytes";
        }, {
            readonly name: "signature";
            readonly type: "bytes";
        }];
        readonly name: "ops";
        readonly type: "tuple[]";
    }, {
        readonly name: "beneficiary";
        readonly type: "address";
    }];
    readonly name: "handleOps";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly name: "key";
        readonly type: "uint192";
    }];
    readonly name: "incrementNonce";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly name: "callData";
        readonly type: "bytes";
    }, {
        readonly components: readonly [{
            readonly components: readonly [{
                readonly name: "sender";
                readonly type: "address";
            }, {
                readonly name: "nonce";
                readonly type: "uint256";
            }, {
                readonly name: "callGasLimit";
                readonly type: "uint256";
            }, {
                readonly name: "verificationGasLimit";
                readonly type: "uint256";
            }, {
                readonly name: "preVerificationGas";
                readonly type: "uint256";
            }, {
                readonly name: "paymaster";
                readonly type: "address";
            }, {
                readonly name: "maxFeePerGas";
                readonly type: "uint256";
            }, {
                readonly name: "maxPriorityFeePerGas";
                readonly type: "uint256";
            }];
            readonly name: "mUserOp";
            readonly type: "tuple";
        }, {
            readonly name: "userOpHash";
            readonly type: "bytes32";
        }, {
            readonly name: "prefund";
            readonly type: "uint256";
        }, {
            readonly name: "contextOffset";
            readonly type: "uint256";
        }, {
            readonly name: "preOpGas";
            readonly type: "uint256";
        }];
        readonly name: "opInfo";
        readonly type: "tuple";
    }, {
        readonly name: "context";
        readonly type: "bytes";
    }];
    readonly name: "innerHandleOp";
    readonly outputs: readonly [{
        readonly name: "actualGasCost";
        readonly type: "uint256";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly name: "";
        readonly type: "address";
    }, {
        readonly name: "";
        readonly type: "uint192";
    }];
    readonly name: "nonceSequenceNumber";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly name: "sender";
            readonly type: "address";
        }, {
            readonly name: "nonce";
            readonly type: "uint256";
        }, {
            readonly name: "initCode";
            readonly type: "bytes";
        }, {
            readonly name: "callData";
            readonly type: "bytes";
        }, {
            readonly name: "callGasLimit";
            readonly type: "uint256";
        }, {
            readonly name: "verificationGasLimit";
            readonly type: "uint256";
        }, {
            readonly name: "preVerificationGas";
            readonly type: "uint256";
        }, {
            readonly name: "maxFeePerGas";
            readonly type: "uint256";
        }, {
            readonly name: "maxPriorityFeePerGas";
            readonly type: "uint256";
        }, {
            readonly name: "paymasterAndData";
            readonly type: "bytes";
        }, {
            readonly name: "signature";
            readonly type: "bytes";
        }];
        readonly name: "op";
        readonly type: "tuple";
    }, {
        readonly name: "target";
        readonly type: "address";
    }, {
        readonly name: "targetCallData";
        readonly type: "bytes";
    }];
    readonly name: "simulateHandleOp";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly name: "sender";
            readonly type: "address";
        }, {
            readonly name: "nonce";
            readonly type: "uint256";
        }, {
            readonly name: "initCode";
            readonly type: "bytes";
        }, {
            readonly name: "callData";
            readonly type: "bytes";
        }, {
            readonly name: "callGasLimit";
            readonly type: "uint256";
        }, {
            readonly name: "verificationGasLimit";
            readonly type: "uint256";
        }, {
            readonly name: "preVerificationGas";
            readonly type: "uint256";
        }, {
            readonly name: "maxFeePerGas";
            readonly type: "uint256";
        }, {
            readonly name: "maxPriorityFeePerGas";
            readonly type: "uint256";
        }, {
            readonly name: "paymasterAndData";
            readonly type: "bytes";
        }, {
            readonly name: "signature";
            readonly type: "bytes";
        }];
        readonly name: "userOp";
        readonly type: "tuple";
    }];
    readonly name: "simulateValidation";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "unlockStake";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly name: "withdrawAddress";
        readonly type: "address";
    }];
    readonly name: "withdrawStake";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly name: "withdrawAddress";
        readonly type: "address";
    }, {
        readonly name: "withdrawAmount";
        readonly type: "uint256";
    }];
    readonly name: "withdrawTo";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly stateMutability: "payable";
    readonly type: "receive";
}];
export declare const entryPoint07Abi: readonly [{
    readonly inputs: readonly [{
        readonly name: "success";
        readonly type: "bool";
    }, {
        readonly name: "ret";
        readonly type: "bytes";
    }];
    readonly name: "DelegateAndRevert";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly name: "opIndex";
        readonly type: "uint256";
    }, {
        readonly name: "reason";
        readonly type: "string";
    }];
    readonly name: "FailedOp";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly name: "opIndex";
        readonly type: "uint256";
    }, {
        readonly name: "reason";
        readonly type: "string";
    }, {
        readonly name: "inner";
        readonly type: "bytes";
    }];
    readonly name: "FailedOpWithRevert";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly name: "returnData";
        readonly type: "bytes";
    }];
    readonly name: "PostOpReverted";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "ReentrancyGuardReentrantCall";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly name: "sender";
        readonly type: "address";
    }];
    readonly name: "SenderAddressResult";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly name: "aggregator";
        readonly type: "address";
    }];
    readonly name: "SignatureValidationFailed";
    readonly type: "error";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly name: "userOpHash";
        readonly type: "bytes32";
    }, {
        readonly indexed: true;
        readonly name: "sender";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly name: "factory";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly name: "paymaster";
        readonly type: "address";
    }];
    readonly name: "AccountDeployed";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [];
    readonly name: "BeforeExecution";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly name: "account";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly name: "totalDeposit";
        readonly type: "uint256";
    }];
    readonly name: "Deposited";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly name: "userOpHash";
        readonly type: "bytes32";
    }, {
        readonly indexed: true;
        readonly name: "sender";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly name: "nonce";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly name: "revertReason";
        readonly type: "bytes";
    }];
    readonly name: "PostOpRevertReason";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly name: "aggregator";
        readonly type: "address";
    }];
    readonly name: "SignatureAggregatorChanged";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly name: "account";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly name: "totalStaked";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly name: "unstakeDelaySec";
        readonly type: "uint256";
    }];
    readonly name: "StakeLocked";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly name: "account";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly name: "withdrawTime";
        readonly type: "uint256";
    }];
    readonly name: "StakeUnlocked";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly name: "account";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly name: "withdrawAddress";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly name: "amount";
        readonly type: "uint256";
    }];
    readonly name: "StakeWithdrawn";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly name: "userOpHash";
        readonly type: "bytes32";
    }, {
        readonly indexed: true;
        readonly name: "sender";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly name: "paymaster";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly name: "nonce";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly name: "success";
        readonly type: "bool";
    }, {
        readonly indexed: false;
        readonly name: "actualGasCost";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly name: "actualGasUsed";
        readonly type: "uint256";
    }];
    readonly name: "UserOperationEvent";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly name: "userOpHash";
        readonly type: "bytes32";
    }, {
        readonly indexed: true;
        readonly name: "sender";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly name: "nonce";
        readonly type: "uint256";
    }];
    readonly name: "UserOperationPrefundTooLow";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly name: "userOpHash";
        readonly type: "bytes32";
    }, {
        readonly indexed: true;
        readonly name: "sender";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly name: "nonce";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly name: "revertReason";
        readonly type: "bytes";
    }];
    readonly name: "UserOperationRevertReason";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly name: "account";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly name: "withdrawAddress";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly name: "amount";
        readonly type: "uint256";
    }];
    readonly name: "Withdrawn";
    readonly type: "event";
}, {
    readonly inputs: readonly [{
        readonly name: "unstakeDelaySec";
        readonly type: "uint32";
    }];
    readonly name: "addStake";
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly name: "account";
        readonly type: "address";
    }];
    readonly name: "balanceOf";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly name: "target";
        readonly type: "address";
    }, {
        readonly name: "data";
        readonly type: "bytes";
    }];
    readonly name: "delegateAndRevert";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly name: "account";
        readonly type: "address";
    }];
    readonly name: "depositTo";
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly name: "";
        readonly type: "address";
    }];
    readonly name: "deposits";
    readonly outputs: readonly [{
        readonly name: "deposit";
        readonly type: "uint256";
    }, {
        readonly name: "staked";
        readonly type: "bool";
    }, {
        readonly name: "stake";
        readonly type: "uint112";
    }, {
        readonly name: "unstakeDelaySec";
        readonly type: "uint32";
    }, {
        readonly name: "withdrawTime";
        readonly type: "uint48";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly name: "account";
        readonly type: "address";
    }];
    readonly name: "getDepositInfo";
    readonly outputs: readonly [{
        readonly components: readonly [{
            readonly name: "deposit";
            readonly type: "uint256";
        }, {
            readonly name: "staked";
            readonly type: "bool";
        }, {
            readonly name: "stake";
            readonly type: "uint112";
        }, {
            readonly name: "unstakeDelaySec";
            readonly type: "uint32";
        }, {
            readonly name: "withdrawTime";
            readonly type: "uint48";
        }];
        readonly name: "info";
        readonly type: "tuple";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly name: "sender";
        readonly type: "address";
    }, {
        readonly name: "key";
        readonly type: "uint192";
    }];
    readonly name: "getNonce";
    readonly outputs: readonly [{
        readonly name: "nonce";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly name: "initCode";
        readonly type: "bytes";
    }];
    readonly name: "getSenderAddress";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly name: "sender";
            readonly type: "address";
        }, {
            readonly name: "nonce";
            readonly type: "uint256";
        }, {
            readonly name: "initCode";
            readonly type: "bytes";
        }, {
            readonly name: "callData";
            readonly type: "bytes";
        }, {
            readonly name: "accountGasLimits";
            readonly type: "bytes32";
        }, {
            readonly name: "preVerificationGas";
            readonly type: "uint256";
        }, {
            readonly name: "gasFees";
            readonly type: "bytes32";
        }, {
            readonly name: "paymasterAndData";
            readonly type: "bytes";
        }, {
            readonly name: "signature";
            readonly type: "bytes";
        }];
        readonly name: "userOp";
        readonly type: "tuple";
    }];
    readonly name: "getUserOpHash";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bytes32";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly components: readonly [{
                readonly name: "sender";
                readonly type: "address";
            }, {
                readonly name: "nonce";
                readonly type: "uint256";
            }, {
                readonly name: "initCode";
                readonly type: "bytes";
            }, {
                readonly name: "callData";
                readonly type: "bytes";
            }, {
                readonly name: "accountGasLimits";
                readonly type: "bytes32";
            }, {
                readonly name: "preVerificationGas";
                readonly type: "uint256";
            }, {
                readonly name: "gasFees";
                readonly type: "bytes32";
            }, {
                readonly name: "paymasterAndData";
                readonly type: "bytes";
            }, {
                readonly name: "signature";
                readonly type: "bytes";
            }];
            readonly name: "userOps";
            readonly type: "tuple[]";
        }, {
            readonly name: "aggregator";
            readonly type: "address";
        }, {
            readonly name: "signature";
            readonly type: "bytes";
        }];
        readonly name: "opsPerAggregator";
        readonly type: "tuple[]";
    }, {
        readonly name: "beneficiary";
        readonly type: "address";
    }];
    readonly name: "handleAggregatedOps";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly name: "sender";
            readonly type: "address";
        }, {
            readonly name: "nonce";
            readonly type: "uint256";
        }, {
            readonly name: "initCode";
            readonly type: "bytes";
        }, {
            readonly name: "callData";
            readonly type: "bytes";
        }, {
            readonly name: "accountGasLimits";
            readonly type: "bytes32";
        }, {
            readonly name: "preVerificationGas";
            readonly type: "uint256";
        }, {
            readonly name: "gasFees";
            readonly type: "bytes32";
        }, {
            readonly name: "paymasterAndData";
            readonly type: "bytes";
        }, {
            readonly name: "signature";
            readonly type: "bytes";
        }];
        readonly name: "ops";
        readonly type: "tuple[]";
    }, {
        readonly name: "beneficiary";
        readonly type: "address";
    }];
    readonly name: "handleOps";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly name: "key";
        readonly type: "uint192";
    }];
    readonly name: "incrementNonce";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly name: "callData";
        readonly type: "bytes";
    }, {
        readonly components: readonly [{
            readonly components: readonly [{
                readonly name: "sender";
                readonly type: "address";
            }, {
                readonly name: "nonce";
                readonly type: "uint256";
            }, {
                readonly name: "verificationGasLimit";
                readonly type: "uint256";
            }, {
                readonly name: "callGasLimit";
                readonly type: "uint256";
            }, {
                readonly name: "paymasterVerificationGasLimit";
                readonly type: "uint256";
            }, {
                readonly name: "paymasterPostOpGasLimit";
                readonly type: "uint256";
            }, {
                readonly name: "preVerificationGas";
                readonly type: "uint256";
            }, {
                readonly name: "paymaster";
                readonly type: "address";
            }, {
                readonly name: "maxFeePerGas";
                readonly type: "uint256";
            }, {
                readonly name: "maxPriorityFeePerGas";
                readonly type: "uint256";
            }];
            readonly name: "mUserOp";
            readonly type: "tuple";
        }, {
            readonly name: "userOpHash";
            readonly type: "bytes32";
        }, {
            readonly name: "prefund";
            readonly type: "uint256";
        }, {
            readonly name: "contextOffset";
            readonly type: "uint256";
        }, {
            readonly name: "preOpGas";
            readonly type: "uint256";
        }];
        readonly name: "opInfo";
        readonly type: "tuple";
    }, {
        readonly name: "context";
        readonly type: "bytes";
    }];
    readonly name: "innerHandleOp";
    readonly outputs: readonly [{
        readonly name: "actualGasCost";
        readonly type: "uint256";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly name: "";
        readonly type: "address";
    }, {
        readonly name: "";
        readonly type: "uint192";
    }];
    readonly name: "nonceSequenceNumber";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly name: "interfaceId";
        readonly type: "bytes4";
    }];
    readonly name: "supportsInterface";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "unlockStake";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly name: "withdrawAddress";
        readonly type: "address";
    }];
    readonly name: "withdrawStake";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly name: "withdrawAddress";
        readonly type: "address";
    }, {
        readonly name: "withdrawAmount";
        readonly type: "uint256";
    }];
    readonly name: "withdrawTo";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly stateMutability: "payable";
    readonly type: "receive";
}];
//# sourceMappingURL=abis.d.ts.map