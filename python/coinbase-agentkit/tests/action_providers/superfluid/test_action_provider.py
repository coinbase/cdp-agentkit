from coinbase_agentkit.action_providers.superfluid.superfluid_action_provider import (
    superfluid_action_provider,
)
from coinbase_agentkit.network import Network


def test_provider_init(wallet_provider_factory):
    """Test provider initialization."""
    wallet_provider = wallet_provider_factory()
    provider = superfluid_action_provider(wallet_provider)
    assert provider.wallet_provider == wallet_provider


def test_supports_network(wallet_provider_factory):
    """Test network support validation."""
    provider = superfluid_action_provider(wallet_provider_factory())

    test_cases = [
        # network_id, chain_id, protocol_family, expected_result
        ("ethereum-mainnet", 1, "evm", True),      # Ethereum
        ("optimism", 10, "evm", True),             # OP Mainnet
        ("bnb-chain", 56, "evm", True),            # BNB Smart Chain
        ("gnosis", 100, "evm", True),              # Gnosis Chain
        ("polygon", 137, "evm", True),             # Polygon
        ("base-mainnet", 8453, "evm", True),       # Base
        ("arbitrum-one", 42161, "evm", True),      # Arbitrum One
        ("celo", 42220, "evm", True),              # Celo
        ("avalanche", 43114, "evm", True),         # Avalanche
        ("scroll", 534352, "evm", True),           # Scroll
        ("degen", 666666666, "evm", True),         # Degen Chain
        ("avalanche-fuji", 43113, "evm", True),    # Avalanche Fuji Testnet
        ("base-sepolia", 84532, "evm", True),      # Base Sepolia
        ("scroll-sepolia", 534351, "evm", True),   # Scroll Sepolia
        ("sepolia", 11155111, "evm", True),        # Sepolia
        ("op-sepolia", 11155420, "evm", True),     # OP Sepolia
        ("goerli", 5, "evm", False),               # Goerli (unsupported)
        (None, None, "solana", False),             # Solana (unsupported)
    ]

    for network_id, chain_id, protocol_family, expected_result in test_cases:
        network = Network(
            protocol_family=protocol_family,
            chain_id=chain_id,
            network_id=network_id
        )
        result = provider.supports_network(network)
        assert result is expected_result, \
            f"Network {network_id} should{' ' if expected_result else ' not '}be supported"
