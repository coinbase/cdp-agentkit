import { parseAccount } from '../accounts/utils/parseAccount.js';
import { panicReasons } from '../constants/solidity.js';
import { decodeErrorResult, } from '../utils/abi/decodeErrorResult.js';
import { formatAbiItem } from '../utils/abi/formatAbiItem.js';
import { formatAbiItemWithArgs } from '../utils/abi/formatAbiItemWithArgs.js';
import { getAbiItem } from '../utils/abi/getAbiItem.js';
import { formatEther } from '../utils/unit/formatEther.js';
import { formatGwei } from '../utils/unit/formatGwei.js';
import { AbiErrorSignatureNotFoundError } from './abi.js';
import { BaseError } from './base.js';
import { prettyStateOverride } from './stateOverride.js';
import { prettyPrint } from './transaction.js';
import { getContractAddress } from './utils.js';
export class CallExecutionError extends BaseError {
    constructor(cause, { account: account_, docsPath, chain, data, gas, gasPrice, maxFeePerGas, maxPriorityFeePerGas, nonce, to, value, stateOverride, }) {
        const account = account_ ? parseAccount(account_) : undefined;
        let prettyArgs = prettyPrint({
            from: account?.address,
            to,
            value: typeof value !== 'undefined' &&
                `${formatEther(value)} ${chain?.nativeCurrency?.symbol || 'ETH'}`,
            data,
            gas,
            gasPrice: typeof gasPrice !== 'undefined' && `${formatGwei(gasPrice)} gwei`,
            maxFeePerGas: typeof maxFeePerGas !== 'undefined' &&
                `${formatGwei(maxFeePerGas)} gwei`,
            maxPriorityFeePerGas: typeof maxPriorityFeePerGas !== 'undefined' &&
                `${formatGwei(maxPriorityFeePerGas)} gwei`,
            nonce,
        });
        if (stateOverride) {
            prettyArgs += `\n${prettyStateOverride(stateOverride)}`;
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
export class ContractFunctionExecutionError extends BaseError {
    constructor(cause, { abi, args, contractAddress, docsPath, functionName, sender, }) {
        const abiItem = getAbiItem({ abi, args, name: functionName });
        const formattedArgs = abiItem
            ? formatAbiItemWithArgs({
                abiItem,
                args,
                includeFunctionName: false,
                includeName: false,
            })
            : undefined;
        const functionWithParams = abiItem
            ? formatAbiItem(abiItem, { includeName: true })
            : undefined;
        const prettyArgs = prettyPrint({
            address: contractAddress && getContractAddress(contractAddress),
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
export class ContractFunctionRevertedError extends BaseError {
    constructor({ abi, data, functionName, message, }) {
        let cause;
        let decodedData = undefined;
        let metaMessages;
        let reason;
        if (data && data !== '0x') {
            try {
                decodedData = decodeErrorResult({ abi, data });
                const { abiItem, errorName, args: errorArgs } = decodedData;
                if (errorName === 'Error') {
                    reason = errorArgs[0];
                }
                else if (errorName === 'Panic') {
                    const [firstArg] = errorArgs;
                    reason = panicReasons[firstArg];
                }
                else {
                    const errorWithParams = abiItem
                        ? formatAbiItem(abiItem, { includeName: true })
                        : undefined;
                    const formattedArgs = abiItem && errorArgs
                        ? formatAbiItemWithArgs({
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
        if (cause instanceof AbiErrorSignatureNotFoundError) {
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
export class ContractFunctionZeroDataError extends BaseError {
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
export class CounterfactualDeploymentFailedError extends BaseError {
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
export class RawContractError extends BaseError {
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
//# sourceMappingURL=contract.js.map