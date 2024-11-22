import type * as Address from '../../Address.js';
import type * as Hex from '../../Hex.js';
import type * as RpcSchema from '../../RpcSchema.js';
import type * as TransactionRequest from '../../TransactionRequest.js';
import type { Compute } from '../types.js';
/**
 * Union of all JSON-RPC Methods for the `wallet_` namespace.
 *
 * @example
 * ```ts twoslash
 * import { RpcSchema } from 'ox'
 *
 * type Schema = RpcSchema.Wallet
 * //   ^?
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * ```
 */
export type Wallet = RpcSchema.From<
/**
 * Requests that the user provides an Ethereum address to be identified by.
 *
 * @see {@link https://eips.ethereum.org/EIPS/eip-1102}
 */
{
    Request: {
        method: 'eth_requestAccounts';
        params?: undefined;
    };
    ReturnType: readonly Address.Address[];
}
/**
 * Sends a **signed** transaction to the network
 *
 * @example
 * ```
 * request({ method: 'eth_sendRawTransaction', params: ['0x...'] })
 * // => '0x...'
 * ```
 */
 | {
    Request: {
        method: 'eth_sendRawTransaction';
        params: [serializedTransaction: Hex.Hex];
    };
    ReturnType: Hex.Hex;
}
/**
 * Creates, signs, and sends a new transaction to the network
 *
 * @example
 * ```
 * request({ method: 'eth_sendTransaction', params: [{ from: '0x...', to: '0x...', value: '0x...' }] })
 * // '0x...'
 * ```
 */
 | {
    Request: {
        method: 'eth_sendTransaction';
        params: [transaction: TransactionRequest.Rpc];
    };
    ReturnType: Hex.Hex;
}
/**
 * Signs a transaction that can be submitted to the network at a later time using with `eth_sendRawTransaction`
 *
 * @example
 * ```
 * request({ method: 'eth_signTransaction', params: [{ from: '0x...', to: '0x...', value: '0x...' }] })
 * // '0x...'
 * ```
 */
 | {
    Request: {
        method: 'eth_signTransaction';
        params: [request: TransactionRequest.Rpc];
    };
    ReturnType: Hex.Hex;
}
/**
 * Calculates an Ethereum-specific signature in the form of `keccak256("\x19Ethereum Signed Message:\n" + len(message) + message))`
 *
 * @example
 * ```
 * request({ method: 'eth_signTypedData_v4', params: [{ from: '0x...', data: [{ type: 'string', name: 'message', value: 'hello world' }] }] })
 * // '0x...'
 * ```
 */
 | {
    Request: {
        method: 'eth_signTypedData_v4';
        params: [
            /** Address to use for signing */
            address: Address.Address,
            /** Message to sign containing type information, a domain separator, and data */
            message: string
        ];
    };
    ReturnType: Hex.Hex;
}
/**
 * Calculates an Ethereum-specific signature in the form of `keccak256("\x19Ethereum Signed Message:\n" + len(message) + message))`
 *
 * @see {@link https://eips.ethereum.org/EIPS/eip-1474}
 */
 | {
    Request: {
        method: 'personal_sign';
        params: [
            /** Data to sign */
            data: Hex.Hex,
            /** Address to use for signing */
            address: Address.Address
        ];
    };
    ReturnType: Hex.Hex;
}
/**
 * Add an Ethereum chain to the wallet.
 *
 * @see {@link https://eips.ethereum.org/EIPS/eip-3085}
 */
 | {
    Request: {
        method: 'wallet_addEthereumChain';
        params: [chain: Compute<WalletAddEthereumChainParameters>];
    };
    ReturnType: null;
}
/**
 * Returns the status of a call batch that was sent via `wallet_sendCalls`.
 *
 * @see {@link https://eips.ethereum.org/EIPS/eip-5792}
 */
 | {
    Request: {
        method: 'wallet_getCallsStatus';
        params?: [string];
    };
    ReturnType: Compute<WalletGetCallsStatusReturnType>;
}
/**
 * Gets the connected wallet's capabilities.
 *
 * @see {@link https://eips.ethereum.org/EIPS/eip-5792}
 */
 | {
    Request: {
        method: 'wallet_getCapabilities';
        params?: [Address.Address];
    };
    ReturnType: Compute<WalletCapabilitiesMap>;
}
/**
 * Gets the wallets current permissions.
 *
 * @see {@link https://eips.ethereum.org/EIPS/eip-2255}
 */
 | {
    Request: {
        method: 'wallet_getPermissions';
        params?: undefined;
    };
    ReturnType: readonly Compute<WalletPermission>[];
}
/**
 * Requests permissions from a wallet.
 *
 * @see {@link https://eips.ethereum.org/EIPS/eip-7715}
 */
 | {
    Request: {
        method: 'wallet_grantPermissions';
        params?: [WalletGrantPermissionsParameters];
    };
    ReturnType: Compute<WalletGrantPermissionsReturnType>;
}
/**
 * Requests the given permissions from the user.
 *
 * @see {@link https://eips.ethereum.org/EIPS/eip-2255}
 */
 | {
    Request: {
        method: 'wallet_requestPermissions';
        params: [permissions: {
            eth_accounts: Record<string, any>;
        }];
    };
    ReturnType: readonly Compute<WalletPermission>[];
}
/**
 * Revokes the given permissions from the user.
 *
 * @see {@link https://github.com/MetaMask/metamask-improvement-proposals/blob/main/MIPs/mip-2.md}
 */
 | {
    Request: {
        method: 'wallet_revokePermissions';
        params: [permissions: {
            eth_accounts: Record<string, any>;
        }];
    };
    ReturnType: null;
}
/**
 * Requests the connected wallet to send a batch of calls.
 *
 * @see {@link https://eips.ethereum.org/EIPS/eip-5792}
 */
 | {
    Request: {
        method: 'wallet_sendCalls';
        params: Compute<WalletSendCallsParameters>;
    };
    ReturnType: string;
}
/**
 * Requests for the wallet to show information about a call batch
 * that was sent via `wallet_sendCalls`.
 *
 * @see {@link https://eips.ethereum.org/EIPS/eip-5792}
 */
 | {
    Request: {
        method: 'wallet_showCallsStatus';
        params: [string];
    };
    ReturnType: undefined;
}
/**
 * Switch the wallet to the given Ethereum chain.
 *
 * @see {@link https://eips.ethereum.org/EIPS/eip-3326}
 */
 | {
    Request: {
        method: 'wallet_switchEthereumChain';
        params: [chain: {
            chainId: string;
        }];
    };
    ReturnType: null;
}
/**
 * Requests that the user tracks the token in their wallet. Returns a boolean indicating if the token was successfully added.
 *
 * @see {@link https://eips.ethereum.org/EIPS/eip-747}
 */
 | {
    Request: {
        method: 'wallet_watchAsset';
        params: [Compute<WalletWatchAssetParameters>];
    };
    ReturnType: boolean;
}>;
/**
 * Parameters for `wallet_addEthereumChain`. [See more](https://eips.ethereum.org/EIPS/eip-3085).
 * @internal
 */
type WalletAddEthereumChainParameters = {
    /** A 0x-prefixed hexadecimal string */
    chainId: string;
    /** The chain name. */
    chainName: string;
    /** Native currency for the chain. */
    nativeCurrency?: {
        name: string;
        symbol: string;
        decimals: number;
    } | undefined;
    rpcUrls: readonly string[];
    blockExplorerUrls?: readonly string[] | undefined;
    iconUrls?: readonly string[] | undefined;
};
/**
 * Capabilities of a wallet. [See more](https://eips.ethereum.org/EIPS/eip-5792#wallet_getcapabilities).
 * @internal
 */
type WalletCapabilities = {
    [capability: string]: any;
};
/**
 * Capabilities of a wallet, mapped to chain IDs. [See more](https://eips.ethereum.org/EIPS/eip-5792#wallet_getcapabilities).
 * @internal
 */
type WalletCapabilitiesMap = {
    [chainId: Hex.Hex]: WalletCapabilities;
};
/**
 * Return type for `wallet_getCallsStatus`. [See more](https://eips.ethereum.org/EIPS/eip-5792#wallet_getcallsstatus).
 * @internal
 */
type WalletGetCallsStatusReturnType = {
    status: 'PENDING' | 'CONFIRMED';
    receipts?: readonly {
        logs: {
            address: Hex.Hex;
            data: Hex.Hex;
            topics: readonly Hex.Hex[];
        }[];
        status: Hex.Hex;
        blockHash: Hex.Hex;
        blockNumber: Hex.Hex;
        gasUsed: Hex.Hex;
        transactionHash: Hex.Hex;
    }[] | undefined;
};
/**
 * Caveat for a wallet permission. [See more](https://eips.ethereum.org/EIPS/eip-2255).
 * @internal
 */
type WalletPermissionCaveat = {
    type: string;
    value: any;
};
/**
 * A wallet permission. [See more](https://eips.ethereum.org/EIPS/eip-2255).
 * @internal
 */
type WalletPermission = {
    caveats: readonly WalletPermissionCaveat[];
    date: number;
    id: string;
    invoker: `http://${string}` | `https://${string}`;
    parentCapability: 'eth_accounts' | string;
};
/**
 * Parameters for `wallet_grantPermissions`. [See more](https://eips.ethereum.org/EIPS/eip-7715).
 * @internal
 */
type WalletGrantPermissionsParameters = {
    signer?: {
        type: string;
        data?: unknown | undefined;
    } | undefined;
    permissions: readonly {
        data: unknown;
        policies: readonly {
            data: unknown;
            type: string;
        }[];
        required?: boolean | undefined;
        type: string;
    }[];
    expiry: number;
};
/**
 * Return type for `wallet_grantPermissions`. [See more](https://eips.ethereum.org/EIPS/eip-7715).
 * @internal
 */
type WalletGrantPermissionsReturnType = {
    expiry: number;
    factory?: `0x${string}` | undefined;
    factoryData?: string | undefined;
    grantedPermissions: readonly {
        data: unknown;
        policies: readonly {
            data: unknown;
            type: string;
        }[];
        required?: boolean | undefined;
        type: string;
    }[];
    permissionsContext: string;
    signerData?: {
        userOpBuilder?: `0x${string}` | undefined;
        submitToAddress?: `0x${string}` | undefined;
    } | undefined;
};
/**
 * Parameters for `wallet_sendCalls`. [See more](https://eips.ethereum.org/EIPS/eip-5792).
 * @internal
 */
type WalletSendCallsParameters = [
    {
        calls: readonly {
            to?: Address.Address | undefined;
            data?: Hex.Hex | undefined;
            value?: Hex.Hex | undefined;
        }[];
        capabilities?: WalletCapabilities | undefined;
        chainId?: Hex.Hex | undefined;
        from: Address.Address;
        version: string;
    }
];
/**
 * Parameters for `wallet_watchAsset`. [See more](https://eips.ethereum.org/EIPS/eip-747).
 * @internal
 */
type WalletWatchAssetParameters = {
    /** Token type. */
    type: 'ERC20';
    options: {
        /** The address of the token contract */
        address: string;
        /** A ticker symbol or shorthand, up to 11 characters */
        symbol: string;
        /** The number of token decimals */
        decimals: number;
        /** A string url of the token logo */
        image?: string | undefined;
    };
};
export {};
//# sourceMappingURL=wallet.d.ts.map