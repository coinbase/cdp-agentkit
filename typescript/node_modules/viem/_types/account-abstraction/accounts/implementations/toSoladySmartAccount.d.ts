import type { Abi, Address } from 'abitype';
import type { Client } from '../../../clients/createClient.js';
import type { Account } from '../../../types/account.js';
import type { Hex } from '../../../types/misc.js';
import type { Prettify } from '../../../types/utils.js';
import { entryPoint07Abi } from '../../constants/abis.js';
import type { EntryPointVersion } from '../../types/entryPointVersion.js';
import type { SmartAccount, SmartAccountImplementation } from '../types.js';
export type ToSoladySmartAccountParameters<entryPointAbi extends Abi = Abi, entryPointVersion extends EntryPointVersion = EntryPointVersion> = {
    address?: Address | undefined;
    client: Client;
    entryPoint?: {
        abi: entryPointAbi;
        address: Address;
        version: entryPointVersion | EntryPointVersion;
    } | undefined;
    factoryAddress?: Address | undefined;
    getNonce?: SmartAccountImplementation['getNonce'] | undefined;
    owner: Address | Account;
    salt?: Hex | undefined;
};
export type ToSoladySmartAccountReturnType<entryPointAbi extends Abi = Abi, entryPointVersion extends EntryPointVersion = EntryPointVersion> = Prettify<SmartAccount<SoladySmartAccountImplementation<entryPointAbi, entryPointVersion>>>;
export type SoladySmartAccountImplementation<entryPointAbi extends Abi = Abi, entryPointVersion extends EntryPointVersion = EntryPointVersion> = SmartAccountImplementation<entryPointAbi, entryPointVersion, {
    abi: typeof abi;
    factory: {
        abi: typeof factoryAbi;
        address: Address;
    };
}>;
/**
 * @description Create a Solady Smart Account – based off [Solady's `ERC4337.sol`](https://github.com/Vectorized/solady/blob/main/src/accounts/ERC4337.sol).
 *
 * @param parameters - {@link ToSoladySmartAccountParameters}
 * @returns Solady Smart Account. {@link ToSoladySmartAccountReturnType}
 *
 * @example
 * import { toSoladySmartAccount } from 'viem/account-abstraction'
 * import { client } from './client.js'
 *
 * const implementation = toSoladySmartAccount({
 *   client,
 *   owner: '0x...',
 * })
 */
export declare function toSoladySmartAccount<entryPointAbi extends Abi = typeof entryPoint07Abi, entryPointVersion extends EntryPointVersion = '0.7'>(parameters: ToSoladySmartAccountParameters<entryPointAbi, entryPointVersion>): Promise<ToSoladySmartAccountReturnType<entryPointAbi, entryPointVersion>>;
declare const abi: readonly [{
    readonly type: "fallback";
    readonly stateMutability: "payable";
}, {
    readonly type: "receive";
    readonly stateMutability: "payable";
}, {
    readonly type: "function";
    readonly name: "addDeposit";
    readonly inputs: readonly [];
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
}, {
    readonly type: "function";
    readonly name: "cancelOwnershipHandover";
    readonly inputs: readonly [];
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
}, {
    readonly type: "function";
    readonly name: "completeOwnershipHandover";
    readonly inputs: readonly [{
        readonly name: "pendingOwner";
        readonly type: "address";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
}, {
    readonly type: "function";
    readonly name: "delegateExecute";
    readonly inputs: readonly [{
        readonly name: "delegate";
        readonly type: "address";
    }, {
        readonly name: "data";
        readonly type: "bytes";
    }];
    readonly outputs: readonly [{
        readonly name: "result";
        readonly type: "bytes";
    }];
    readonly stateMutability: "payable";
}, {
    readonly type: "function";
    readonly name: "eip712Domain";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "fields";
        readonly type: "bytes1";
    }, {
        readonly name: "name";
        readonly type: "string";
    }, {
        readonly name: "version";
        readonly type: "string";
    }, {
        readonly name: "chainId";
        readonly type: "uint256";
    }, {
        readonly name: "verifyingContract";
        readonly type: "address";
    }, {
        readonly name: "salt";
        readonly type: "bytes32";
    }, {
        readonly name: "extensions";
        readonly type: "uint256[]";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "entryPoint";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "execute";
    readonly inputs: readonly [{
        readonly name: "target";
        readonly type: "address";
    }, {
        readonly name: "value";
        readonly type: "uint256";
    }, {
        readonly name: "data";
        readonly type: "bytes";
    }];
    readonly outputs: readonly [{
        readonly name: "result";
        readonly type: "bytes";
    }];
    readonly stateMutability: "payable";
}, {
    readonly type: "function";
    readonly name: "executeBatch";
    readonly inputs: readonly [{
        readonly name: "calls";
        readonly type: "tuple[]";
        readonly components: readonly [{
            readonly name: "target";
            readonly type: "address";
        }, {
            readonly name: "value";
            readonly type: "uint256";
        }, {
            readonly name: "data";
            readonly type: "bytes";
        }];
    }];
    readonly outputs: readonly [{
        readonly name: "results";
        readonly type: "bytes[]";
    }];
    readonly stateMutability: "payable";
}, {
    readonly type: "function";
    readonly name: "getDeposit";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "result";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "initialize";
    readonly inputs: readonly [{
        readonly name: "newOwner";
        readonly type: "address";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
}, {
    readonly type: "function";
    readonly name: "isValidSignature";
    readonly inputs: readonly [{
        readonly name: "hash";
        readonly type: "bytes32";
    }, {
        readonly name: "signature";
        readonly type: "bytes";
    }];
    readonly outputs: readonly [{
        readonly name: "result";
        readonly type: "bytes4";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "owner";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "result";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "ownershipHandoverExpiresAt";
    readonly inputs: readonly [{
        readonly name: "pendingOwner";
        readonly type: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "result";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "proxiableUUID";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bytes32";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "renounceOwnership";
    readonly inputs: readonly [];
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
}, {
    readonly type: "function";
    readonly name: "requestOwnershipHandover";
    readonly inputs: readonly [];
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
}, {
    readonly type: "function";
    readonly name: "storageLoad";
    readonly inputs: readonly [{
        readonly name: "storageSlot";
        readonly type: "bytes32";
    }];
    readonly outputs: readonly [{
        readonly name: "result";
        readonly type: "bytes32";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "storageStore";
    readonly inputs: readonly [{
        readonly name: "storageSlot";
        readonly type: "bytes32";
    }, {
        readonly name: "storageValue";
        readonly type: "bytes32";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
}, {
    readonly type: "function";
    readonly name: "transferOwnership";
    readonly inputs: readonly [{
        readonly name: "newOwner";
        readonly type: "address";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
}, {
    readonly type: "function";
    readonly name: "upgradeToAndCall";
    readonly inputs: readonly [{
        readonly name: "newImplementation";
        readonly type: "address";
    }, {
        readonly name: "data";
        readonly type: "bytes";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
}, {
    readonly type: "function";
    readonly name: "validateUserOp";
    readonly inputs: readonly [{
        readonly name: "userOp";
        readonly type: "tuple";
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
    }, {
        readonly name: "userOpHash";
        readonly type: "bytes32";
    }, {
        readonly name: "missingAccountFunds";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "validationData";
        readonly type: "uint256";
    }];
    readonly stateMutability: "payable";
}, {
    readonly type: "function";
    readonly name: "withdrawDepositTo";
    readonly inputs: readonly [{
        readonly name: "to";
        readonly type: "address";
    }, {
        readonly name: "amount";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
}, {
    readonly type: "event";
    readonly name: "OwnershipHandoverCanceled";
    readonly inputs: readonly [{
        readonly name: "pendingOwner";
        readonly type: "address";
        readonly indexed: true;
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "OwnershipHandoverRequested";
    readonly inputs: readonly [{
        readonly name: "pendingOwner";
        readonly type: "address";
        readonly indexed: true;
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "OwnershipTransferred";
    readonly inputs: readonly [{
        readonly name: "oldOwner";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "newOwner";
        readonly type: "address";
        readonly indexed: true;
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "Upgraded";
    readonly inputs: readonly [{
        readonly name: "implementation";
        readonly type: "address";
        readonly indexed: true;
    }];
    readonly anonymous: false;
}, {
    readonly type: "error";
    readonly name: "AlreadyInitialized";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "FnSelectorNotRecognized";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "NewOwnerIsZeroAddress";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "NoHandoverRequest";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "Unauthorized";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "UnauthorizedCallContext";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "UpgradeFailed";
    readonly inputs: readonly [];
}];
declare const factoryAbi: readonly [{
    readonly type: "constructor";
    readonly inputs: readonly [{
        readonly name: "erc4337";
        readonly type: "address";
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "createAccount";
    readonly inputs: readonly [{
        readonly name: "owner";
        readonly type: "address";
    }, {
        readonly name: "salt";
        readonly type: "bytes32";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "payable";
}, {
    readonly type: "function";
    readonly name: "getAddress";
    readonly inputs: readonly [{
        readonly name: "salt";
        readonly type: "bytes32";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "implementation";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "initCodeHash";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bytes32";
    }];
    readonly stateMutability: "view";
}];
export {};
//# sourceMappingURL=toSoladySmartAccount.d.ts.map