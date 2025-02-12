"""Test fixtures for ERC20 action provider tests."""

import pytest
from unittest.mock import Mock

from coinbase_agentkit.wallet_providers.evm_wallet_provider import EvmWalletProvider


MOCK_AMOUNT = "1000000000000000000"  # 1 token in base units
MOCK_CONTRACT_ADDRESS = "0x1234567890123456789012345678901234567890"
MOCK_DESTINATION = "0x9876543210987654321098765432109876543210"
MOCK_ADDRESS = "0x1234567890123456789012345678901234567890"


@pytest.fixture
def mock_wallet():
    """Create a mock wallet provider."""
    mock = Mock(spec=EvmWalletProvider)
    mock.get_address.return_value = MOCK_ADDRESS
    mock.read_contract.return_value = MOCK_AMOUNT
    return mock
