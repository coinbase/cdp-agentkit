WOW_FACTORY_ABI = [
    {
        "type": "constructor",
        "inputs": [
            {"name": "_tokenImplementation", "type": "address", "internalType": "address"},
            {"name": "_bondingCurve", "type": "address", "internalType": "address"},
        ],
        "stateMutability": "nonpayable",
    },
    {
        "type": "function",
        "name": "UPGRADE_INTERFACE_VERSION",
        "inputs": [],
        "outputs": [{"name": "", "type": "string", "internalType": "string"}],
        "stateMutability": "view",
    },
    {
        "type": "function",
        "name": "bondingCurve",
        "inputs": [],
        "outputs": [{"name": "", "type": "address", "internalType": "address"}],
        "stateMutability": "view",
    },
    {
        "type": "function",
        "name": "deploy",
        "inputs": [
            {"name": "_tokenCreator", "type": "address", "internalType": "address"},
            {"name": "_platformReferrer", "type": "address", "internalType": "address"},
            {"name": "_tokenURI", "type": "string", "internalType": "string"},
            {"name": "_name", "type": "string", "internalType": "string"},
            {"name": "_symbol", "type": "string", "internalType": "string"},
        ],
        "outputs": [{"name": "", "type": "address", "internalType": "address"}],
        "stateMutability": "payable",
    },
    {
        "type": "function",
        "name": "implementation",
        "inputs": [],
        "outputs": [{"name": "", "type": "address", "internalType": "address"}],
        "stateMutability": "view",
    },
    {
        "type": "function",
        "name": "initialize",
        "inputs": [{"name": "_owner", "type": "address", "internalType": "address"}],
        "outputs": [],
        "stateMutability": "nonpayable",
    },
    {
        "type": "function",
        "name": "owner",
        "inputs": [],
        "outputs": [{"name": "", "type": "address", "internalType": "address"}],
        "stateMutability": "view",
    },
    {
        "type": "function",
        "name": "proxiableUUID",
        "inputs": [],
        "outputs": [{"name": "", "type": "bytes32", "internalType": "bytes32"}],
        "stateMutability": "view",
    },
    {
        "type": "function",
        "name": "renounceOwnership",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable",
    },
    {
        "type": "function",
        "name": "tokenImplementation",
        "inputs": [],
        "outputs": [{"name": "", "type": "address", "internalType": "address"}],
        "stateMutability": "view",
    },
    {
        "type": "function",
        "name": "transferOwnership",
        "inputs": [{"name": "newOwner", "type": "address", "internalType": "address"}],
        "outputs": [],
        "stateMutability": "nonpayable",
    },
    {
        "type": "function",
        "name": "upgradeToAndCall",
        "inputs": [
            {"name": "newImplementation", "type": "address", "internalType": "address"},
            {"name": "data", "type": "bytes", "internalType": "bytes"},
        ],
        "outputs": [],
        "stateMutability": "payable",
    },
    {
        "type": "event",
        "name": "Initialized",
        "inputs": [
            {"name": "version", "type": "uint64", "indexed": False, "internalType": "uint64"}
        ],
        "anonymous": False,
    },
    {
        "type": "event",
        "name": "OwnershipTransferred",
        "inputs": [
            {
                "name": "previousOwner",
                "type": "address",
                "indexed": True,
                "internalType": "address",
            },
            {"name": "newOwner", "type": "address", "indexed": True, "internalType": "address"},
        ],
        "anonymous": False,
    },
    {
        "type": "event",
        "name": "Upgraded",
        "inputs": [
            {
                "name": "implementation",
                "type": "address",
                "indexed": True,
                "internalType": "address",
            }
        ],
        "anonymous": False,
    },
    {
        "type": "error",
        "name": "AddressEmptyCode",
        "inputs": [{"name": "target", "type": "address", "internalType": "address"}],
    },
    {"type": "error", "name": "ERC1167FailedCreateClone", "inputs": []},
    {
        "type": "error",
        "name": "ERC1967InvalidImplementation",
        "inputs": [{"name": "implementation", "type": "address", "internalType": "address"}],
    },
    {"type": "error", "name": "ERC1967NonPayable", "inputs": []},
    {"type": "error", "name": "FailedInnerCall", "inputs": []},
    {"type": "error", "name": "InvalidInitialization", "inputs": []},
    {"type": "error", "name": "NotInitializing", "inputs": []},
    {
        "type": "error",
        "name": "OwnableInvalidOwner",
        "inputs": [{"name": "owner", "type": "address", "internalType": "address"}],
    },
    {
        "type": "error",
        "name": "OwnableUnauthorizedAccount",
        "inputs": [{"name": "account", "type": "address", "internalType": "address"}],
    },
    {"type": "error", "name": "ReentrancyGuardReentrantCall", "inputs": []},
    {"type": "error", "name": "UUPSUnauthorizedCallContext", "inputs": []},
    {
        "type": "error",
        "name": "UUPSUnsupportedProxiableUUID",
        "inputs": [{"name": "slot", "type": "bytes32", "internalType": "bytes32"}],
    },
]

WOW_FACTORY_CONTRACT_ADDRESSES = {
    "base-sepolia": "0x04870e22fa217Cb16aa00501D7D5253B8838C1eA",
    "base-mainnet": "0x997020E5F59cCB79C74D527Be492Cc610CB9fA2B",
}


def get_factory_address(network: str) -> str:
    """Get the Zora Wow ERC20 Factory contract address for the specified network.

    Args:
        network (str): The network ID to get the contract address for.
            Valid networks are: base-sepolia, base-mainnet.

    Returns:
        str: The contract address for the specified network.

    Raises:
        ValueError: If the specified network is not supported.

    """
    network = network.lower()
    if network not in WOW_FACTORY_CONTRACT_ADDRESSES:
        raise ValueError(
            f"Invalid network: {network}. Valid networks are: {', '.join(WOW_FACTORY_CONTRACT_ADDRESSES.keys())}"
        )
    return WOW_FACTORY_CONTRACT_ADDRESSES[network]


GENERIC_TOKEN_METADATA_URI = "ipfs://QmY1GqprFYvojCcUEKgqHeDj9uhZD9jmYGrQTfA9vAE78J"
