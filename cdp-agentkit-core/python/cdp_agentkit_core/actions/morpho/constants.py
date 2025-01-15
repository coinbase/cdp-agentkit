MORPHO_BASE_ADDRESS = "0xBBBBBbbBBb9cC5e90e3b3Af64bdAF62C37EEFFCb"

ERC20_APPROVE_ABI = [
    {
        "constant": False,
        "inputs": [
            {"internalType": "address", "name": "spender", "type": "address"},
            {"internalType": "uint256", "name": "value", "type": "uint256"},
        ],
        "name": "approve",
        "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
        "payable": False,
        "stateMutability": "nonpayable",
        "type": "function",
    },
]

METAMORPHO_ABI = [
    {
        "inputs": [
            {"internalType": "uint256", "name": "assets", "type": "uint256"},
            {"internalType": "address", "name": "receiver", "type": "address"},
        ],
        "name": "deposit",
        "outputs": [{"internalType": "uint256", "name": "shares", "type": "uint256"}],
        "stateMutability": "nonpayable",
        "type": "function",
    },
    {
        "inputs": [
            {"internalType": "uint256", "name": "assets", "type": "uint256"},
            {"internalType": "address", "name": "receiver", "type": "address"},
            {"internalType": "address", "name": "owner", "type": "address"},
        ],
        "name": "withdraw",
        "outputs": [{"internalType": "uint256", "name": "shares", "type": "uint256"}],
        "stateMutability": "nonpayable",
        "type": "function",
    },
]


BLUE_ABI = [
    {
        "inputs": [
            {
                "name": "marketParams",
                "type": "tuple",
                "internalType": "struct MarketParams",
                "components": [
                    {"name": "loanToken", "type": "address", "internalType": "address"},
                    {"name": "collateralToken", "type": "address", "internalType": "address"},
                    {"name": "oracle", "type": "address", "internalType": "address"},
                    {"name": "irm", "type": "address", "internalType": "address"},
                    {"name": "lltv", "type": "uint256", "internalType": "uint256"},
                ],
            },
            {"name": "assets", "type": "uint256", "internalType": "uint256"},
            {"name": "shares", "type": "uint256", "internalType": "uint256"},
            {"name": "onBehalf", "type": "address", "internalType": "address"},
            {"name": "receiver", "type": "address", "internalType": "address"},
        ],
        "name": "borrow",
        "outputs": [
            {"name": "", "type": "uint256", "internalType": "uint256"},
            {"name": "", "type": "uint256", "internalType": "uint256"},
        ],
        "stateMutability": "nonpayable",
        "type": "function",
    },
    {
        "inputs": [
            {
                "name": "marketParams",
                "type": "tuple",
                "internalType": "struct MarketParams",
                "components": [
                    {"name": "loanToken", "type": "address", "internalType": "address"},
                    {"name": "collateralToken", "type": "address", "internalType": "address"},
                    {"name": "oracle", "type": "address", "internalType": "address"},
                    {"name": "irm", "type": "address", "internalType": "address"},
                    {"name": "lltv", "type": "uint256", "internalType": "uint256"},
                ],
            },
            {"name": "assets", "type": "uint256", "internalType": "uint256"},
            {"name": "shares", "type": "uint256", "internalType": "uint256"},
            {"name": "onBehalf", "type": "address", "internalType": "address"},
            {"name": "data", "type": "bytes", "internalType": "bytes"},
        ],
        "name": "repay",
        "outputs": [
            {"name": "", "type": "uint256", "internalType": "uint256"},
            {"name": "", "type": "uint256", "internalType": "uint256"},
        ],
        "stateMutability": "nonpayable",
        "type": "function",
    },
    {
        "inputs": [
            {
                "name": "marketParams",
                "type": "tuple",
                "internalType": "struct MarketParams",
                "components": [
                    {"name": "loanToken", "type": "address", "internalType": "address"},
                    {"name": "collateralToken", "type": "address", "internalType": "address"},
                    {"name": "oracle", "type": "address", "internalType": "address"},
                    {"name": "irm", "type": "address", "internalType": "address"},
                    {"name": "lltv", "type": "uint256", "internalType": "uint256"},
                ],
            },
            {"name": "assets", "type": "uint256", "internalType": "uint256"},
            {"name": "onBehalf", "type": "address", "internalType": "address"},
            {"name": "data", "type": "bytes", "internalType": "bytes"},
        ],
        "name": "supplyCollateral",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
    },
    {
        "inputs": [
            {
                "name": "marketParams",
                "type": "tuple",
                "internalType": "struct MarketParams",
                "components": [
                    {"name": "loanToken", "type": "address", "internalType": "address"},
                    {"name": "collateralToken", "type": "address", "internalType": "address"},
                    {"name": "oracle", "type": "address", "internalType": "address"},
                    {"name": "irm", "type": "address", "internalType": "address"},
                    {"name": "lltv", "type": "uint256", "internalType": "uint256"},
                ],
            },
            {"name": "assets", "type": "uint256", "internalType": "uint256"},
            {"name": "onBehalf", "type": "address", "internalType": "address"},
            {"name": "receiver", "type": "address", "internalType": "address"},
        ],
        "name": "withdrawCollateral",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
    },
]
