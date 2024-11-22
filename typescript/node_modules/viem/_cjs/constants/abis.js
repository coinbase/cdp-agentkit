"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.erc4626Abi = exports.erc721Abi = exports.erc20Abi_bytes32 = exports.erc20Abi = exports.universalSignatureValidatorAbi = exports.smartAccountAbi = exports.addressResolverAbi = exports.textResolverAbi = exports.universalResolverReverseAbi = exports.universalResolverResolveAbi = exports.multicall3Abi = void 0;
exports.multicall3Abi = [
    {
        inputs: [
            {
                components: [
                    {
                        name: 'target',
                        type: 'address',
                    },
                    {
                        name: 'allowFailure',
                        type: 'bool',
                    },
                    {
                        name: 'callData',
                        type: 'bytes',
                    },
                ],
                name: 'calls',
                type: 'tuple[]',
            },
        ],
        name: 'aggregate3',
        outputs: [
            {
                components: [
                    {
                        name: 'success',
                        type: 'bool',
                    },
                    {
                        name: 'returnData',
                        type: 'bytes',
                    },
                ],
                name: 'returnData',
                type: 'tuple[]',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
];
const universalResolverErrors = [
    {
        inputs: [],
        name: 'ResolverNotFound',
        type: 'error',
    },
    {
        inputs: [],
        name: 'ResolverWildcardNotSupported',
        type: 'error',
    },
    {
        inputs: [],
        name: 'ResolverNotContract',
        type: 'error',
    },
    {
        inputs: [
            {
                name: 'returnData',
                type: 'bytes',
            },
        ],
        name: 'ResolverError',
        type: 'error',
    },
    {
        inputs: [
            {
                components: [
                    {
                        name: 'status',
                        type: 'uint16',
                    },
                    {
                        name: 'message',
                        type: 'string',
                    },
                ],
                name: 'errors',
                type: 'tuple[]',
            },
        ],
        name: 'HttpError',
        type: 'error',
    },
];
exports.universalResolverResolveAbi = [
    ...universalResolverErrors,
    {
        name: 'resolve',
        type: 'function',
        stateMutability: 'view',
        inputs: [
            { name: 'name', type: 'bytes' },
            { name: 'data', type: 'bytes' },
        ],
        outputs: [
            { name: '', type: 'bytes' },
            { name: 'address', type: 'address' },
        ],
    },
    {
        name: 'resolve',
        type: 'function',
        stateMutability: 'view',
        inputs: [
            { name: 'name', type: 'bytes' },
            { name: 'data', type: 'bytes' },
            { name: 'gateways', type: 'string[]' },
        ],
        outputs: [
            { name: '', type: 'bytes' },
            { name: 'address', type: 'address' },
        ],
    },
];
exports.universalResolverReverseAbi = [
    ...universalResolverErrors,
    {
        name: 'reverse',
        type: 'function',
        stateMutability: 'view',
        inputs: [{ type: 'bytes', name: 'reverseName' }],
        outputs: [
            { type: 'string', name: 'resolvedName' },
            { type: 'address', name: 'resolvedAddress' },
            { type: 'address', name: 'reverseResolver' },
            { type: 'address', name: 'resolver' },
        ],
    },
    {
        name: 'reverse',
        type: 'function',
        stateMutability: 'view',
        inputs: [
            { type: 'bytes', name: 'reverseName' },
            { type: 'string[]', name: 'gateways' },
        ],
        outputs: [
            { type: 'string', name: 'resolvedName' },
            { type: 'address', name: 'resolvedAddress' },
            { type: 'address', name: 'reverseResolver' },
            { type: 'address', name: 'resolver' },
        ],
    },
];
exports.textResolverAbi = [
    {
        name: 'text',
        type: 'function',
        stateMutability: 'view',
        inputs: [
            { name: 'name', type: 'bytes32' },
            { name: 'key', type: 'string' },
        ],
        outputs: [{ name: '', type: 'string' }],
    },
];
exports.addressResolverAbi = [
    {
        name: 'addr',
        type: 'function',
        stateMutability: 'view',
        inputs: [{ name: 'name', type: 'bytes32' }],
        outputs: [{ name: '', type: 'address' }],
    },
    {
        name: 'addr',
        type: 'function',
        stateMutability: 'view',
        inputs: [
            { name: 'name', type: 'bytes32' },
            { name: 'coinType', type: 'uint256' },
        ],
        outputs: [{ name: '', type: 'bytes' }],
    },
];
exports.smartAccountAbi = [
    {
        name: 'isValidSignature',
        type: 'function',
        stateMutability: 'view',
        inputs: [
            { name: 'hash', type: 'bytes32' },
            { name: 'signature', type: 'bytes' },
        ],
        outputs: [{ name: '', type: 'bytes4' }],
    },
];
exports.universalSignatureValidatorAbi = [
    {
        inputs: [
            {
                name: '_signer',
                type: 'address',
            },
            {
                name: '_hash',
                type: 'bytes32',
            },
            {
                name: '_signature',
                type: 'bytes',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
    },
    {
        inputs: [
            {
                name: '_signer',
                type: 'address',
            },
            {
                name: '_hash',
                type: 'bytes32',
            },
            {
                name: '_signature',
                type: 'bytes',
            },
        ],
        outputs: [
            {
                type: 'bool',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
        name: 'isValidSig',
    },
];
exports.erc20Abi = [
    {
        type: 'event',
        name: 'Approval',
        inputs: [
            {
                indexed: true,
                name: 'owner',
                type: 'address',
            },
            {
                indexed: true,
                name: 'spender',
                type: 'address',
            },
            {
                indexed: false,
                name: 'value',
                type: 'uint256',
            },
        ],
    },
    {
        type: 'event',
        name: 'Transfer',
        inputs: [
            {
                indexed: true,
                name: 'from',
                type: 'address',
            },
            {
                indexed: true,
                name: 'to',
                type: 'address',
            },
            {
                indexed: false,
                name: 'value',
                type: 'uint256',
            },
        ],
    },
    {
        type: 'function',
        name: 'allowance',
        stateMutability: 'view',
        inputs: [
            {
                name: 'owner',
                type: 'address',
            },
            {
                name: 'spender',
                type: 'address',
            },
        ],
        outputs: [
            {
                type: 'uint256',
            },
        ],
    },
    {
        type: 'function',
        name: 'approve',
        stateMutability: 'nonpayable',
        inputs: [
            {
                name: 'spender',
                type: 'address',
            },
            {
                name: 'amount',
                type: 'uint256',
            },
        ],
        outputs: [
            {
                type: 'bool',
            },
        ],
    },
    {
        type: 'function',
        name: 'balanceOf',
        stateMutability: 'view',
        inputs: [
            {
                name: 'account',
                type: 'address',
            },
        ],
        outputs: [
            {
                type: 'uint256',
            },
        ],
    },
    {
        type: 'function',
        name: 'decimals',
        stateMutability: 'view',
        inputs: [],
        outputs: [
            {
                type: 'uint8',
            },
        ],
    },
    {
        type: 'function',
        name: 'name',
        stateMutability: 'view',
        inputs: [],
        outputs: [
            {
                type: 'string',
            },
        ],
    },
    {
        type: 'function',
        name: 'symbol',
        stateMutability: 'view',
        inputs: [],
        outputs: [
            {
                type: 'string',
            },
        ],
    },
    {
        type: 'function',
        name: 'totalSupply',
        stateMutability: 'view',
        inputs: [],
        outputs: [
            {
                type: 'uint256',
            },
        ],
    },
    {
        type: 'function',
        name: 'transfer',
        stateMutability: 'nonpayable',
        inputs: [
            {
                name: 'recipient',
                type: 'address',
            },
            {
                name: 'amount',
                type: 'uint256',
            },
        ],
        outputs: [
            {
                type: 'bool',
            },
        ],
    },
    {
        type: 'function',
        name: 'transferFrom',
        stateMutability: 'nonpayable',
        inputs: [
            {
                name: 'sender',
                type: 'address',
            },
            {
                name: 'recipient',
                type: 'address',
            },
            {
                name: 'amount',
                type: 'uint256',
            },
        ],
        outputs: [
            {
                type: 'bool',
            },
        ],
    },
];
exports.erc20Abi_bytes32 = [
    {
        type: 'event',
        name: 'Approval',
        inputs: [
            {
                indexed: true,
                name: 'owner',
                type: 'address',
            },
            {
                indexed: true,
                name: 'spender',
                type: 'address',
            },
            {
                indexed: false,
                name: 'value',
                type: 'uint256',
            },
        ],
    },
    {
        type: 'event',
        name: 'Transfer',
        inputs: [
            {
                indexed: true,
                name: 'from',
                type: 'address',
            },
            {
                indexed: true,
                name: 'to',
                type: 'address',
            },
            {
                indexed: false,
                name: 'value',
                type: 'uint256',
            },
        ],
    },
    {
        type: 'function',
        name: 'allowance',
        stateMutability: 'view',
        inputs: [
            {
                name: 'owner',
                type: 'address',
            },
            {
                name: 'spender',
                type: 'address',
            },
        ],
        outputs: [
            {
                type: 'uint256',
            },
        ],
    },
    {
        type: 'function',
        name: 'approve',
        stateMutability: 'nonpayable',
        inputs: [
            {
                name: 'spender',
                type: 'address',
            },
            {
                name: 'amount',
                type: 'uint256',
            },
        ],
        outputs: [
            {
                type: 'bool',
            },
        ],
    },
    {
        type: 'function',
        name: 'balanceOf',
        stateMutability: 'view',
        inputs: [
            {
                name: 'account',
                type: 'address',
            },
        ],
        outputs: [
            {
                type: 'uint256',
            },
        ],
    },
    {
        type: 'function',
        name: 'decimals',
        stateMutability: 'view',
        inputs: [],
        outputs: [
            {
                type: 'uint8',
            },
        ],
    },
    {
        type: 'function',
        name: 'name',
        stateMutability: 'view',
        inputs: [],
        outputs: [
            {
                type: 'bytes32',
            },
        ],
    },
    {
        type: 'function',
        name: 'symbol',
        stateMutability: 'view',
        inputs: [],
        outputs: [
            {
                type: 'bytes32',
            },
        ],
    },
    {
        type: 'function',
        name: 'totalSupply',
        stateMutability: 'view',
        inputs: [],
        outputs: [
            {
                type: 'uint256',
            },
        ],
    },
    {
        type: 'function',
        name: 'transfer',
        stateMutability: 'nonpayable',
        inputs: [
            {
                name: 'recipient',
                type: 'address',
            },
            {
                name: 'amount',
                type: 'uint256',
            },
        ],
        outputs: [
            {
                type: 'bool',
            },
        ],
    },
    {
        type: 'function',
        name: 'transferFrom',
        stateMutability: 'nonpayable',
        inputs: [
            {
                name: 'sender',
                type: 'address',
            },
            {
                name: 'recipient',
                type: 'address',
            },
            {
                name: 'amount',
                type: 'uint256',
            },
        ],
        outputs: [
            {
                type: 'bool',
            },
        ],
    },
];
exports.erc721Abi = [
    {
        type: 'event',
        name: 'Approval',
        inputs: [
            {
                indexed: true,
                name: 'owner',
                type: 'address',
            },
            {
                indexed: true,
                name: 'spender',
                type: 'address',
            },
            {
                indexed: true,
                name: 'tokenId',
                type: 'uint256',
            },
        ],
    },
    {
        type: 'event',
        name: 'ApprovalForAll',
        inputs: [
            {
                indexed: true,
                name: 'owner',
                type: 'address',
            },
            {
                indexed: true,
                name: 'operator',
                type: 'address',
            },
            {
                indexed: false,
                name: 'approved',
                type: 'bool',
            },
        ],
    },
    {
        type: 'event',
        name: 'Transfer',
        inputs: [
            {
                indexed: true,
                name: 'from',
                type: 'address',
            },
            {
                indexed: true,
                name: 'to',
                type: 'address',
            },
            {
                indexed: true,
                name: 'tokenId',
                type: 'uint256',
            },
        ],
    },
    {
        type: 'function',
        name: 'approve',
        stateMutability: 'payable',
        inputs: [
            {
                name: 'spender',
                type: 'address',
            },
            {
                name: 'tokenId',
                type: 'uint256',
            },
        ],
        outputs: [],
    },
    {
        type: 'function',
        name: 'balanceOf',
        stateMutability: 'view',
        inputs: [
            {
                name: 'account',
                type: 'address',
            },
        ],
        outputs: [
            {
                type: 'uint256',
            },
        ],
    },
    {
        type: 'function',
        name: 'getApproved',
        stateMutability: 'view',
        inputs: [
            {
                name: 'tokenId',
                type: 'uint256',
            },
        ],
        outputs: [
            {
                type: 'address',
            },
        ],
    },
    {
        type: 'function',
        name: 'isApprovedForAll',
        stateMutability: 'view',
        inputs: [
            {
                name: 'owner',
                type: 'address',
            },
            {
                name: 'operator',
                type: 'address',
            },
        ],
        outputs: [
            {
                type: 'bool',
            },
        ],
    },
    {
        type: 'function',
        name: 'name',
        stateMutability: 'view',
        inputs: [],
        outputs: [
            {
                type: 'string',
            },
        ],
    },
    {
        type: 'function',
        name: 'ownerOf',
        stateMutability: 'view',
        inputs: [
            {
                name: 'tokenId',
                type: 'uint256',
            },
        ],
        outputs: [
            {
                name: 'owner',
                type: 'address',
            },
        ],
    },
    {
        type: 'function',
        name: 'safeTransferFrom',
        stateMutability: 'payable',
        inputs: [
            {
                name: 'from',
                type: 'address',
            },
            {
                name: 'to',
                type: 'address',
            },
            {
                name: 'tokenId',
                type: 'uint256',
            },
        ],
        outputs: [],
    },
    {
        type: 'function',
        name: 'safeTransferFrom',
        stateMutability: 'nonpayable',
        inputs: [
            {
                name: 'from',
                type: 'address',
            },
            {
                name: 'to',
                type: 'address',
            },
            {
                name: 'id',
                type: 'uint256',
            },
            {
                name: 'data',
                type: 'bytes',
            },
        ],
        outputs: [],
    },
    {
        type: 'function',
        name: 'setApprovalForAll',
        stateMutability: 'nonpayable',
        inputs: [
            {
                name: 'operator',
                type: 'address',
            },
            {
                name: 'approved',
                type: 'bool',
            },
        ],
        outputs: [],
    },
    {
        type: 'function',
        name: 'symbol',
        stateMutability: 'view',
        inputs: [],
        outputs: [
            {
                type: 'string',
            },
        ],
    },
    {
        type: 'function',
        name: 'tokenByIndex',
        stateMutability: 'view',
        inputs: [
            {
                name: 'index',
                type: 'uint256',
            },
        ],
        outputs: [
            {
                type: 'uint256',
            },
        ],
    },
    {
        type: 'function',
        name: 'tokenByIndex',
        stateMutability: 'view',
        inputs: [
            {
                name: 'owner',
                type: 'address',
            },
            {
                name: 'index',
                type: 'uint256',
            },
        ],
        outputs: [
            {
                name: 'tokenId',
                type: 'uint256',
            },
        ],
    },
    {
        type: 'function',
        name: 'tokenURI',
        stateMutability: 'view',
        inputs: [
            {
                name: 'tokenId',
                type: 'uint256',
            },
        ],
        outputs: [
            {
                type: 'string',
            },
        ],
    },
    {
        type: 'function',
        name: 'totalSupply',
        stateMutability: 'view',
        inputs: [],
        outputs: [
            {
                type: 'uint256',
            },
        ],
    },
    {
        type: 'function',
        name: 'transferFrom',
        stateMutability: 'payable',
        inputs: [
            {
                name: 'sender',
                type: 'address',
            },
            {
                name: 'recipient',
                type: 'address',
            },
            {
                name: 'tokeId',
                type: 'uint256',
            },
        ],
        outputs: [],
    },
];
exports.erc4626Abi = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: 'owner',
                type: 'address',
            },
            {
                indexed: true,
                name: 'spender',
                type: 'address',
            },
            {
                indexed: false,
                name: 'value',
                type: 'uint256',
            },
        ],
        name: 'Approval',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: 'sender',
                type: 'address',
            },
            {
                indexed: true,
                name: 'receiver',
                type: 'address',
            },
            {
                indexed: false,
                name: 'assets',
                type: 'uint256',
            },
            {
                indexed: false,
                name: 'shares',
                type: 'uint256',
            },
        ],
        name: 'Deposit',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: 'from',
                type: 'address',
            },
            {
                indexed: true,
                name: 'to',
                type: 'address',
            },
            {
                indexed: false,
                name: 'value',
                type: 'uint256',
            },
        ],
        name: 'Transfer',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: 'sender',
                type: 'address',
            },
            {
                indexed: true,
                name: 'receiver',
                type: 'address',
            },
            {
                indexed: true,
                name: 'owner',
                type: 'address',
            },
            {
                indexed: false,
                name: 'assets',
                type: 'uint256',
            },
            {
                indexed: false,
                name: 'shares',
                type: 'uint256',
            },
        ],
        name: 'Withdraw',
        type: 'event',
    },
    {
        inputs: [
            {
                name: 'owner',
                type: 'address',
            },
            {
                name: 'spender',
                type: 'address',
            },
        ],
        name: 'allowance',
        outputs: [
            {
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                name: 'spender',
                type: 'address',
            },
            {
                name: 'amount',
                type: 'uint256',
            },
        ],
        name: 'approve',
        outputs: [
            {
                type: 'bool',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'asset',
        outputs: [
            {
                name: 'assetTokenAddress',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                name: 'account',
                type: 'address',
            },
        ],
        name: 'balanceOf',
        outputs: [
            {
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                name: 'shares',
                type: 'uint256',
            },
        ],
        name: 'convertToAssets',
        outputs: [
            {
                name: 'assets',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                name: 'assets',
                type: 'uint256',
            },
        ],
        name: 'convertToShares',
        outputs: [
            {
                name: 'shares',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                name: 'assets',
                type: 'uint256',
            },
            {
                name: 'receiver',
                type: 'address',
            },
        ],
        name: 'deposit',
        outputs: [
            {
                name: 'shares',
                type: 'uint256',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                name: 'caller',
                type: 'address',
            },
        ],
        name: 'maxDeposit',
        outputs: [
            {
                name: 'maxAssets',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                name: 'caller',
                type: 'address',
            },
        ],
        name: 'maxMint',
        outputs: [
            {
                name: 'maxShares',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                name: 'owner',
                type: 'address',
            },
        ],
        name: 'maxRedeem',
        outputs: [
            {
                name: 'maxShares',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                name: 'owner',
                type: 'address',
            },
        ],
        name: 'maxWithdraw',
        outputs: [
            {
                name: 'maxAssets',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                name: 'shares',
                type: 'uint256',
            },
            {
                name: 'receiver',
                type: 'address',
            },
        ],
        name: 'mint',
        outputs: [
            {
                name: 'assets',
                type: 'uint256',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                name: 'assets',
                type: 'uint256',
            },
        ],
        name: 'previewDeposit',
        outputs: [
            {
                name: 'shares',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                name: 'shares',
                type: 'uint256',
            },
        ],
        name: 'previewMint',
        outputs: [
            {
                name: 'assets',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                name: 'shares',
                type: 'uint256',
            },
        ],
        name: 'previewRedeem',
        outputs: [
            {
                name: 'assets',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                name: 'assets',
                type: 'uint256',
            },
        ],
        name: 'previewWithdraw',
        outputs: [
            {
                name: 'shares',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                name: 'shares',
                type: 'uint256',
            },
            {
                name: 'receiver',
                type: 'address',
            },
            {
                name: 'owner',
                type: 'address',
            },
        ],
        name: 'redeem',
        outputs: [
            {
                name: 'assets',
                type: 'uint256',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'totalAssets',
        outputs: [
            {
                name: 'totalManagedAssets',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'totalSupply',
        outputs: [
            {
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                name: 'to',
                type: 'address',
            },
            {
                name: 'amount',
                type: 'uint256',
            },
        ],
        name: 'transfer',
        outputs: [
            {
                type: 'bool',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                name: 'from',
                type: 'address',
            },
            {
                name: 'to',
                type: 'address',
            },
            {
                name: 'amount',
                type: 'uint256',
            },
        ],
        name: 'transferFrom',
        outputs: [
            {
                type: 'bool',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                name: 'assets',
                type: 'uint256',
            },
            {
                name: 'receiver',
                type: 'address',
            },
            {
                name: 'owner',
                type: 'address',
            },
        ],
        name: 'withdraw',
        outputs: [
            {
                name: 'shares',
                type: 'uint256',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
];
//# sourceMappingURL=abis.js.map