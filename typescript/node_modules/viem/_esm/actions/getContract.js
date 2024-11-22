import { getAction } from '../utils/getAction.js';
import { createContractEventFilter, } from './public/createContractEventFilter.js';
import { estimateContractGas, } from './public/estimateContractGas.js';
import { getContractEvents, } from './public/getContractEvents.js';
import { readContract, } from './public/readContract.js';
import { simulateContract, } from './public/simulateContract.js';
import { watchContractEvent, } from './public/watchContractEvent.js';
import { writeContract, } from './wallet/writeContract.js';
/**
 * Gets type-safe interface for performing contract-related actions with a specific `abi` and `address`.
 *
 * - Docs https://viem.sh/docs/contract/getContract
 *
 * Using Contract Instances can make it easier to work with contracts if you don't want to pass the `abi` and `address` properties every time you perform contract actions, e.g. [`readContract`](https://viem.sh/docs/contract/readContract), [`writeContract`](https://viem.sh/docs/contract/writeContract), [`estimateContractGas`](https://viem.sh/docs/contract/estimateContractGas), etc.
 *
 * @example
 * import { createPublicClient, getContract, http, parseAbi } from 'viem'
 * import { mainnet } from 'viem/chains'
 *
 * const publicClient = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const contract = getContract({
 *   address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
 *   abi: parseAbi([
 *     'function balanceOf(address owner) view returns (uint256)',
 *     'function ownerOf(uint256 tokenId) view returns (address)',
 *     'function totalSupply() view returns (uint256)',
 *   ]),
 *   client: publicClient,
 * })
 */
export function getContract({ abi, address, client: client_, }) {
    const client = client_;
    const [publicClient, walletClient] = (() => {
        if (!client)
            return [undefined, undefined];
        if ('public' in client && 'wallet' in client)
            return [client.public, client.wallet];
        if ('public' in client)
            return [client.public, undefined];
        if ('wallet' in client)
            return [undefined, client.wallet];
        return [client, client];
    })();
    const hasPublicClient = publicClient !== undefined && publicClient !== null;
    const hasWalletClient = walletClient !== undefined && walletClient !== null;
    const contract = {};
    let hasReadFunction = false;
    let hasWriteFunction = false;
    let hasEvent = false;
    for (const item of abi) {
        if (item.type === 'function')
            if (item.stateMutability === 'view' || item.stateMutability === 'pure')
                hasReadFunction = true;
            else
                hasWriteFunction = true;
        else if (item.type === 'event')
            hasEvent = true;
        // Exit early if all flags are `true`
        if (hasReadFunction && hasWriteFunction && hasEvent)
            break;
    }
    if (hasPublicClient) {
        if (hasReadFunction)
            contract.read = new Proxy({}, {
                get(_, functionName) {
                    return (...parameters) => {
                        const { args, options } = getFunctionParameters(parameters);
                        return getAction(publicClient, readContract, 'readContract')({
                            abi,
                            address,
                            functionName,
                            args,
                            ...options,
                        });
                    };
                },
            });
        if (hasWriteFunction)
            contract.simulate = new Proxy({}, {
                get(_, functionName) {
                    return (...parameters) => {
                        const { args, options } = getFunctionParameters(parameters);
                        return getAction(publicClient, simulateContract, 'simulateContract')({
                            abi,
                            address,
                            functionName,
                            args,
                            ...options,
                        });
                    };
                },
            });
        if (hasEvent) {
            contract.createEventFilter = new Proxy({}, {
                get(_, eventName) {
                    return (...parameters) => {
                        const abiEvent = abi.find((x) => x.type === 'event' && x.name === eventName);
                        const { args, options } = getEventParameters(parameters, abiEvent);
                        return getAction(publicClient, createContractEventFilter, 'createContractEventFilter')({
                            abi,
                            address,
                            eventName,
                            args,
                            ...options,
                        });
                    };
                },
            });
            contract.getEvents = new Proxy({}, {
                get(_, eventName) {
                    return (...parameters) => {
                        const abiEvent = abi.find((x) => x.type === 'event' && x.name === eventName);
                        const { args, options } = getEventParameters(parameters, abiEvent);
                        return getAction(publicClient, getContractEvents, 'getContractEvents')({
                            abi,
                            address,
                            eventName,
                            args,
                            ...options,
                        });
                    };
                },
            });
            contract.watchEvent = new Proxy({}, {
                get(_, eventName) {
                    return (...parameters) => {
                        const abiEvent = abi.find((x) => x.type === 'event' && x.name === eventName);
                        const { args, options } = getEventParameters(parameters, abiEvent);
                        return getAction(publicClient, watchContractEvent, 'watchContractEvent')({
                            abi,
                            address,
                            eventName,
                            args,
                            ...options,
                        });
                    };
                },
            });
        }
    }
    if (hasWalletClient) {
        if (hasWriteFunction)
            contract.write = new Proxy({}, {
                get(_, functionName) {
                    return (...parameters) => {
                        const { args, options } = getFunctionParameters(parameters);
                        return getAction(walletClient, writeContract, 'writeContract')({
                            abi,
                            address,
                            functionName,
                            args,
                            ...options,
                        });
                    };
                },
            });
    }
    if (hasPublicClient || hasWalletClient)
        if (hasWriteFunction)
            contract.estimateGas = new Proxy({}, {
                get(_, functionName) {
                    return (...parameters) => {
                        const { args, options } = getFunctionParameters(parameters);
                        const client = (publicClient ?? walletClient);
                        return getAction(client, estimateContractGas, 'estimateContractGas')({
                            abi,
                            address,
                            functionName,
                            args,
                            ...options,
                            account: options.account ??
                                walletClient.account,
                        });
                    };
                },
            });
    contract.address = address;
    contract.abi = abi;
    return contract;
}
/**
 * @internal exporting for testing only
 */
export function getFunctionParameters(values) {
    const hasArgs = values.length && Array.isArray(values[0]);
    const args = hasArgs ? values[0] : [];
    const options = (hasArgs ? values[1] : values[0]) ?? {};
    return { args, options };
}
/**
 * @internal exporting for testing only
 */
export function getEventParameters(values, abiEvent) {
    let hasArgs = false;
    // If first item is array, must be `args`
    if (Array.isArray(values[0]))
        hasArgs = true;
    // Check if first item is `args` or `options`
    else if (values.length === 1) {
        // if event has indexed inputs, must have `args`
        hasArgs = abiEvent.inputs.some((x) => x.indexed);
        // If there are two items in array, must have `args`
    }
    else if (values.length === 2) {
        hasArgs = true;
    }
    const args = hasArgs ? values[0] : undefined;
    const options = (hasArgs ? values[1] : values[0]) ?? {};
    return { args, options };
}
//# sourceMappingURL=getContract.js.map