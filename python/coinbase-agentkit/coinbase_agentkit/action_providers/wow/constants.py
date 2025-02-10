"""Constants for WOW action provider."""

# Networks
SUPPORTED_NETWORKS = ["base-mainnet", "base-sepolia"]

# URIs
GENERIC_TOKEN_METADATA_URI = "ipfs://QmY1GqprFYvojCcUEKgqHeDj9uhZD9jmYGrQTfA9vAE78J"

# Contract Addresses
WOW_FACTORY_CONTRACT_ADDRESSES = {
    "base-sepolia": "0x04870e22fa217Cb16aa00501D7D5253B8838C1eA",
    "base-mainnet": "0x997020E5F59cCB79C74D527Be492Cc610CB9fA2B",
}

# ABIs
WOW_FACTORY_ABI = [
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
]

WOW_ABI = [
    {
        "type": "function",
        "name": "buy",
        "inputs": [
            {"name": "recipient", "type": "address", "internalType": "address"},
            {"name": "refundRecipient", "type": "address", "internalType": "address"},
            {"name": "orderReferrer", "type": "address", "internalType": "address"},
            {"name": "comment", "type": "string", "internalType": "string"},
            {"name": "expectedMarketType", "type": "uint8", "internalType": "enum IWow.MarketType"},
            {"name": "minOrderSize", "type": "uint256", "internalType": "uint256"},
            {"name": "sqrtPriceLimitX96", "type": "uint160", "internalType": "uint160"},
        ],
        "outputs": [{"name": "", "type": "uint256", "internalType": "uint256"}],
        "stateMutability": "payable",
    },
    {
        "type": "function",
        "name": "sell",
        "inputs": [
            {"name": "tokensToSell", "type": "uint256", "internalType": "uint256"},
            {"name": "recipient", "type": "address", "internalType": "address"},
            {"name": "orderReferrer", "type": "address", "internalType": "address"},
            {"name": "comment", "type": "string", "internalType": "string"},
            {"name": "expectedMarketType", "type": "uint8", "internalType": "enum IWow.MarketType"},
            {"name": "minPayoutSize", "type": "uint256", "internalType": "uint256"},
            {"name": "sqrtPriceLimitX96", "type": "uint160", "internalType": "uint160"},
        ],
        "outputs": [{"name": "", "type": "uint256", "internalType": "uint256"}],
        "stateMutability": "nonpayable",
    },
    {
        "type": "function",
        "name": "marketType",
        "inputs": [],
        "outputs": [{"name": "", "type": "uint8", "internalType": "enum IWow.MarketType"}],
        "stateMutability": "view",
    },
    {
        "type": "function",
        "name": "getEthBuyQuote",
        "inputs": [{"name": "ethOrderSize", "type": "uint256", "internalType": "uint256"}],
        "outputs": [{"name": "", "type": "uint256", "internalType": "uint256"}],
        "stateMutability": "view",
    },
    {
        "type": "function",
        "name": "getTokenSellQuote",
        "inputs": [{"name": "tokenOrderSize", "type": "uint256", "internalType": "uint256"}],
        "outputs": [{"name": "", "type": "uint256", "internalType": "uint256"}],
        "stateMutability": "view",
    },
]
