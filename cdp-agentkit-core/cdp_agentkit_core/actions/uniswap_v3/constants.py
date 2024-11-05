UNISWAP_V3_FACTORY_ABI = [
    {"inputs": [], "stateMutability": "nonpayable", "type": "constructor"},
    {
        "anonymous": False,
        "inputs": [
            {"indexed": True, "internalType": "uint24", "name": "fee", "type": "uint24"},
            {"indexed": True, "internalType": "int24", "name": "tickSpacing", "type": "int24"},
        ],
        "name": "FeeAmountEnabled",
        "type": "event",
    },
    {
        "anonymous": False,
        "inputs": [
            {"indexed": True, "internalType": "address", "name": "oldOwner", "type": "address"},
            {"indexed": True, "internalType": "address", "name": "newOwner", "type": "address"},
        ],
        "name": "OwnerChanged",
        "type": "event",
    },
    {
        "anonymous": False,
        "inputs": [
            {"indexed": True, "internalType": "address", "name": "token0", "type": "address"},
            {"indexed": True, "internalType": "address", "name": "token1", "type": "address"},
            {"indexed": True, "internalType": "uint24", "name": "fee", "type": "uint24"},
            {"indexed": False, "internalType": "int24", "name": "tickSpacing", "type": "int24"},
            {"indexed": False, "internalType": "address", "name": "pool", "type": "address"},
        ],
        "name": "PoolCreated",
        "type": "event",
    },
    {
        "inputs": [
            {"internalType": "address", "name": "tokenA", "type": "address"},
            {"internalType": "address", "name": "tokenB", "type": "address"},
            {"internalType": "uint24", "name": "fee", "type": "uint24"},
        ],
        "name": "createPool",
        "outputs": [{"internalType": "address", "name": "pool", "type": "address"}],
        "stateMutability": "nonpayable",
        "type": "function",
    },
    {
        "inputs": [
            {"internalType": "uint24", "name": "fee", "type": "uint24"},
            {"internalType": "int24", "name": "tickSpacing", "type": "int24"},
        ],
        "name": "enableFeeAmount",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
    },
    {
        "inputs": [{"internalType": "uint24", "name": "", "type": "uint24"}],
        "name": "feeAmountTickSpacing",
        "outputs": [{"internalType": "int24", "name": "", "type": "int24"}],
        "stateMutability": "view",
        "type": "function",
    },
    {
        "inputs": [
            {"internalType": "address", "name": "", "type": "address"},
            {"internalType": "address", "name": "", "type": "address"},
            {"internalType": "uint24", "name": "", "type": "uint24"},
        ],
        "name": "getPool",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function",
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function",
    },
    {
        "inputs": [],
        "name": "parameters",
        "outputs": [
            {"internalType": "address", "name": "factory", "type": "address"},
            {"internalType": "address", "name": "token0", "type": "address"},
            {"internalType": "address", "name": "token1", "type": "address"},
            {"internalType": "uint24", "name": "fee", "type": "uint24"},
            {"internalType": "int24", "name": "tickSpacing", "type": "int24"},
        ],
        "stateMutability": "view",
        "type": "function",
    },
    {
        "inputs": [{"internalType": "address", "name": "_owner", "type": "address"}],
        "name": "setOwner",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
    },
]

UNISWAP_V3_FACTORY_CONTRACT_ADDRESSES = {
    "base-sepolia": "0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24",
    "base-mainnet": "0x33128a8fC17869897dcE68Ed026d694621f6FDfD",
    "ethereum-mainnet": "0x1F98431c8aD98523631AE4a59f267346ea31F984",
    "arbitrum-mainnet": "0x1F98431c8aD98523631AE4a59f267346ea31F984",
    "polygon-mainnet": "0x1F98431c8aD98523631AE4a59f267346ea31F984",
}


def get_contract_address(network: str) -> str:
    """Get the Uniswap V3 Factory contract address for the specified network.

    Args:
        network (str): The network ID to get the contract address for.
            Valid networks are: base-sepolia, base-mainnet, ethereum-mainnet,
            arbitrum-mainnet, polygon-mainnet.

    Returns:
        str: The contract address for the specified network.

    Raises:
        ValueError: If the specified network is not supported.

    """
    network = network.lower()
    if network not in UNISWAP_V3_FACTORY_CONTRACT_ADDRESSES:
        raise ValueError(
            f"Invalid network: {network}. Valid networks are: {', '.join(UNISWAP_V3_FACTORY_CONTRACT_ADDRESSES.keys())}"
        )
    return UNISWAP_V3_FACTORY_CONTRACT_ADDRESSES[network]
