"""Constants for the ERC20 action provider."""

ERC20_ABI = [
    {
        "type": "event",
        "name": "Approval",
        "inputs": [
            {
                "indexed": True,
                "name": "owner",
                "type": "address",
            },
            {
                "indexed": True,
                "name": "spender",
                "type": "address",
            },
            {
                "indexed": False,
                "name": "value",
                "type": "uint256",
            },
        ],
    },
    {
        "type": "event",
        "name": "Transfer",
        "inputs": [
            {
                "indexed": True,
                "name": "from",
                "type": "address",
            },
            {
                "indexed": True,
                "name": "to",
                "type": "address",
            },
            {
                "indexed": False,
                "name": "value",
                "type": "uint256",
            },
        ],
    },
    {
        "type": "function",
        "name": "allowance",
        "stateMutability": "view",
        "inputs": [
            {
                "name": "owner",
                "type": "address",
            },
            {
                "name": "spender",
                "type": "address",
            },
        ],
        "outputs": [
            {
                "type": "uint256",
            },
        ],
    },
    {
        "type": "function",
        "name": "approve",
        "stateMutability": "nonpayable",
        "inputs": [
            {
                "name": "spender",
                "type": "address",
            },
            {
                "name": "amount",
                "type": "uint256",
            },
        ],
        "outputs": [
            {
                "type": "bool",
            },
        ],
    },
    {
        "type": "function",
        "name": "balanceOf",
        "stateMutability": "view",
        "inputs": [
            {
                "name": "account",
                "type": "address",
            },
        ],
        "outputs": [
            {
                "type": "uint256",
            },
        ],
    },
    {
        "type": "function",
        "name": "decimals",
        "stateMutability": "view",
        "inputs": [],
        "outputs": [
            {
                "type": "uint8",
            },
        ],
    },
    {
        "type": "function",
        "name": "name",
        "stateMutability": "view",
        "inputs": [],
        "outputs": [
            {
                "type": "string",
            },
        ],
    },
    {
        "type": "function",
        "name": "symbol",
        "stateMutability": "view",
        "inputs": [],
        "outputs": [
            {
                "type": "string",
            },
        ],
    },
    {
        "type": "function",
        "name": "totalSupply",
        "stateMutability": "view",
        "inputs": [],
        "outputs": [
            {
                "type": "uint256",
            },
        ],
    },
    {
        "type": "function",
        "name": "transfer",
        "stateMutability": "nonpayable",
        "inputs": [
            {
                "name": "recipient",
                "type": "address",
            },
            {
                "name": "amount",
                "type": "uint256",
            },
        ],
        "outputs": [
            {
                "type": "bool",
            },
        ],
    },
    {
        "type": "function",
        "name": "transferFrom",
        "stateMutability": "nonpayable",
        "inputs": [
            {
                "name": "sender",
                "type": "address",
            },
            {
                "name": "recipient",
                "type": "address",
            },
            {
                "name": "amount",
                "type": "uint256",
            },
        ],
        "outputs": [
            {
                "type": "bool",
            },
        ],
    },
]
