"""Test fixtures for CDP API tests."""
from unittest.mock import Mock

import pytest

from coinbase_agentkit.network import Network

MOCK_API_KEY_NAME = "mock-api-key"
MOCK_API_KEY_PRIVATE_KEY = "mock-private-key"
MOCK_EXPLORER_URL = "https://sepolia.basescan.org/tx"
MOCK_TX_HASH = "0xa84bf2ef03503a11a41c12e2f357fb77ab7e16dd79bf48837a6d555ac44e9112"
MOCK_WALLET_ADDRESS = "0xe6b2af36b3bb8d47206a129ff11d5a2de2a63c83"


@pytest.fixture
def mock_env(monkeypatch):
    """Mock environment variables for testing."""
    monkeypatch.setenv("CDP_API_KEY_NAME", MOCK_API_KEY_NAME)
    monkeypatch.setenv("CDP_API_KEY_PRIVATE_KEY", MOCK_API_KEY_PRIVATE_KEY)


@pytest.fixture
def mock_wallet():
    """Create a mock wallet for testing."""
    wallet = Mock()
    wallet.get_network.return_value = Network(
        protocol_family="evm",
        network_id="base-sepolia",
        chain_id=84532
    )
    wallet.get_address.return_value = MOCK_WALLET_ADDRESS
    return wallet


@pytest.fixture
def mock_transaction():
    """Create a mock transaction for testing."""
    mock_tx = Mock()
    mock_tx.transaction_link = f"{MOCK_EXPLORER_URL}/{MOCK_TX_HASH}"
    mock_tx.wait.return_value = mock_tx
    return mock_tx
