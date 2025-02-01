import json
import os
from decimal import Decimal

import pytest
from cdp import Cdp, Wallet, WalletData
from eth_utils import to_checksum_address
from web3 import Web3

from cdp_agentkit_core.actions.aerodrome.utils import (
    read_contract,
    get_lp_token_address,
    AERODROME_FACTORY_ADDRESS,
    AERODROME_FACTORY_ABI,
    create_web3
)

# Test constants
NETWORK = "base-mainnet"
WETH = to_checksum_address("0x4200000000000000000000000000000000000006")
USDC = to_checksum_address("0x833589fcd6edb6e08f4c7c32d4f71b54bda02913")
EXPECTED_WETH_USDC_POOL = "0x3548029694fbb241d45fb24ba0cd9c9d4e745f16"
STABLE_PAIR = None  # Will be set after pool detection

# ERC20 constants for testing read_contract
ERC20_ABI = [
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [{"type": "uint8"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [{"type": "string"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{"type": "address"}],
        "name": "balanceOf",
        "outputs": [{"type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }
]


@pytest.fixture
def web3(wallet):
    """Create web3 instance for testing."""
    return create_web3(wallet.network_id)


@pytest.fixture
def wallet():
    """Load base-mainnet wallet for testing."""
    Cdp.configure(
        api_key_name=os.getenv("CDP_API_KEY_NAME"),
        private_key=os.getenv("CDP_API_KEY_PRIVATE_KEY").replace("\\n", "\n"),
        source="cdp-langchain",
        source_version="0.0.13",
    )

    wallet_data = WalletData.from_dict(json.loads(os.getenv("WALLET_DATA")))
    wallet = Wallet.import_data(wallet_data)
    return wallet


def test_factory_contract_setup(web3):
    """Test that we can properly connect to the factory contract."""
    try:
        contract = web3.eth.contract(
            address=Web3.to_checksum_address(AERODROME_FACTORY_ADDRESS),
            abi=AERODROME_FACTORY_ABI
        )
        print(f"\nFactory contract methods: {contract.all_functions()}")
        return contract
    except Exception as e:
        print(f"Error setting up factory contract: {e}")
        raise


def test_read_contract_token_info(web3):
    """Test read_contract with basic token info queries."""
    try:
        # Test reading WETH decimals
        decimals = read_contract(
            web3=web3,
            contract_address=WETH,
            abi=ERC20_ABI,
            method="decimals"
        )
        print(f"\nWETH decimals: {decimals}")
        assert decimals == 18, "WETH should have 18 decimals"

        # Test reading WETH symbol
        symbol = read_contract(
            web3=web3,
            contract_address=WETH,
            abi=ERC20_ABI,
            method="symbol"
        )
        print(f"WETH symbol: {symbol}")
        assert symbol == "WETH", "Symbol should be WETH"

    except Exception as e:
        print(f"\nError in token info test: {e}")
        raise


def test_read_contract_balance(wallet):
    """Test read_contract with balance query."""
    web3 = create_web3(wallet.network_id)

    # Test reading balance with args
    balance = read_contract(
        web3=web3,
        contract_address=WETH,
        abi=ERC20_ABI,
        method="balanceOf",
        args=[wallet.default_address.address_id]
    )
    assert isinstance(balance, int), "Balance should be an integer"
    assert balance >= 0, "Balance should be non-negative"


def test_read_contract_invalid_address(wallet):
    """Test read_contract with invalid address."""
    web3 = create_web3(wallet.network_id)
    invalid_address = "0x0000000000000000000000000000000000000000"

    with pytest.raises(Exception):
        read_contract(
            web3=web3,
            contract_address=invalid_address,
            abi=ERC20_ABI,
            method="symbol"
        )


def test_get_lp_token_address_stable(wallet):
    """Test getting LP token address for stable pair."""
    try:
        print(f"\nTesting with tokens:")
        print(f"Token A (WETH): {WETH}")
        print(f"Token B (USDC): {USDC}")
        print(f"Stable: {STABLE_PAIR}")

        lp_address = get_lp_token_address(wallet, WETH, USDC, True)
        print(f"LP token address: {lp_address}")

        assert Web3.is_address(lp_address), "Should return a valid address"
        assert lp_address != "0x0000000000000000000000000000000000000000", "Should not return zero address"
    except Exception as e:
        print(f"\nError in LP token test: {e}")
        raise


def test_get_lp_token_address_volatile(wallet):
    """Test getting LP token address for volatile pair."""
    lp_address = get_lp_token_address(wallet, WETH, USDC, False)
    assert Web3.is_address(lp_address), "Should return a valid address"
    assert lp_address != "0x0000000000000000000000000000000000000000", "Should not return zero address"
    print(f"Volatile LP token address: {lp_address}")


def test_get_lp_token_address_nonexistent_pair(wallet):
    """Test getting LP token address for non-existent pair."""
    random_token = "0x1111111111111111111111111111111111111111"

    with pytest.raises(ValueError, match="Pool does not exist for given token pair"):
        get_lp_token_address(wallet, random_token, USDC, True)


def test_get_lp_token_address_token_order(wallet):
    """Test that token order doesn't matter."""
    address1 = get_lp_token_address(wallet, WETH, USDC, True)
    address2 = get_lp_token_address(wallet, USDC, WETH, True)
    assert address1 == address2, "Token order should not affect LP token address"


def test_get_weth_usdc_pool(wallet):
    """Test getting the WETH/USDC pool address."""
    print("\nTesting WETH/USDC pool detection...")

    # Try both stable and volatile
    stable_pool = get_lp_token_address(wallet, WETH, USDC, True)
    volatile_pool = get_lp_token_address(wallet, WETH, USDC, False)

    print(f"\nWETH/USDC Pools:")
    print(f"Stable pool: {stable_pool}")
    print(f"Volatile pool: {volatile_pool}")
    print(f"Expected pool: {EXPECTED_WETH_USDC_POOL}")

    # At least one of them should match the expected pool
    assert (stable_pool.lower() == EXPECTED_WETH_USDC_POOL or
            volatile_pool.lower() == EXPECTED_WETH_USDC_POOL), \
        "Neither pool matches the expected WETH/USDC pool"

    # Return whether it's a stable pool
    is_stable = stable_pool.lower() == EXPECTED_WETH_USDC_POOL
    print("WETH/USDC is a", "stable" if is_stable else "volatile", "pool")
    return is_stable


if __name__ == "__main__":
    wallet = wallet()
    web3 = create_web3(wallet.network_id)

    print("\nTesting WETH/USDC pool detection...")
    STABLE_PAIR = test_get_weth_usdc_pool(wallet)

    print("\nTesting factory contract setup...")
    test_factory_contract_setup(web3)

    print("\nTesting read_contract...")
    test_read_contract_token_info(web3)

    print("\nTesting get_lp_token_address...")
    test_get_lp_token_address_stable(wallet)
