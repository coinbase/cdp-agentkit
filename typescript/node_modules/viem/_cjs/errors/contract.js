"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RawContractError = exports.CounterfactualDeploymentFailedError = exports.ContractFunctionZeroDataError = exports.ContractFunctionRevertedError = exports.ContractFunctionExecutionError = exports.CallExecutionError = void 0;
const parseAccount_js_1 = require("../accounts/utils/parseAccount.js");
const solidity_js_1 = require("../constants/solidity.js");
const decodeErrorResult_js_1 = require("../utils/abi/decodeErrorResult.js");
const formatAbiItem_js_1 = require("../utils/abi/formatAbiItem.js");
const formatAbiItemWithArgs_js_1 = require("../utils/abi/formatAbiItemWithArgs.js");
const getAbiItem_js_1 = require("../utils/abi/getAbiItem.js");
const formatEther_js_1 = require("../utils/unit/formatEther.js");
const formatGwei_js_1 = require("../utils/unit/formatGwei.js");
const abi_js_1 = require("./abi.js");
const base_js_1 = require("./base.js");
const stateOverride_js_1 = require("./stateOverride.js");
const transaction_js_1 = require("./transaction.js");
const utils_js_1 = require("./utils.js");
class CallExecutionError extends base_js_1.BaseError {
    constructor(cause, { account: account_, docsPath, chain, data, gas, gasPrice, maxFeePerGas, maxPriorityFeePerGas, nonce, to, value, stateOverride, }) {
        const account = account_ ? (0, parseAccount_js_1.parseAccount)(account_) : undefined;
        let prettyArgs = (0, transaction_js_1.prettyPrint)({
            from: account?.address,
            to,
            value: typeof value !== 'undefined' &&
                `${(0, formatEther_js_1.formatEther)(value)} ${chain?.nativeCurrency?.symbol || 'ETH'}`,
            data,
            gas,
            gasPrice: typeof gasPrice !== 'undefined' && `${(0, formatGwei_js_1.formatGwei)(gasPrice)} gwei`,
            maxFeePerGas: typeof maxFeePerGas !== 'undefined' &&
                `${(0, formatGwei_js_1.formatGwei)(maxFeePerGas)} gwei`,
            maxPriorityFeePerGas: typeof maxPriorityFeePerGas !== 'undefined' &&
                `${(0, formatGwei_js_1.formatGwei)(maxPriorityFeePerGas)} gwei`,
            nonce,
        });
        if (stateOverride) {
            prettyArgs += `\n${(0, stateOverride_js_1.prettyStateOverride)(stateOverride)}`;
        }
        super(cause.shortMessage, {
            cause,
            docsPath,
            metaMessages: [
                ...(cause.metaMessages ? [...cause.metaMessages, ' '] : []),
                'Raw Call Arguments:',
                prettyArgs,
            ].filter(Boolean),
            name: 'CallExecutionError',
        });
        Object.defineProperty(this, "cause", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.cause = cause;
    }
}
exports.CallExecutionError = CallExecutionError;
class ContractFunctionExecutionError extends base_js_1.BaseError {
    constructor(cause, { abi, args, contractAddress, docsPath, functionName, sender, }) {
        const abiItem = (0, getAbiItem_js_1.getAbiItem)({ abi, args, name: functionName });
        const formattedArgs = abiItem
            ? (0, formatAbiItemWithArgs_js_1.formatAbiItemWithArgs)({
                abiItem,
                args,
                includeFunctionName: false,
                includeName: false,
            })
            : undefined;
        const functionWithParams = abiItem
            ? (0, formatAbiItem_js_1.formatAbiItem)(abiItem, { includeName: true })
            : undefined;
        const prettyArgs = (0, transaction_js_1.prettyPrint)({
            address: contractAddress && (0, utils_js_1.getContractAddress)(contractAddress),
            function: functionWithParams,
            args: formattedArgs &&
                formattedArgs !== '()' &&
                `${[...Array(functionName?.length ?? 0).keys()]
                    .map(() => ' ')
                    .join('')}${formattedArgs}`,
            sender,
        });
        super(cause.shortMessage ||
            `An unknown error occurred while executing the contract function "${functionName}".`, {
            cause,
            docsPath,
            metaMessages: [
                ...(cause.metaMessages ? [...cause.metaMessages, ' '] : []),
                prettyArgs && 'Contract Call:',
                prettyArgs,
            ].filter(Boolean),
            name: 'ContractFunctionExecutionError',
        });
        Object.defineProperty(this, "abi", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "args", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "cause", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "contractAddress", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "formattedArgs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "functionName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "sender", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.abi = abi;
        this.args = args;
        this.cause = cause;
        this.contractAddress = contractAddress;
        this.functionName = functionName;
        this.sender = sender;
    }
}
exports.ContractFunctionExecutionError = ContractFunctionExecutionError;
class ContractFunctionRevertedError extends base_js_1.BaseError {
    constructor({ abi, data, functionName, message, }) {
        let cause;
        let decodedData = undefined;
        let metaMessages;
        let reason;
        if (data && data !== '0x') {
            try {
                decodedData = (0, decodeErrorResult_js_1.decodeErrorResult)({ abi, data });
                const { abiItem, errorName, args: errorArgs } = decodedData;
                if (errorName === 'Error') {
                    reason = errorArgs[0];
                }
                else if (errorName === 'Panic') {
                    const [firstArg] = errorArgs;
                    reason = solidity_js_1.panicReasons[firstArg];
                }
                else {
                    const errorWithParams = abiItem
                        ? (0, formatAbiItem_js_1.formatAbiItem)(abiItem, { includeName: true })
                        : undefined;
                    const formattedArgs = abiItem && errorArgs
                        ? (0, formatAbiItemWithArgs_js_1.formatAbiItemWithArgs)({
                            abiItem,
                            args: errorArgs,
                            includeFunctionName: false,
                            includeName: false,
                        })
                        : undefined;
                    metaMessages = [
                        errorWithParams ? `Error: ${errorWithParams}` : '',
                        formattedArgs && formattedArgs !== '()'
                            ? `       ${[...Array(errorName?.length ?? 0).keys()]
                                .map(() => ' ')
                                .join('')}${formattedArgs}`
                            : '',
                    ];
                }
            }
            catch (err) {
                cause = err;
            }
        }
        else if (message)
            reason = message;
        let signature;
        if (cause instanceof abi_js_1.AbiErrorSignatureNotFoundError) {
            signature = cause.signature;
            metaMessages = [
                `Unable to decode signature "${signature}" as it was not found on the provided ABI.`,
                'Make sure you are using the correct ABI and that the error exists on it.',
                `You can look up the decoded signature here: https://openchain.xyz/signatures?query=${signature}.`,
            ];
        }
        super((reason && reason !== 'execution reverted') || signature
            ? [
                `The contract function "${functionName}" reverted with the following ${signature ? 'signature' : 'reason'}:`,
                reason || signature,
            ].join('\n')
            : `The contract function "${functionName}" reverted.`, {
            cause,
            metaMessages,
            name: 'ContractFunctionRevertedError',
        });
        Object.defineProperty(this, "data", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "reason", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "signature", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.data = decodedData;
        this.reason = reason;
        this.signature = signature;
    }
}
exports.ContractFunctionRevertedError = ContractFunctionRevertedError;
class ContractFunctionZeroDataError extends base_js_1.BaseError {
    constructor({ functionName }) {
        super(`The contract function "${functionName}" returned no data ("0x").`, {
            metaMessages: [
                'This could be due to any of the following:',
                `  - The contract does not have the function "${functionName}",`,
                '  - The parameters passed to the contract function may be invalid, or',
                '  - The address is not a contract.',
            ],
            name: 'ContractFunctionZeroDataError',
        });
    }
}
exports.ContractFunctionZeroDataError = ContractFunctionZeroDataError;
class CounterfactualDeploymentFailedError extends base_js_1.BaseError {
    constructor({ factory }) {
        super(`Deployment for counterfactual contract call failed${factory ? ` for factory "${factory}".` : ''}`, {
            metaMessages: [
                'Please ensure:',
                '- The `factory` is a valid contract deployment factory (ie. Create2 Factory, ERC-4337 Factory, etc).',
                '- The `factoryData` is a valid encoded function call for contract deployment function on the factory.',
            ],
            name: 'CounterfactualDeploymentFailedError',
        });
    }
}
exports.CounterfactualDeploymentFailedError = CounterfactualDeploymentFailedError;
class RawContractError extends base_js_1.BaseError {
    constructor({ data, message, }) {
        super(message || '', { name: 'RawContractError' });
        Object.defineProperty(this, "code", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 3
        });
        Object.defineProperty(this, "data", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.data = data;
    }
}
exports.RawContractError = RawContractError;
//# sourceMappingURL=contract.js.map