"""Constants for WETH action provider."""

WETH_ADDRESS = "0x4200000000000000000000000000000000000006"

MIN_WRAP_AMOUNT = 100_000_000_000_000

WETH_ABI = [
    {
        "inputs": [],
        "name": "deposit",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function",
    },
    {
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
        "stateMutability": "view",
        "type": "function",
    },
]
