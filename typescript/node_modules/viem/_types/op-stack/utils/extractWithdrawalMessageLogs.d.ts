import type { ErrorType } from '../../errors/utils.js';
import type { Log } from '../../types/log.js';
import { type ParseEventLogsErrorType } from '../../utils/abi/parseEventLogs.js';
import { l2ToL1MessagePasserAbi } from '../abis.js';
export type ExtractWithdrawalMessageLogsParameters = {
    /** An opaque array of logs. */
    logs: Log[];
};
export type ExtractWithdrawalMessageLogsReturnType = Log<bigint, number, false, undefined, true, typeof l2ToL1MessagePasserAbi, 'MessagePassed'>[];
export type ExtractWithdrawalMessageLogsErrorType = ParseEventLogsErrorType | ErrorType;
export declare function extractWithdrawalMessageLogs({ logs, }: ExtractWithdrawalMessageLogsParameters): import("../../utils/abi/parseEventLogs.js").ParseEventLogsReturnType<readonly [{
    readonly inputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "constructor";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "uint256";
        readonly name: "nonce";
        readonly type: "uint256";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "sender";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "target";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "value";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "gasLimit";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "bytes";
        readonly name: "data";
        readonly type: "bytes";
    }, {
        readonly indexed: false;
        readonly internalType: "bytes32";
        readonly name: "withdrawalHash";
        readonly type: "bytes32";
    }];
    readonly name: "MessagePassed";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "uint256";
        readonly name: "amount";
        readonly type: "uint256";
    }];
    readonly name: "WithdrawerBalanceBurnt";
    readonly type: "event";
}, {
    readonly inputs: readonly [];
    readonly name: "MESSAGE_VERSION";
    readonly outputs: readonly [{
        readonly internalType: "uint16";
        readonly name: "";
        readonly type: "uint16";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "burn";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_target";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "_gasLimit";
        readonly type: "uint256";
    }, {
        readonly internalType: "bytes";
        readonly name: "_data";
        readonly type: "bytes";
    }];
    readonly name: "initiateWithdrawal";
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "messageNonce";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "";
        readonly type: "bytes32";
    }];
    readonly name: "sentMessages";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "";
        readonly type: "bool";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "version";
    readonly outputs: readonly [{
        readonly internalType: "string";
        readonly name: "";
        readonly type: "string";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly stateMutability: "payable";
    readonly type: "receive";
}], "MessagePassed", true, "MessagePassed">;
//# sourceMappingURL=extractWithdrawalMessageLogs.d.ts.map